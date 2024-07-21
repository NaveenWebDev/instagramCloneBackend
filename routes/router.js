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
  searchUser,
} = require("../controller/post");
const { imageUpload, getProfileData } = require("../controller/myfileupload");
const {
  chat,
  createChat,
  getUserDataForChat,
  getUserDataForChatById,
} = require("../controller/chatController");

const {
  addFollow, 
  deleteFollow,
  updateUserProfileData,
} = require("../controller/followController");

router.post("/signup", signup);
router.post("/login", login);
router.post("/post", posts);
router.get("/getPost", getPost);
router.post("/imageupload", imageUpload);
router.get("/getProfileData/:id/userId=:userId", getProfileData);
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
router.get("/searchUser/userName=:userName", searchUser);

// =========================follower & follow routes======================

router.post("/addFollow/userId=:userId/followingId=:followingId", addFollow)
router.delete("/deleteFollow/userId=:userId/followingId=:followingId", deleteFollow)
router.patch("/updateUserProfileData", updateUserProfileData)

module.exports = router;
