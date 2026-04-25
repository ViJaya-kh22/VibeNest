const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model");
const { parseBuffer } = require('music-metadata');
const { uploadtoCloudinary } = require('../services/storage.service');

async function createMusic(req, res) {

  try {
    const {title,genere} = req.body;
    const {audio,cover} = req.files;

    const audioUrl = audio[0].path;
    const coverImg = cover ? cover[0].path : "";

     const metadata = await parseBuffer(audio[0].buffer, audio[0].mimetype);
    const duration = Math.round(metadata.format.duration);

   
    // ✅ now upload to cloudinary manually
    const audioUpload = await uploadtoCloudinary(audio[0].buffer, {
      folder: "music-app",
      resource_type: "video", // audio files use "video" in cloudinary
    });

    const coverUpload = cover
      ? await uploadtoCloudinary(cover[0].buffer, {
          folder: "music-app",
          resource_type: "image",
        })
      : null;

    const music = await musicModel.create({
        title,
        genere,
        duration,
        audioUrl : audioUpload.secure_url,
        coverImg : coverUpload ? coverUpload.secure_url : "",
        artist : req.user.id,
    })

     res.status(201).json({
        message : "Music created successfully",
        music 
    });

  } catch (error) {
    console.log("Error in createmusic",error);
    res.status(500).json({
      message : "Error in create music"
    })
  }
}

async function createAlbum(req,res){

   try {
     const {title , genere } = req.body;
     let music = req.body.music;
     if(typeof music === "string"){
       music = [music]
      }
      
    const songs = await musicModel.find({_id : {$in : music}});
    const duration = songs.reduce((total, song)=> total + song.duration , 0);

    const coverUpload = req.files.cover
  ? await uploadtoCloudinary(req.files.cover[0].buffer, {
      folder: "music-app",
      resource_type: "image",
    })
  : null;

   const coverImg = coverUpload ? coverUpload.secure_url : "";
  
    const album = await albumModel.create({
      title,
      artist : req.user.id,
      music,
      genere , 
      duration ,
      coverImg,
    })

    res.status(201).json({
      message : "Album created successfully!",
      album :{
        id : album._id,
        title : album.title,
        artist : album.artist,
        music : album.music,
        genere : album.genere, 
        duration : album.duration,
        coverImg : album.coverImg
      }
    })
   } catch (error) {
    console.log("Error in createAlbum",error);
    res.status(500).json({
      message : "Error in create album"
    })
   }


}

async function getAllMusic(req,res){

 try {
  const musics = await musicModel
  .find()
  // .limit(3)
  .populate("artist" , "username email");

  res.status(200).json({
    message : "Musics fetched successfully",
    musics : musics
  })
 } catch (error) {
    console.log("Error in fetching songs",error);
    res.status(500).json({
      message : "Error in fetching songs"
    })
 }

}

async function getAllAlbums (req,res){
  try {
     const albums = await albumModel.find()
     .populate("artist", "username")

  res.status(200).json({
    message : "Albums fetched successfully",
    albums : albums,
  })
  } catch (error) {
    console.log("Error in fetching albums",error);
    res.status(500).json({
      message : "Error in fetching albums"
    })
  }
}

async function getAlbumByID(req,res) {
  try {
    const albumID = req.params.albumID;

   const album = await albumModel.findById(albumID)
   .populate("artist", "username")
   .populate({
     path : "music",
     populate : {
      path : "artist",
      select : "username"
     }
   })

   res.status(200).json({
    message : "Album fetched successfully",
    album : album
   })
  } catch (error) {
    console.log("Error in fetching album by id",error);
     res.status(500).json({
       message : "Error in fetching album by id"
     })
    
  }

}

async function getArtistSongs(req,res) {
 try {
    const songs = await musicModel.find({artist : req.user.id}).populate("artist" , "username");
  
    res.status(200).json({
      message : "Artists songs fetched successfully",
      songs : songs
    })
 } catch (error) {
   console.log("Error in fetching artist songs",error)
 }
}

async function getArtistAlbums(req,res) {
  try {
  const albums = await albumModel.find({ artist: req.user.id });
  res.status(200).json({
    message : "Arist albums fetched",
    albums
  })
  } catch (error) {
    console.log("Error in fetching artist album ",error);
    
  }
}

async function deleteSong(req,res) {
   try {
     await musicModel.findByIdAndDelete(req.params.songID);
      res.status(200).json({
        message : "Song deleted"
      })
   } catch (error) {
     res.status(500).json({
       message : "Error in deleting song"
     })
   }
}
async function deleteAlbum(req, res) {
  try {
    await albumModel.findByIdAndDelete(req.params.albumID);
    res.status(200).json({ message: "Album deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting album" });
  }
}

 module.exports = {createMusic , createAlbum , getAllMusic ,getAllAlbums , getAlbumByID ,getArtistAlbums,getArtistSongs , deleteSong, deleteAlbum}
