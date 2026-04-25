const mongoose = require('mongoose');

const  musicSchema = new mongoose.Schema({
  title: {
    type : String,
    required : true,
  },
  artist : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "user",
    required : true,
  },
  audioUrl : {
    type : String,
    required : true
  },
  coverImg : {
    type : String,
    default : ""
  },
  duration : {
    type : Number,
    default : 0
  },
  likes : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "user"
  }],
  genere : {
    type : String,
    default : "other"
  }

}, {timestamps:true});

const musicModel = mongoose.model("music" , musicSchema);

module.exports = musicModel;