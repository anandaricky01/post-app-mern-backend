import express from "express";
import { findAll, createPost, findOnePost, updatePost, deletePost, upVote, downVote } from "../controllers/post.controller.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";

const router = express.Router();

router.get('/api/posts', findAll);
router.get('/api/posts/:id', findOnePost);
router.post('/api/posts', authenticate, createPost);
router.put('/api/posts/:id', authenticate, updatePost);
router.delete('/api/posts/:id', authenticate, deletePost);
router.post('/api/posts/upvote/:id', authenticate, upVote);
router.post('/api/posts/downvote/:id', authenticate, downVote);

export default router;