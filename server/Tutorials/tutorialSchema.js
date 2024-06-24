const mongoose = require("mongoose");

const tutorialSchema = new mongoose.Schema({
  video: {
    type: Object,
    required: true,
  },
  thumbnail: {
    type: Object,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  HPId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "healthprofessional",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  target: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
});

const VideoTutorial = mongoose.model("Tutorial", tutorialSchema);

module.exports = { VideoTutorial };
