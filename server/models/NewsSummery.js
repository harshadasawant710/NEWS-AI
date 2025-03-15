    import mongoose from "mongoose";

    const NewsSummerySchema = new mongoose.Schema({

        url: { type: String, require: true, unique: true },
        summary: { type: String, require: true, },
        createdAt: { type: Date, default: Date.now() },

    })

    const NewsSummary = mongoose.model("NewsSummary", NewsSummerySchema);


    export default NewsSummary

