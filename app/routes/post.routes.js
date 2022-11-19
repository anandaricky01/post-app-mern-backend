import express from "express";
import { findAll, createPost, findOnePost, updatePost, deletePost, upVote, downVote, createComment, deleteComment } from "../controllers/post.controller.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";

const router = express.Router();

// crud Post
router.get('/api/posts', findAll);
router.get('/api/posts/:id', findOnePost);
router.post('/api/posts', authenticate, createPost);
router.put('/api/posts/:id', authenticate, updatePost);
router.delete('/api/posts/:id', authenticate, deletePost);

// vote routes
router.post('/api/posts/upvote/:id', authenticate, upVote);
router.post('/api/posts/downvote/:id', authenticate, downVote);

// comment routes
router.post('/api/posts/comment/:id', authenticate, createComment);
router.delete('/api/posts/comment/:id', authenticate, deleteComment);
export default router;