const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    // Ensure uploads directory exists
    const uploadPath = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function(req, file, cb) {
    // Use original filename with timestamp to avoid duplicates
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.originalname.split('.')[0] + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Configure upload settings
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Render upload form
router.get('/upload', (req, res) => {
  res.render('upload', { message: null });
});

// Handle file upload
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.render('upload', { message: 'Error: No file selected!' });
  }
  
  // Get list of files in uploads directory for display
  const uploadedFiles = fs.readdirSync(path.join(__dirname, '../uploads'));
  
  res.render('upload', { 
    message: 'File uploaded successfully!', 
    file: req.file,
    files: uploadedFiles
  });
});

module.exports = router; 