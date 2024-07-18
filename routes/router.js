const express = require("express");
const router = express.Router();

const { signup, login } = require("../controller/Auth");
const {
  posts,
  getPost,
  getPostsByPostId,
  postLikes,
  getLikesCount,
  deletePostLike,
  addComment,
  getComment,
  deletePost,
} = require("../controller/post");
const { imageUpload, getProfileData } = require("../controller/myfileupload");
const {
  chat,
  createChat,
  getUserDataForChat,
  getUserDataForChatById,
} = require("../controller/chatController");

router.post("/signup", signup);
router.post("/login", login);
router.post("/post", posts);
router.get("/getPost", getPost);
router.post("/imageupload", imageUpload);
router.get("/getProfileData/:id", getProfileData);
router.post("/createChat", createChat);
router.get("/getUserDataForChat", getUserDataForChat);
router.get("/getUserDataForChatById/:id", getUserDataForChatById);
router.get("/chat/userId/:userId/receiverId/:receiverId", chat);
router.get("/getPostsByPostId/userId=:userId", getPostsByPostId);
router.post("/postLikes", postLikes);
router.get("/getLikesCount/:postId/userId/:userId", getLikesCount);
router.delete("/deletePostLike/:postId/userId/:userId", deletePostLike);
router.post("/addComment", addComment);
router.get("/getComment/postId/:postId", getComment);
router.delete("/deletePost/postId=:postId", deletePost);

module.exports = router;
