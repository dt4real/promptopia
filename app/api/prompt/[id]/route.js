import Prompt from "@models/prompt";
import { connnectToDB } from "@utils/database";

// GET Endpoint: Fetch a prompt by its ID
export const GET = async (request, { params }) => {
	try {
		// Connect to the database
		await connnectToDB();

		// Find the prompt by its ID and populate the creator information
		const prompt = await Prompt.findById(params.id).populate("creator");

		if(!prompt) return new Response("Prompt not found!", {status: 404});

		return new Response(JSON.stringify(prompt), { status: 200 });
	} catch (error) {
		return new Response("Failed to fetch prompt", { status: 500 });
	}
}

// PATCH Endpoint: Update a prompt by its ID
export const PATCH = async (request, { params }) => {
	try {
		// Connect to the database
		await connnectToDB();

		// Extract prompt and tag data from the request body
		const { prompt, tag } = await request.json();
		const existingPrompt = await Prompt.findById(params.id);

		if(!existingPrompt) return new Response("Prompt not found!", {status: 400});

		// Update the prompt's text and tag
		existingPrompt.prompt = prompt;
		existingPrompt.tag = tag;
		existingPrompt.save();

		return new Response(JSON.stringify(prompt), {
			status: 200
		});
	} catch (error) {
		return new Response("Failed to update prompt", {
			status: 500
		});
	}
}

// DELETE Endpoint: Remove a prompt by its ID
export const DELETE = async(request, { params }) => {
	try {
		// Connect to the database
		await connnectToDB();

		// Find and remove the prompt by its ID
		await Prompt.findByIdAndRemove(params.id);
		return new Response("Prompt deleted successfully", {
			status: 200
		});
	} catch (error) {
		console.log(error);
		return new Response("Failed to delete prompt", {
			status: 500
		});
	}
}
