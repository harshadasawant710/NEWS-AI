import User from '../models/User.js'
import axios from 'axios'
import News from '../models/News.js';


export const Preferences = async (req, res) => {
    try {
        const { id } = req.params;
        const { preferences } = req.body;

        //    console.log(preferences)
        const user = await User.findById(id)
        //console.log(user)
        //console.log([...preferences])
        // user.preferences = [...preferences, ...preferences]
        user.preferences = [...new Set(preferences)]; 
        await user.save()
        res.status(200).json({
            message: 'preferences save sucessfully'
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

}

export const fetchNewsByCategory = async (req, res) => {
    const { category } = req.params;
    const { page = 0 } = req.query;
    // console.log("11",page)
    const pageSize = 10;
    try {
        const response = await axios.get(
            `https://newsapi.org/v2/top-headlines?page=${page}&pageSize=${pageSize}&category=${category}&country=us&apiKey=${process.env.NEWS_API_KEY}`);

        //console.log("News API Response:", response.data);

        res.status(200).json({
            length: response.data.articles.length,
            news: response.data.articles,
            nextPage: response.data.articles.length === pageSize ? Number(page) + 1 : null
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

export const fetchAllNews = async (req, res) => {
    const { limit = 20, page, category, keyword } = req.query; //new
    const query = category ? { category } : {};
    const query2 = keyword ? {
        $or: [
            { title: { $regex: keyword, $options: 'i' } },
            { description: { $regex: keyword, $options: 'i' }},
            { content: { $regex: keyword, $options: 'i' }},
            { author: { $regex: keyword, $options: 'i' }},
            { url: { $regex: keyword, $options: 'i' }},

        ]
    } : {};

    const searchQuery = { ...query, ...query2 };

    try {
        const news = await News.find(searchQuery).sort({ publishedAt: -1 }).limit(Number(limit)).skip((page - 1) * limit);
        if (!news) {
            return res.status(400).json({
                message: 'No news found'
            })
        }

        const totalCount = await News.countDocuments(searchQuery)
        res.status(200).json({
            totalCount,
            totalPages: Math.ceil(totalCount / limit),
            length: news.length,
            data: news
        })

    }
    catch (error) {

    }
}