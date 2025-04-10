import { privateKeyToAccount } from 'viem/accounts';
import { evmAddress } from '@lens-protocol/client';
import { OperationApprovalSigner } from '@lens-protocol/client/viem';

import { APP_ADDRESS, CHAIN, PRIVATE_KEY } from './config';

if (!PRIVATE_KEY) {
  throw new Error('PRIVATE_KEY is not set');
}

if (!CHAIN) {
  throw new Error('CHAIN is not set');
}

if (!APP_ADDRESS) {
  throw new Error('APP_ADDRESS is not set');
}

export const approver = new OperationApprovalSigner({
  chain: CHAIN,
  app: evmAddress(APP_ADDRESS),
  signer: privateKeyToAccount(PRIVATE_KEY as `0x${string}`),
});
