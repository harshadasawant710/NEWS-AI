import mongoose from "mongoose";

// Reading History Schema
const BookMarkSchema = new mongoose.Schema({
    articleId: {
        type: String,
    },
    title: {
        type: String,
    },
    source: String,
    url: {
        type: String,
    },
    urlImage: String,
    publishedAt: Date,
    addedAt: {
        type: Date,
        default: Date.now,
    },
});


// Reading History Schema
// const ReadingHistorySchema = new mongoose.Schema({
//     articleId: {
//         type: String,
//         required: true,
//     },
//     title: {
//         type: String,
//         required: true,
//     },
//     source: String,
//     url: {
//         type: String,
//         required: true,
//     },
//     urlImage: String,
//     publishedAt: Date,
//     readAt: {
//         type: Date,
//         default: Date.now,
//     },
// });

// Main User Schema
// Reading History Schema
const ReadingHistorySchema = new mongoose.Schema({
    articleId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    source: String,
    url: {
        type: String,
        required: true,
    },
    urlImage: String,
    publishedAt: Date,
    readAt: {
        type: Date,
        default: Date.now,
    },
});

// Main User Schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    preferences: [String],
    bookmarks: [{
        type: mongoose.Schema.Types.Mixed, // Allows arbitrary objects
    }],
    readingHistory: [ReadingHistorySchema], // ✅ Embedded schema
});

const User = mongoose.model('User', UserSchema);

export default User

// const ReadingHistorySchema = new mongoose.Schema({
//     articleId : String,
//     title :String,
//     source : String,
//     url : String,
//     urlImage: String,
//     publishedAt : Date,
//     readAt: {type:Date,default:Date.now()}
// });
