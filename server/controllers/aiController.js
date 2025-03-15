import dotenv from "dotenv";
dotenv.config();
import puppeteer from "puppeteer"
import { GoogleGenerativeAI } from '@google/generative-ai'
import NewsSummary from "../models/NewsSummery.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateSummary = async (content) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const response = await model.generateContent(`please summarize this content ${content}`)
    return response.response.text();
}

export const newsSummerize = async (req, res) => {
    const { url } = req.body;

    const exist = await NewsSummary.findOne({ url });

    if (exist) {
        return res.status(200).json({
            summary: exist.summary,
            fullarticle: url,
        })
    }
    
    console.log(url)
    let browser;
    try {
        const browser = await puppeteer.launch({
            headless: true, // Keep browser visible
            // args: [
            //   '--disable-features=PrivacySandboxSettings2',
            //   '--disable-blink-features=AutomationControlled', // Avoid detection
            //   '--no-sandbox',
            //   '--disable-setuid-sandbox',
            //   '--disable-features=SameSiteByDefaultCookies,CookiesWithoutSameSiteMustBeSecure'
            // ],
        });


        //console.log(browser)
        const page = await browser.newPage();
        //console.log("page", page)

        await page.goto(url, {
            waitUntil: "domcontentloaded",
            timeout: 60000, // 60 seconds
        });
        
        const extractedText = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('p'))
                .map((p) => p.innerText)
                .join('');
        });
        await browser.close()
        const summary = await generateSummary(extractedText)

        const newsSummary = new NewsSummary({
            url,
            summary
        })
        await newsSummary.save();

        console.log("summary", summary)
        // generateSummary(extractedText)
        res.status(200).json({
            summary, fullarticle: url
        })
    }
    catch (error) {
        console.error("Error during Puppeteer execution:", error);
    }
}

