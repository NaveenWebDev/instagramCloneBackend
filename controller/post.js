const UserPost = require("../Models/postSchema");
const cloudnary = require("cloudinary").v2;

function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}
async function uploadFileToCloudinary(file, folder, quality) {
  const options = { folder };

  if (quality) {
    options.quality = quality;
  }

  options.resource_type = "auto";
  return await cloudnary.uploader.upload(file.tempFilePath, options);
}

const posts = async (req, res) => {
  try {
    const { userId, description } = req.body;

    const file = req.files.imageFile;
    console.log(file);

    // if (!userId || !description || !file) {
    //     return res.status(400).json({
    //       success: false,
    //       message: "all fields are required",
    //     });
    //   }

    //validation
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "file format not supported",
      });
    }

    //is file formate suppported

    const respone = await uploadFileToCloudinary(file, "naveenCode");
    console.log(respone);

    const postData =await UserPost.create({
      userId,
      description,
      imageUrl: respone.secure_url,
    });

    return res.status(201).json({
      message: "Post uploaded successfully",
      postData,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error while upload",
      error: err.message,
    });
  }
};

module.exports = posts;
