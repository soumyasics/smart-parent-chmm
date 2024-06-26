const { BlogModel } = require("./blogSchema");
const { HPModel } = require("../HealthProfessionals/hpSchema");
const multer = require("multer");
const mongoose = require("mongoose");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("img");

const createBlog = async (req, res) => {
  try {
    const { para1, para2, title, HPId } = req.body;

    if (!para1 || !para2 || !title || !HPId) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (!mongoose.Types.ObjectId.isValid(HPId)) {
      return res.status(400).json({ message: "Invalid HPId" });
    }

    const hp = await HPModel.findById(HPId);
    if (!hp) {
      return res
        .status(404)
        .json({ message: "Health professional not found." });
    }

    const newBlog = new BlogModel({
      para1,
      para2,
      title,
      HPId,
      img: req.file,
    });

    await newBlog.save();

    return res
      .status(200)
      .json({ message: "Blog created successfully.", data: newBlog });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogModel.find().populate("HPId").exec();
    return res.status(200).json({ message: "All blogs", data: blogs });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Id" });
    }
    const blog = await BlogModel.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(200).json({ message: "Blog data", data: blog });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getBlogsByHPId = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Id" });
    }
    const hp = await HPModel.findById(id);
    if (!hp) {
      return res.status(404).json({ message: "Health professional not found" });
    }
    const blogs = await BlogModel.find({ HPId: id });
    if (!blogs) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(200).json({ message: "Blog data", data: blogs });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = {
  upload,
  createBlog,
  getAllBlogs,
  getBlogById,
  getBlogsByHPId,
};
