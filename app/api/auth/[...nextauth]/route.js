// Importing required modules and utilities
import User from "@models/user";
import { connnectToDB } from "@utils/database";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Setting up NextAuth with the Google Provider
const handler = NextAuth({
    providers: [
        GoogleProvider({
            // Retrieving client ID and client secret from environment variables
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        // signIn callback to be executed when a user tries to sign in
        async signIn({ profile }) {
            try {
                // Connecting to the database
                await connnectToDB();

                // Checking if the user with the provided email already exists in the DB
                const userExists = await User.findOne({
                    email: profile.email
                });

                // If the user doesn't exist, we create a new user with the email, username, and image
                if(!userExists){
                    await User.create({
                        email: profile.email,
                        // Formatting the username to remove spaces and convert it to lowercase
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    });
                }

                return true;
            } catch (error) {
                // Logging any errors that might occur
                console.log(error);
                return false;
            }
        },
        // session callback to be executed to fetch or mutate the user's session
        async session({ session }) {
            try {
                // Connecting to the database
                await connnectToDB();

                // Retrieving the session user details from the DB
                const sessionUser = await User.findOne({
                    email: session.user.email
                });

                // Attaching the user's ID to the session object
                session.user.id = sessionUser._id;
            } catch (error) {
                // Logging any errors that might occur
                console.log(error);
            }

            return session;
        }
    }
})

// Exporting the handler to be used as GET and POST endpoints
export { handler as GET, handler as POST }
