import Router from "express";

import { verifyToken } from "../middlewares/verfiyToken";
import { createPost, deletePost, getAllPosts, getSinglePost, updatePost } from "../controllers/postController";


const post_router = Router();

post_router.post("/create", createPost);
post_router.get("/single/:ID", getSinglePost);
post_router.get("/all", getAllPosts)
post_router.put("/update", updatePost);
post_router.delete("/delete/:ID", deletePost);

export default post_router;
