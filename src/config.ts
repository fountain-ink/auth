import never from 'never';
import { chains } from '@lens-chain/sdk/viem';

export const PORT = process.env.PORT || 3003;
export const APP_ADDRESS = process.env.APP_ADDRESS ?? never('APP_ADDRESS env variable is required');
export const API_SECRET = process.env.API_SECRET ?? never('API_SECRET env variable is required');
export const PRIVATE_KEY = process.env.PRIVATE_KEY ?? never('PRIVATE_KEY env variable is required');
export const ENVIRONMENT = process.env.ENVIRONMENT ?? never('ENVIRONMENT env variable is required');
export const CHAIN = ENVIRONMENT.toLowerCase() === 'production' ? chains.mainnet : chains.testnet; 