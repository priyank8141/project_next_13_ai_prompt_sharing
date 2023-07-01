import Prompt from "@models/prompt";
import User from "@models/user";
import { connectToDB } from "@utils/database";

export const PATCH = async (request) => {
    console.log("first")
    try {
        await connectToDB();
        const { userId, promptId } = await request.json();

        // Find the existing prompt by ID
        const existingPrompt = await Prompt.findById(promptId);
        const user = await User.findById(userId);

        console.log("user", user)

        if (!existingPrompt) {
            return new Response("Prompt not found", { status: 404 });
        }

        let prompId = existingPrompt._id

        console.log(prompId)

        if (!userId) {
            return new Response("User id required", { status: 404 });
        }

        console.log(existingPrompt)

        if (existingPrompt.likes.includes(userId)) {
            const existingProm = await Prompt.findByIdAndUpdate(
                prompId,
                { $pull: { likes: { $in: [user._id] } } },
            );
            return new Response("Like updated successfully", { status: 200 });
            
        } else {
            console.log("no likes")
            const existingProm = await Prompt.findByIdAndUpdate(
                prompId,
                { $addToSet: { likes: user } },
            );
            return new Response("Like updated successfully", { status: 200 });
        }

    } catch (error) {
        return new Response("Error Updating Prompt", { status: 400 });
    }
};