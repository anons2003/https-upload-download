const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');
const app = express();
const PORT = process.env.PORT || 3000;

// Import routes
const uploadRouter = require('./routes/uploadRouter');
const downloadRouter = require('./routes/downloadRouter');

// Configure EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set up routes
app.use('/', uploadRouter);
app.use('/', downloadRouter);

// Home route
app.get('/', (req, res) => {
  res.render('index');
});

// Start server
try {
  // Check if HTTPS certificates exist, if not use HTTP
  if (fs.existsSync('./key.pem') && fs.existsSync('./cert.pem')) {
    // HTTPS server
    const options = {
      key: fs.readFileSync('./key.pem'),
      cert: fs.readFileSync('./cert.pem')
    };
    
    https.createServer(options, app).listen(PORT, () => {
      console.log(`HTTPS Server running on port ${PORT}`);
    });
  } else {
    // HTTP server fallback
    app.listen(PORT, () => {
      console.log(`HTTP Server running on port ${PORT}`);
      console.log('HTTPS certificates not found. Running in HTTP mode.');
    });
  }
} catch (error) {
  console.error('Server startup error:', error);
  // HTTP server fallback
  app.listen(PORT, () => {
    console.log(`HTTP Server running on port ${PORT} (fallback due to error)`);
  });
} 