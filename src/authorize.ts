import express from 'express';
import { API_SECRET } from './config';

const router = express.Router();

// Authorize endpoint
router.post('/', function (req, res) {
  const { account, signedBy } = req.body;

  if (!account || !signedBy) {
    return res.status(400).json({ error: "Missing 'account' or 'signedBy' field" });
  }

  console.log(`INFO: Wallet ${signedBy} is requesting to authenticate with Account: ${account}.`);

  const isAllowed = true; // Set to false if the user is not allowed to login

  if (!isAllowed) {
    return res.json({ allowed: false, reason: 'User not allowed to login' });
  }

  const isSponsored = true; // Set to true if the user is sponsored

  // in vercel `protocol` is `http`, but `x-forwarded-proto` is `https`
  const protocol = req.headers['x-forwarded-proto'] || req.protocol;
  const host = req.get('host');
  const fullDomain = `${protocol}://${host}`;

  res.json({
    allowed: true,
    sponsored: isSponsored,
    appVerificationEndpoint: `${fullDomain}/${API_SECRET}/verify-operation`,
  });
});

export default router; 