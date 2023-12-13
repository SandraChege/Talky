import joi from "joi";

export const validateComment = joi.object().keys({
  comment: joi.string(),
  userID: joi.string(),
  postID: joi.string().required(),
});

export const validateUpdatePost = joi.object().keys({
  postID: joi.string().required(),
  imageUrl: joi.string().required(),
  userID: joi.string().required(),
  postContent: joi.string().required(),
});

export const validatePostId = joi.object().keys({
  postID: joi.string().min(8).required(),
});
