const multer = require('multer');
const path = require('path');

// Define storage options
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
  },
});

// Define file filtering logic (allow only jpg/png for images and PDF for documents)
const fileFilter = (req, file, cb) => {
  const allowedImageTypes = ['image/jpeg', 'image/png'];
  const allowedPdfTypes = ['application/pdf'];

  if (allowedImageTypes.includes(file.mimetype) || allowedPdfTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

// Initialize multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports = upload;
