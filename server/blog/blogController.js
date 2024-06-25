const { BlogModel } = require("./blogSchema");

const createBlog = async (req, res) => {
  try {

    const { para1, para2, title, HPId} = req.body;

    // if (!para1 || !para2 || !title || !HPId || !img) {
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
