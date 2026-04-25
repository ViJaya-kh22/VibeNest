const express = require("express");
const musicController = require("../controllers/music.controller");
const authMidlleware = require("../middleware/auth.middleware");
const { albumValidation } = require("../validations/album.validation");
const { albumIDValidation } = require("../validations/albumID.validation");
const { musicValidation } = require("../validations/music.validation");
const {upload} = require('../services/storage.service');

const router = express.Router();



router.post("/uploads",
  authMidlleware.authArtist,
  upload.fields([{name: "audio" , maxCount : 1},
    {name : "cover" , maxCount: 1 }
  ]),
  musicValidation,
  musicController.createMusic,
);

router.post("/create-album",
  authMidlleware.authArtist,
  upload.fields([{name : "cover" , maxCount:1}]),
  albumValidation,
  musicController.createAlbum,
);

router.get("/",  musicController.getAllMusic);

router.get("/albums", musicController.getAllAlbums);

router.get(
  "/albums/:albumID",
  albumIDValidation,
  musicController.getAlbumByID,
);

router.get("/my-songs" ,authMidlleware.authArtist , musicController.getArtistSongs);
;
router.get("/my-albums" ,authMidlleware.authArtist , musicController.getArtistAlbums);

router.delete("/song/:songID" , authMidlleware.authArtist ,
musicController.deleteSong);

router.delete("/album/:albumID" , authMidlleware.authArtist ,
musicController.deleteAlbum);

module.exports = router;
