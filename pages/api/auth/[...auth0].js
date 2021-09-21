// pages/api/auth/[...auth0].js
import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';

const redirctURI = '/dashboard'

export default handleAuth({
  async callback(req, res) {
    try {
      await handleCallback(req, res, { redirctURI });
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  }
});
