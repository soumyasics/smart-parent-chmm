const multer = require("multer");
const { VideoTutorial } = require("./tutorialSchema");
const { default: mongoose } = require("mongoose");
const { HPModel } = require("../HealthProfessionals/hpSchema");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadVideo = multer({ storage: storage }).any();

const addTutorial = async (req, res) => {
  try {
    const { title, description, HPId, duration, target } = req.body;

    if (!title || !description || !HPId || !duration || !target) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (!mongoose.isValidObjectId(HPId)) {
      return res.status(400).json({ message: "HP id is not valid" });
    }

    const hp = await HPModel.findById(HPId);
    if (!hp) {
      return res
        .status(404)
        .json({ message: "Health professional doesn't exist." });
    }

    const newVideoTutorial = await new VideoTutorial({
      title,
      description,
      duration,
      target,
      thumbnail: req.files[0],
      video: req.files[1],
      HPId,
    });

    await newVideoTutorial.save();
    return res.status(200).json({
      message: "Video tutorial added successfully",
      videoTutorial: newVideoTutorial,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to add video tutorial.", error: error.message });
  }
};

const getAllTutorials = async (req, res) => {
  try {
    const videoTutorials = await VideoTutorial.find().populate("HPId").exec();
    return res.status(200).json({
      message: "All Video Tutorials",
      data: videoTutorials,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to add video tutorial.", error: error.message });
  }
};

const getTutorialById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }
    const videoTutorial = await VideoTutorial.findById(id)
      .populate("HPId")
      .exec();
    if (!videoTutorial) {
      return res.status(404).json({ message: "Video tutorial not found" });
    }
    return res.status(200).json({
      data: videoTutorial,
      message: "Video Tutorial",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get  video  tutorial by id.",
      error: error.message,
    });
  }
};
const getTutorialsByHPId = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    const videoTutorials = await VideoTutorial.find({
      HPId: id,
    })
      .populate("HPId")
      .exec();

    return res.status(200).json({
      data: videoTutorials,
      message: "All HP Video Tutorials",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get video tutorials.",
      error: error.message,
    });
  }
};

module.exports = {
  addTutorial,
  getTutorialsByHPId,
  uploadVideo,
  getAllTutorials,
  getTutorialById,
};
