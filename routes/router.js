const express = require("express")
const router =  express.Router()

const {signup, login} = require("../controller/Auth")
const posts = require("../controller/post")
const {imageUpload, getProfileData} = require("../controller/myfileupload")

router.post("/signup", signup)
router.post("/login", login)
router.post("/post", posts)
router.post("/imageupload", imageUpload);
router.get("/updateProfileData", getProfileData)
module.exports = router