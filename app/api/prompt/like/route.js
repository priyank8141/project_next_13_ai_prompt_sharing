import Prompt from "@models/prompt";
import User from "@models/user";
import { connectToDB } from "@utils/database";

export const PATCH = async (request, res) => {
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


        if (existingPrompt.likes.includes(userId)) {
            const existingProm = await Prompt.findByIdAndUpdate(
                prompId,
                { $pull: { likes: { $in: [user._id] } } },
                { new: true },
            );
            res.setHeader('Cache-Control', 'no-store');
            res.setHeader('Pragma', 'no-cache');

            return res.status(200).send('Like updated successfully');

        } else {
            const existingProm = await Prompt.findByIdAndUpdate(
                prompId,
                { $addToSet: { likes: user } },
                { new: true },
            );
            res.setHeader('Cache-Control', 'no-store');
            res.setHeader('Pragma', 'no-cache');

            return res.status(200).send('Like updated successfully');
        }

    } catch (error) {
        return new Response("Error Updating Prompt", { status: 400 });
    }
};