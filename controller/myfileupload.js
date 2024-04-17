const filemodel = require("../Models/file");
const cloudnary = require("cloudinary").v2;
const nodemailer = require("nodemailer");
require("dotenv").config();
//localfileupload = handler function

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

// image upload on cloudnary
exports.imageUpload = async (req, res) => {
  try {
    // data fetch
    const { userId, email } = req.body;
    console.log(userId, email);

    const file = req.files.imageFile;
    console.log(file);

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
    //save entry on database

    const fileData = await filemodel.create({
      userId,
      imageUrl: respone.secure_url,
    });

    // ====================mail send ===========================
    if (fileData) {
      async function sendMail(){
        // create email transporter
        const transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:'ns232280@gmail.com',
                pass:'tsgitjodfcvxolcf'
            }
        })
    
        //configure email content.
    
        const mailOption = {
            from:"naveen@gmail.com",
            to:'ns222280@gmail.com',
            subject:'welcom to nodemailer mail',
            html:`<h1>File successfuly uploaded</h1>`
        }
    
        // send email 
    
        try{
            const result = await transporter.sendMail(mailOption)
            console.log("email send successfully");
        }catch(err){
            console.log("mail not send");
        }
    
    }
    sendMail()
    }

    res.json({
      success: true,
      imageUrl: respone.secure_url,
      userId,
      email,
      message: "image successfuly uploaded",
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      success: false,
      message: "something went wrong",
    });
  }
};

