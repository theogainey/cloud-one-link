This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install the required dependencies:

```bash
npm install
```
Next, open `.env.local` and enter the required variables:  
```
#Required for AUTH0
AUTH0_SECRET=
AUTH0_BASE_URL=
AUTH0_ISSUER_BASE_URL=
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=

#Required for MongoDB
MONGODB_URI=

```
Application will not function properly beyond the index page without connecting to MongoDB or Auth0

Once connected application can be started with: 
```bash
npm run dev
```
## Project Structure 

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

To learn more about MongoDB, visit the following pages:

- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [MongoDB Documentation](https://docs.mongodb.com/)

To Learn more about Auth0, visit the following pages:

- [Auth0](https://auth0.com/)
- [Auth0 Next.js SDK](https://github.com/auth0/nextjs-auth0)

## Live Demo

