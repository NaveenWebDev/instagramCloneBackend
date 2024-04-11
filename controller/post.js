const UserPost = require("../Models/postSchema")

const posts = async(req, res)=>{
    try{
        const {userId, description, imageUrl} = req.body;

        if(!userId || !description || !imageUrl){
            return res.status(400).json({
                success:false,
                message:"all fields are required"
            })
        }

        const postData = UserPost.create({
            userId,
            description,
            imageUrl
        })

        return res.status(201).json({
            message: 'Post uploaded successfully',
            postData
        });

    }catch(err){
        res.status(500).json({ 
            message: 'Error signing up',
            error:err.message
        });
    }
} 

module.exports = posts
