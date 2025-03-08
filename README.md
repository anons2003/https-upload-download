# File Upload and Download System

A simple yet secure file upload and download system built with Node.js, Express, and Multer.

## Features

- File upload with size validation
- List of uploaded files
- File download functionality
- HTTPS support (optional)
- Beautiful and responsive UI with EJS templates

## Prerequisites

- Node.js (v12 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository or download the source code
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

## Configuration

### HTTPS Setup (Optional)

For HTTPS support, you need to generate SSL certificates. You can use self-signed certificates for development:

```bash
openssl genrsa -out key.pem 2048
openssl req -new -key key.pem -out csr.pem
openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out cert.pem
```

Place the `key.pem` and `cert.pem` files in the root directory of the project.

## Usage

### Starting the Server

```bash
npm start
```

The server will start on port 3000 by default (http://localhost:3000).

### Uploading Files

1. Navigate to the upload page: http://localhost:3000/upload
2. Select a file using the file picker
3. Click the "Upload File" button
4. A success message will appear, and the file details will be displayed

### Downloading Files

1. Navigate to the download page: http://localhost:3000/download
2. You'll see a list of all uploaded files
3. Click the "Download" button next to the file you want to download

## Testing with Postman

### Testing File Upload

1. Open Postman
2. Create a new POST request to http://localhost:3000/upload
3. Go to the Body tab and select form-data
4. Add a field with the key `file` and select a file from your computer
5. Send the request
6. You should receive a response indicating successful upload

### Testing File Download

1. Open Postman
2. Create a new GET request to http://localhost:3000/download/{filename}
   (Replace {filename} with the name of an uploaded file)
3. Send the request
4. The file should be downloaded

## Security Considerations

- File size is limited to 5MB to prevent denial-of-service attacks
- Unique filenames are generated to prevent overwriting existing files
- Always implement proper authentication and authorization in production

## License

This project is licensed under the MIT License - see the LICENSE file for details. 