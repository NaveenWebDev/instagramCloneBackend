const express = require("express")
const router =  express.Router()

const {signup, login} = require("../controller/Auth")
const posts = require("../controller/post")

router.post("/signup", signup)
router.post("/login", login)
router.post("/post", posts)


module.exports = posts;