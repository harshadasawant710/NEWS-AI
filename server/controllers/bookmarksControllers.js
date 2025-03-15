import User from "../models/User.js"

export const addBookmarks = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, url, source, imageUrl, publishedAt } = req.body;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const newBookmark = { title, url, source, imageUrl, publishedAt };
        
        // Avoid duplicate bookmarks
        const exists = user.bookmarks.some(b => b.url === url);
        if (exists) {
            return res.status(400).json({ error: "Bookmark already exists" });
        }

        user.bookmarks.push(newBookmark);
        await user.save();

        console.log(user); // Debugging output
        res.status(201).json({ message: "Bookmark added", bookmark: newBookmark });

    } catch (error) {
        console.error("Error adding bookmark:", error);
        // Ensure a response is only sent once
    
            res.status(500).json({ error: "Internal server error" });
        
    }
};


export const getBookmarks = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            data: user.bookmarks
        })
    }
    catch (error) {
        console.error("Error fetching bookmarks:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

export const removeBookmarks = async (req, res) => {
    try {
        const { id} = req.params;

        const {articleUrl} = req.query;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const decodedUrl = decodeURIComponent(articleUrl);

        user.bookmarks = user.bookmarks.filter((b) => b.url !== decodedUrl);
        await user.save();

        res.status(200).json({
            message: "Bookmark removed",
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}