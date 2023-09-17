# promptopia
__promptopia__ is a Next.js and Tailwind css application designed to perform CRUD operations on AI prompts that can be utilized with GPT-based chat models. With seamless Google OAuth integration for authentication, promptopia offers a user-friendly interface for managing and organizing your AI prompts.

## Features
- CRUD Operations: Create, read, update, and delete AI prompts.
- Google OAuth: Secure authentication using Google OAuth.
- MongoDB Backend: Robust database support with MongoDB.
- User-friendly Interface: Simple and intuitive design to manage prompts.

## Setting Up
Clone the Repository
First, clone the repository from GitHub:

```bash
git clone https://github.com/dt4real/promptopia.git
cd promptopia
```

## Install Dependencies
After cloning the repository, navigate to the root directory and install the required dependencies:

```bash
npm install
```

or

```bash
yarn install
```
## Database Setup
This project uses MongoDB as its database. Set up a MongoDB instance and note down your connection string.

Update the __.env.local__ file in the root of your project with your MongoDB connection string:
```
MONGODB_URI=your_mongodb_connection_string
```
__N/B:__ Don't forget to rename the __.env.local__ file to __.env__

## Google OAuth Setup
The application uses Google OAuth for authentication. Here's how you can set it up:

1. Navigate to Google Cloud Console.
2. Click on the __Navigation Menu > API & Services > Credentials__.
3. Click on __CREATE CREDENTIALS__ and select __OAuth Client ID__.
4. Select __Web Application__ as the type of credential.
5. Provide a name for the credential.
6. Under __Authorized redirect URIs__, add: `http://localhost:3000/api/auth/callback/google`
Adjust the URI if you have a different base URL for your application.
7. Click __Create__. Your __Client ID__ and __Client Secret__ will be displayed.
8. Add these values to your __.env__ file:
`GOOGLE_CLIENT_ID=your_google_client_id`
`GOOGLE_CLIENT_SECRET=your_google_client_secret`

## NextAuth Secret Generation
To securely handle sessions in your next-auth integration, you'll need to generate a secret:

1. Open your terminal or command prompt.
2. Generate a random secret using Node.js's crypto library:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
3. Copy the outputted 64-character hexadecimal string.
4. Update your .env.local file with: `NEXTAUTH_SECRET=your_generated_secret`

## Run the Application
Once all configurations are done, you can run the application:
```bash
npm run dev
```
or
```bash
yarn dev
```
Your application should now be running at http://localhost:3000.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!