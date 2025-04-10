// /* eslint-disable no-console */
// import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
// import fs from 'fs';
// import multer from 'multer';
// import config from '../config';

// cloudinary.config({
//   cloud_name: config.cloudinary.cloudinary_cloud_name,
//   api_key: config.cloudinary.cloudinary_api_key,
//   api_secret: config.cloudinary.cloudinary_api_secret,
// });

// export const sendImageToCloudinary = (
//   imageName: string,
//   path: string,
// ): Promise<Record<string, unknown>> => {
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader.upload(
//       path,
//       { public_id: imageName.trim() },

//       function (error, result) {
//         if (error) {
//           reject(error);
//         }
//         resolve(result as UploadApiResponse);

//         // delete a file asynchronously
//         fs.unlink(path, (err) => {
//           if (err) {
//             console.log(err);
//           } else {
//             console.log('File is uploaded and deleted the temp file!');
//           }
//         });
//       },
//     );
//   });
// };

// const storage = multer.diskStorage({
//   destination: function (_req, _file, cb) {
//     cb(null, process.cwd() + '/uploads');
//   },

//   filename: function (_req, file, cb) {
//     console.log(file);
//     const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e3);
//     cb(null, uniqueSuffix + '-' + file.originalname);
//   },
// });

// export const upload = multer({ storage: storage });

import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { Readable } from 'stream';
import config from '../config';

// Configure Cloudinary
cloudinary.config({
  cloud_name: config.cloudinary.cloudinary_cloud_name,
  api_key: config.cloudinary.cloudinary_api_key,
  api_secret: config.cloudinary.cloudinary_api_secret,
});

// Upload image to Cloudinary
export const sendImageToCloudinary = (
  imageName: string,
  buffer: Buffer,
): Promise<Record<string, unknown>> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { public_id: imageName.trim() },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result as UploadApiResponse);
        }
      },
    );

    // Create a readable stream from the buffer and pipe it to Cloudinary
    const readableStream = new Readable();
    readableStream.push(buffer);
    readableStream.push(null); // Signal end of stream
    readableStream.pipe(uploadStream);
  });
};

// Use memory storage for multer
const storage = multer.memoryStorage(); // Store files in memory instead of disk

export const upload = multer({ storage: storage });