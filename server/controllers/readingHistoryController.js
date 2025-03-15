import User from "../models/User.js"

export const getReadingHistroy = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            data: user.readingHistory,
        })
        console.log(user)
    }
    catch (error) {

    }
}

export const clearReadingHistory = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.readingHistory = []
        await user.save()
        res.status(200).json({
            message: "History Cleared"
        })
        console.log(user)
    }
    catch (error) {

    }
}

export const addReadingHistroy = async (req, res) => {
    console.log(req.body)
    try {
        const { id } = req.params
        const { article } = req.body
        console.log(article)
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log(user)
        user.readingHistory = user.readingHistory.filter((rh) => rh.url !== article.url)
        user.readingHistory.unshift(article);

        if (user.readingHistory.length > 50) {
            user.readingHistory.pop()
        }
        await user.save()

        res.status(201).json({
            message: "Reading history saved"
        })

    }
    catch (error) {

    }
}