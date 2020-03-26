const mongoose = require("mongoose");

const ArticleSchema = mongoose.Schema({
    name: { 
        type: String,
         required: true 
        },
    title: { 
        type: String, 
        required: true
     },
    content: { 
        type: Array,
        required: true
         },
    date: { 
        type: Date,
        default: Date.now
     }
});

module.exports = mongoose.model('Articles', ArticleSchema);