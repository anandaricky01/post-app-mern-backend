import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";
import Vote from "../models/vote.model.js";

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
    const Comments = await Comment.find({ post_id: req.params.id });
    const upVotes = await Vote.find({ post_id: req.params.id, vote: true });
    const downVotes = await Vote.find({ post_id: req.params.id, vote: false });

    return res.json({
      message: "Post by ID",
      data: {
        post: findPost,
        postVote: { upVote: upVotes.length, downVote: downVotes.length },
        comments: Comments,
      },
    });
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
    const deleteComment = await Comment.deleteMany({ post_id: req.params.id });
    const deleteVote = await Vote.deleteMany({ post_id: req.params.id });

    res.json({
      message: "Post has been deleted!",
      data: { deletePost, deleteComment, deleteVote },
    });
  } catch (error) {
    return res.status(422).json({ message: error.message });
  }
};

export const upVote = async (req, res) => {
  const checkVote = await Vote.findOne({
    post_id: req.params.id,
    username: req.user.username,
  });
  if (checkVote) {
    if (checkVote.vote == true) {
      return res.sendStatus(204);
    } else {
      return updateVote(true, req, res);
    }
  } else {
    try {
      const upVote = new Vote({
        post_id: req.params.id,
        username: req.user.username,
        vote: true,
      });

      const upVoted = await upVote.save();

      return res.json({ countUpVote: upVoted, postId: req.params.id });
    } catch (error) {
      return res.status(422).json({ message: error.message });
    }
  }
};

export const downVote = async (req, res) => {
  const checkVote = await Vote.findOne({
    post_id: req.params.id,
    username: req.user.username,
  });
  if (checkVote) {
    if (checkVote.vote == false) {
      return res.sendStatus(204);
    } else {
      return updateVote(false, req, res);
    }
  } else {
    try {
      const downVote = new Vote({
        post_id: req.params.id,
        username: req.user.username,
        vote: false,
      });

      const downVoted = await downVote.save();

      return res.json({ countUpVote: downVoted, postId: req.params.id });
    } catch (error) {
      return res.status(422).json({ message: error.message });
    }
  }
};

const updateVote = async (vote, req, res) => {
  try {
    const checkVote = await Vote.findOneAndUpdate(
      { post_id: req.params.id, username: req.user.username },
      { $set: { vote: vote } }
    );
    return res
      .status(200)
      .json({ message: "Status vote changed!", status: vote, data: checkVote });
  } catch (error) {
    return res.status(402).json({ message: error.message });
  }
};

export const createComment = async (req, res) => {
  req.body.author = req.user.username;
  req.body.post_id = req.params.id;
  const comment = new Comment(req.body);
  try {
    const createdComment = await comment.save();
    return res.status(201).json({
      message: `Comment has been created on post by id : ${req.params.id}`,
      createdComment,
    });
  } catch (error) {
    return res.status(422).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const deletedComment = await Comment.deleteOne({ post_id: req.params.id });
    return res
      .status(202)
      .json({ message: "Comment has been deleted!", data: deletedComment });
  } catch (error) {
    return res.status(422).json({ message: error.message });
  }
};
