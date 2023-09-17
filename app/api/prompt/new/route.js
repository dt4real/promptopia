import Prompt from "@models/prompt";
import { connnectToDB } from "@utils/database";

// POST Endpoint: Create a new prompt
export const POST = async (req, res) => {
    // Extract the userId, prompt, and tag from the request body
	const { userId, prompt, tag } = await req.json();

	try {
	    // Connect to the database
		await connnectToDB();

		// Create a new Prompt instance with the provided data
		const newPrompt = new Prompt({
			creator: userId,
			prompt,
			tag
		});

		// Save the new prompt to the database
		await newPrompt.save();

		// Return the newly created prompt
		return new Response(JSON.stringify(newPrompt), {
			status: 201 // HTTP status code for "Created"
		});
	} catch (error) {
	    // Handle any errors during prompt creation
		return new Response("Failed to create a new prompt", {
			status: 500 // HTTP status code for "Internal Server Error"
		});
	}
}
