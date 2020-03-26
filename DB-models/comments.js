const mongoose =require("mongoose");

const CommentSchema = mongoose.Schema({
    postId:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    picture:{
        type:String,
        require: true
    },
    comment:{
        type:String,
        require:true
    },
    time:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Comments', CommentSchema);