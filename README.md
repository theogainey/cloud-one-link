
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

#Required for Redis
REDIS_URL="

```
Application will not function properly beyond the index page without connecting to MongoDB and Auth0

Once connected application can be started with: 
```bash
npm run dev
```

Then Application can be opened a browser at http://localhost:3000/
## Project Structure 
- Framework - Next.js 
- Database - MongoDB Atlas 
- State Mangement - React.js
- User Authetication - Auth0
- Basic Analytics - Serverless Redis with Upstash to store number of link clicks and page views 
   
## Next Steps
- Expanded User Customization - including, but not limited to, custom page themes, social icons and more
## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

To learn more about MongoDB, visit the following pages:

- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [MongoDB Documentation](https://docs.mongodb.com/)

To learn more about Auth0, visit the following pages:

- [Auth0](https://auth0.com/)
- [Auth0 Next.js SDK](https://github.com/auth0/nextjs-auth0)

To learn more about Redis and serverless Redis with Upstash, visit the following pages:
- [Redis](https://redis.io/)
- [Upstash](https://upstash.com/)



## Live Demo

Check out our live demo at http://cloud-one-link.vercel.app/  
