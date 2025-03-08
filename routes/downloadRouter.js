const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Render files list for download
router.get('/download', (req, res) => {
  try {
    const uploadsDir = path.join(__dirname, '../uploads');
    
    // Ensure uploads directory exists
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    
    // Get all files from uploads directory
    const files = fs.readdirSync(uploadsDir);
    
    res.render('download', { files, error: null });
  } catch (error) {
    console.error('Error reading files:', error);
    res.render('download', { files: [], error: 'Error reading files directory' });
  }
});

// Handle file download
router.get('/download/:filename', (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../uploads', filename);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.render('download', { 
        files: fs.readdirSync(path.join(__dirname, '../uploads')), 
        error: 'File not found' 
      });
    }
    
    // Download the file
    res.download(filePath, filename, (err) => {
      if (err) {
        console.error('Download error:', err);
        return res.status(500).send('Error downloading file');
      }
    });
  } catch (error) {
    console.error('File download error:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router; 