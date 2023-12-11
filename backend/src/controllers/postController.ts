import { Request, Response } from "express";
import mssql from "mssql";

import { v4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sqlConfig } from "../config/sqlConfig";
import { validatePost } from "../Validators/post";
import { Post } from "../interface/post";
import { execute } from "../helpers/dbHelper";

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
