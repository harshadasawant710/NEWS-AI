import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(

    {
        source: {
            id: { type: String, default: null },
            name: { type: String, }
        },
        author: { type: String, default: 'unknown' },
        title: { type: String, },
        description: { type: String },
        url: { type: String,  },
        urlToImage: { type: String, default: null },
        publishedAt: { type: Date,  },
        createdAt: { type: Date,  },
        content: { type: String, default: null },
        category: { type: String,  },
        country: { type: String,  }
    },
    {timesTamps:true}
)

const News = mongoose.model('News', newsSchema)

export default News