const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = 'public/uploads';

    // Dynamically decide folder based on file fieldname
    if (file.fieldname === 'profilePhoto') {
      folder += '/profilePhotos';
    } else if (file.fieldname === 'cv') {
      folder += '/cv';
    } else if (file.fieldname === 'experienceCertificate') {
      folder += '/experienceCertificates';
    }

    // Ensure the folder exists
    fs.mkdirSync(folder, { recursive: true });

    cb(null, folder);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${file.fieldname}-${Date.now()}${ext}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

module.exports = upload;
