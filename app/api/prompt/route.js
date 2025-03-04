import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
    try {
        await connectToDB()

        const prompts = await Prompt.find({}).sort({ likes: -1 }).populate('creator')
        const timestamp = new Date().getTime();

        const response = new Response(JSON.stringify({prompts,timestamp}), { status: 200 })
        // Add a unique identifier to the URL to force a cache-busting reload
        const url = new URL(request.url);
        url.searchParams.set("t", Date.now());
        response.headers.set("Cache-Control", "no-cache, no-store, must-revalidate");
        response.headers.set("Pragma", "no-cache");
        response.headers.set("Expires", "0");
        response.headers.set("Location", url.toString());

        return response
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 