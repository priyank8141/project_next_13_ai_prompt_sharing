import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
    try {
        await connectToDB()

        const prompts = await Prompt.find({}).sort({ likes: -1 }).populate('creator')

        const response = new Response(JSON.stringify(prompts), { status: 200 })
        response.headers.set('Cache-Control', 'no-store');
        return response
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 