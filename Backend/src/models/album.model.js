const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    music : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "music",
    }],
    artist : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true,
    },
    coverImg : {
        type : String,
        default : ""
    },
    duration : {
        type : Number,
        required : true,
    },
    genere : {
        type:String,
        default : "other"
    },
});

const albumModel = mongoose.model("album", albumSchema);

module.exports = albumModel;