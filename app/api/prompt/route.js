import Prompt from "@models/prompt";
import { connnectToDB } from "@utils/database";

// GET Endpoint: Retrieve all prompts from the database
export const GET = async () => {
    try {
        // Connect to the database
        await connnectToDB();

        // Fetch all prompts and populate the 'creator' field to get the details of the creator
        const prompts = await Prompt.find({}).populate('creator');

        // Return the fetched prompts
        return new Response(JSON.stringify(prompts), {
            status: 200 // HTTP status code for "OK"
        });
    } catch (error) {
        // Handle any errors during prompt retrieval
        return new Response("Failed to fetch all prompts", {
            status: 500 // HTTP status code for "Internal Server Error"
        });
    }
}
