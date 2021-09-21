// pages/api/auth/[...auth0].js
import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';

const redirctURI = 'https://cloud-one-link-theogainey.vercel.app/api/auth/login'

export default handleAuth({
  async callback(req, res) {
    try {
      await handleCallback(req, res, { redirctURI });
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  }
});
