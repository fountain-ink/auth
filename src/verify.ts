import express, { Request, Response } from 'express';
import { approver } from './approver';
import { evmAddress, OperationType } from '@lens-protocol/client';

interface VerificationRequestBody {
  nonce: string; 
  deadline: string; 
  operation: OperationType;
  validator: string; 
  account: string; 
}

const router = express.Router();

router.post('/', async function (req: Request<{}, {}, VerificationRequestBody>, res: Response) {
  const requiredFields: (keyof VerificationRequestBody)[] = [
    'deadline',
    'nonce',
    'operation',
    'account',
    'validator',
  ];
  const missingFields = requiredFields.filter((field) => req.body[field] === undefined || req.body[field] === null);

  if (missingFields.length > 0) {
    return res.status(400).json({
      allowed: false,
      reason: `The following field(s) are missing or null: ${missingFields.join(', ')}`,
    });
  }

  if (!Object.values(OperationType).includes(req.body.operation)) {
    return res.status(400).json({
      allowed: false,
      reason: `Invalid operation value: ${req.body.operation}. Must be one of [${Object.values(OperationType).join(', ')}]`,
    });
  }

  try {
    evmAddress(req.body.account);
    evmAddress(req.body.validator);
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Invalid address format';
    return res.status(400).json({
      allowed: false,
      reason: `Invalid EVM address format: ${errorMessage}`,
    });
  }


  console.log(
    `INFO: Account ${req.body.account} is requesting to verify ${req.body.operation} operation.`
  );

  // --- Verification Logic ---
  const account = req.body.account;
  const operation = req.body.operation;
  const validator = req.body.validator;
  const isAllowed = true;

  // const isAllowed = req.body.operation === Operation.Post && someCheck(req.body.account);

  if (!isAllowed) {
    return res.json({
      allowed: false,
      reason: 'Operation not allowed.',
    });
  }

  // --- Signing ---
  try {
    const approvalData = {
      nonce: req.body.nonce,
      deadline: req.body.deadline,
      operation: req.body.operation,
      validator: evmAddress(req.body.validator),
      account: evmAddress(req.body.account),
    };

    const signature = await approver.signOperationApproval(approvalData);

    res.json({
      allowed: true,
      signature,
    });
  } catch (error) {
    console.error('Error signing operation approval:', error);
    res.status(500).json({
      allowed: false,
      reason: 'Internal server error during signing',
    });
  }
});

export default router; 