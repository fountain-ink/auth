import { privateKeyToAccount } from 'viem/accounts';
import { evmAddress } from '@lens-protocol/client';
import { OperationApprovalSigner } from '@lens-protocol/client/viem';

import { APP_ADDRESS, CHAIN, PRIVATE_KEY } from './config';

export const approver = new OperationApprovalSigner({
  chain: CHAIN,
  app: evmAddress(APP_ADDRESS),
  signer: privateKeyToAccount(PRIVATE_KEY as `0x${string}`),
});
