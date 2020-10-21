import multer from 'multer';

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'backend/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}.jpg`);
    }
  })
   
  var upload = multer({ storage  });
  export default upload;