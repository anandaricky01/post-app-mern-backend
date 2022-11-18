import Post from "../models/post.model.js";

export const findAll = async (req, res) => {
  try {
    const posts = await Post.find();

    return res.json({
      message: "Data all Posts",
      data: posts,
    });
  } catch (error) {
    return res.json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const checkTitle = await Post.findOne({ title: req.body.title });
  if (checkTitle) {
    return res.status(409).json({
      message: "The title is can't be same with another post!",
      suggestion: "Try to put some keyword to make it unique",
    });
  }

  var slug = req.body.title;
  slug = slug.toLowerCase();
  slug = slug.split(" ");
  req.body.slug = slug.join("-");
  req.body.author = req.user.username;

  const post = new Post(req.body);
  try {
    const createdPost = await post.save();

    return res
      .status(201)
      .json({ message: "Post has been created!", data: createdPost });
  } catch (error) {
    return res.status(422).json({ message: error.message });
  }
};

export const findOnePost = async (req, res) => {
  try {
    const findPost = await Post.findOne({ _id: req.params.id });

    return res.json({ message: "Post by ID", data: findPost });
  } catch (error) {
    return res.status(422).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const oldPost = await Post.findOne({ _id: req.params.id });
    var slug = req.body.title;

    if (req.body.title == oldPost.title) {
      return res.status(409).json({
        message: "The title is can't be same with another post!",
        suggestion: "Try to put some keyword to make it unique",
      });
    } else {
      slug = slug.toLowerCase();
      slug = slug.split(" ");
      slug = slug.join("-");
      req.body.slug = slug;
    }

    const updatePost = await Post.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );

    return res.json({ updatePost });
  } catch (error) {
    return res.status(422).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const deletePost = await Post.deleteOne({ _id: req.params.id });

    res.json({ message: "Post has been deleted!", data: deletePost });
  } catch (error) {
    return res.status(422).json({ message: error.message });
  }
};

export const upVote = async (req, res) => {
  try {
    var upVote = await Post.findOne({ _id: req.params.id });
    upVote = upVote.vote.upVote + 1;
    const updateUpVote = await Post.updateOne(
      { _id: req.params.id },
      { $set: { "vote.upVote": upVote } }
    );

    return res.json({ countUpVote: updateUpVote, postId: req.params.id });
  } catch (error) {
    return res.status(422).json({ message: error.message });
  }
};

export const downVote = async (req, res) => {
  try {
    var downVote = await Post.findOne({ _id: req.params.id });
    downVote = downVote.vote.downVote + 1;
    const updateDownVote = await Post.updateOne(
      { _id: req.params.id },
      { $set: { "vote.downVote": downVote } }
    );

    return res.json({ countUpVote: updateDownVote, postId: req.params.id });
  } catch (error) {
    return res.status(422).json({ message: error.message });
  }
};
