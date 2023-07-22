const cloudinary = require("cloudinary").v2;

async function createImageUploadSignature(req, res) {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);
    // console.log(req.body.uploadPreset);

    const signature = await cloudinary.utils.api_sign_request(
      {
        format: "webp",
        timestamp,
        upload_preset: req.body.uploadPreset,
        // api_key: process.env.CLOUDINARY_API_KEY,
      },
      process.env.CLOUDINARY_API_SECRET
    );
    res.status(201).send({ timestamp, signature });
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
}

module.exports = { createImageUploadSignature };
