import 'dotenv/config';
import express from 'express';

import { PORT, API_SECRET } from './config';
import authorizationRoute from './authorize';
import verificationRoute from './verify';

const app = express();

app.use(express.json());

app.get('/', function (req, res) { res.json({ online: true }); });
app.use('/:secret', function (req, res, next) {
  const secret = req.params.secret;

  console.log(`INFO: ${req.method} ${req.originalUrl.replace(/\/[^/]+/, '/[REDACTED]')}`);

  if (secret !== API_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
});

app.use('/:secret/authorize', authorizationRoute);
app.use('/:secret/verify', verificationRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 