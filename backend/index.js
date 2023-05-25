// require('dotenv').config()

// const express = require('express');
// const mongoose = require('mongoose');
// const Grid = require('gridfs-stream');
// const multer = require('multer');
// const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;

// const app = express();

// // Create a new connection to your MongoDB database
// const conn = mongoose.createConnection(process.env.MONGO_URL);

// // Start the server
// const port = process.env.PORT || 6000;
// app.listen(port, () => console.log(`Server started on port ${port}`));

// // Init gfs
// let gfs;

// conn.once('open', () => {
//   // Init stream
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('uploads');
// });

// // Create storage engine
// const storage = new GridFsStorage({

//     url: process.env.MONGO_URL,
//     options: { 
//         useNewUrlParser: true, 
//         useUnifiedTopology: true 
//     },

//     file: (req, file) => {
//       return new Promise((resolve, reject) => {
//         const filename = file.originalname;
//         const fileInfo = {
//           filename: filename,
//           bucketName: 'uploads',
//         };
//         resolve(fileInfo);
//       });
//     },

//   });
  
//   const upload = multer({ storage });

// // Route for uploading files
// app.post('/upload', upload.single('file'), (req, res) => {
//   res.json({ file: req.file });
// });


require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;

const User = require('./Routes/user')

const app = express();


// Create a new connection to your MongoDB database
const conn = mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        // Start the server
        const port = process.env.PORT || 6000;
        app.listen(port, () => console.log(`Server started on port ${port}`));
    })
    .catch((error) => {
        console.log(error)
    }); 

// Create storage engine
const storage = new GridFsStorage({
    url: process.env.MONGO_URL,
    options: { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    },
    file: (req, file) => {
        return new Promise((resolve, reject) => {
        const filename = file.originalname;
        const fileInfo = {
            filename: filename,
            bucketName: 'uploads',
        };
        resolve(fileInfo);
        });
    },
});

const upload = multer({ storage });

// Route for uploading files
app.use('/upload', upload.single('file'), User);
