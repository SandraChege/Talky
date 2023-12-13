import { Request, Response } from "express";
import mssql from "mssql";

import { v4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sqlConfig } from "../config/sqlConfig";
import { validatePost, validatePostId, validateUpdatePost } from "../Validators/post";
import { Post } from "../interface/post";
import { execute, query } from "../helpers/dbHelper";
import { validateComment } from "../Validators/comment";


//CREATE POSTS
export const createPost = async (req: Request, res: Response) => {
  try {
    const { imageUrl, postContent, userID } = req.body;

    // console.log(req.body);

    const { error } = validatePost.validate(req.body);

    // console.log(error);

    if (error)
      return res.status(400).send({ error: "please place correct details" });

    const newPost: Post = {
      postID: v4(),
      postContent,
      imageUrl,
      userID
    };

    const procedure = "createPost";
    const params = newPost;

    await execute(procedure, params);
    return res.send({ message: "post created successfully" });
  } catch (error) {
    console.log(error);
    res.send((error as Error).message);
  }
};

//GET ALL POSTS
export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const procedureName = "getPosts";
    const result = await query(`EXEC ${procedureName}`);
    // console.log(result.recordset);

    return res.json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: "internal server error" });
  }
};

//UPDATE POSTS
export const updatePost = async (req: Request, res: Response) => {
  try {
    const { postID, userID, postContent, imageUrl} =
      req.body;
    console.log(req.body);

    const { error } = validateUpdatePost.validate(req.body);

    console.log(error);

    if (error)
      return res.status(400).send({ error: "please put correct details" });

    const newProject: Post = {
      postID,
      userID,
      postContent,
      imageUrl
    };

    const ProcedureName = "updatePost";
    const params = newProject;

    await execute(ProcedureName, params);

    return res.status(200).send({ message: "Product updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: (error as Error).message,
      message: "Internal Server Error",
    });
  }
};

//DELETE POST
export const deletePost = async (req: Request, res: Response) => {
  try {
    const postID = req.params.ID;
    if (!postID) return res.status(400).send({ error: "Id is required" });

    const { error } = validatePostId.validate({ postID });

    if (error) return res.status(400).send({ error: "please input id" });

    const procedureName = "deletePost";
    await execute(procedureName, { postID });

    res.status(201).send({ message: "product deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: (error as Error).message,
      message: "Internal Sever Error",
    });
  }
};

// //GET SINGLE POST
export const getSinglePost = async (req: Request, res: Response) => {
  try {
    const postID = req.params.ID;
    console.log(postID);

    if (!postID) return res.status(400).send({ error: "Id is required" });

    const { error } = validatePostId.validate({ postID });
    console.log(error);

    if (error) return res.status(400).send({ error: error.details[0].message });
    // console.log("hello");

    const procedureName = "getPostById";
    const result = await execute(procedureName, { postID });

    res.json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: "internal server error" });
  }
};


//CREATE COMMENT
export const createComment = async (req: Request, res: Response) => {
  try {
    const { comment, userID, postID } = req.body;

    // console.log(req.body);

    const { error } = validateComment.validate(req.body);

    // console.log(error);

    if (error)
      return res.status(400).send({ error: "please place correct details" });

    const newPost: Post = {
      postID: v4(),
      postContent,
      imageUrl,
      userID,
    };

    const procedure = "createPost";
    const params = newPost;

    await execute(procedure, params);
    return res.send({ message: "post created successfully" });
  } catch (error) {
    console.log(error);
    res.send((error as Error).message);
  }
};
//UPDATE COMMENT
//DELETE COMMENT
export const deleteComment = async (req: Request, res: Response) => {
  try {
    const commentID = req.params.ID;
    if (!commentID) return res.status(400).send({ error: "Id is required" });

    const { error } = validatePostId.validate({ commentID });

    if (error) return res.status(400).send({ error: "please input id" });

    const procedureName = "deleteComment";
    await execute(procedureName, { commentID });

    res.status(201).send({ message: "comment deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: (error as Error).message,
      message: "Internal Sever Error",
    });
  }
};
