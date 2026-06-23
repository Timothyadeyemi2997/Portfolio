const cloudinary = require(
  "../config/cloudinary"
);

const streamifier = require("streamifier");

const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    const stream =
      cloudinary.uploader.upload_stream(
        {
          folder: "portfolio-projects",
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }

          resolve(result);
        }
      );

    streamifier
      .createReadStream(file.buffer)
      .pipe(stream);
  });
};

module.exports = uploadToCloudinary;