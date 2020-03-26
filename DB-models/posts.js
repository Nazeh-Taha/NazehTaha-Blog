const mongoose = require("mongoose");

const PostsSchema = mongoose.Schema({
    image: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    body: {
        type: String,
        require: true
    },
    time: {
        type: String,
        require: true
    },
    categore:{
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Posts', PostsSchema);

