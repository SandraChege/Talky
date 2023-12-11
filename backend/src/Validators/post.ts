import joi from "joi";

export const validatePost = joi.object().keys({
  postContent: joi.string(),
  imageUrl: joi.string(),
  userID: joi.string().required(),
});

export const validateUpdateProduct = joi.object().keys({
  title: joi.string().required(),
  productID: joi.string().min(8).required(),
  price: joi.number().required(),
  image: joi.string().required(),
  category: joi.string().required(),
  description: joi.string().min(5).required(),
  stock: joi.number().required(),
});

export const validateProductId = joi.object().keys({
  productID: joi.string().min(8).required(),
});
