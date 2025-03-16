import dotenv from "dotenv"
dotenv.config()
import express from "express"
import dbConnect from "./config/db.js";
import userRoutes from './routes/userRoutes.js'
import newsRoutes from "./routes/newsRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import bookmarksRoutes from "./routes/bookmarksRoutes.js";
import readingHistoryRoute from "./routes/readingHistory.js";
import aiRoutes from "./routes/aiRoutes.js";
import axios from "axios";
import News from "./models/News.js";
import cron from 'node-cron'
import admin from 'firebase-admin'
import serviceAccount from './key/news-ai-c1252-firebase-adminsdk-fbsvc-010a55c6b4.json' with {type:'json'}

const app = express();

app.use(express.json())
dbConnect();

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

const countries = ['us', 'uk', 'fr', 'in', 'it']
const categories = ['health', 'science', 'sports', 'entertainment', 'politics', 'business','trending','technology'];
const fetchNewsAndStore = async () => {
    for (let country of countries) {
        for (let category of categories) {
            const { data } = await axios.get(`https://newsapi.org/v2/top-headlines?category=${category}&country=${country}&apiKey=${process.env.NEWS_API_KEY}`);
            console.log("API URL in cat:", `${process.env.NEWS_API_KEY}/api/news/${category}`);


            if (data.articles && data.articles.length > 0) {
                //console.log(data.articles)
                data.articles.map(async (d) => {


                    const exist = await News.findOne({ title: d.title })
                    //console.log(exist)
                    if (!exist) {
                        const newData = await News.create({
                            content: d.content,
                            title: d.title,
                            author: d.author,
                            description: d.description,
                            url: d.url,
                            urlToImage: d.urlToImage,
                            publishedAt: d.publishedAt,
                            createdAtAt: d.createdAt,
                            category,
                            country,
                            source: {
                                id: d.source.id,
                                name: d.source.name
                            }
                        })
                        console.log(`Inserted ${d.title} [${category}-${country}]`)
                    }
                    else {
                        console.log(`Already exist ${d.title}`)
                    }

                })

            }
            else {
                console.log('no data found')
            }
        }
    }
}
//fetchNewsAndStore()
cron.schedule('*/15 * * * *', fetchNewsAndStore);

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(cookieParser());

app.get('/', (req,res)=>{
    res.send('HomePage')
})


app.use('/auth', userRoutes)
app.use('/api', newsRoutes)
app.use('/api', bookmarksRoutes)
app.use('/api', readingHistoryRoute)
app.use('/api', aiRoutes)



// console.log(process.env.PORT)
app.listen(process.env.PORT, () => {
    console.log(`server is running on PORT ${process.env.PORT}`);
})