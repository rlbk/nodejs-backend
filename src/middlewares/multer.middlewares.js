import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    const fileName = file.originalname.split(".");
    const firstName = fileName[0].split(" ").join("_");
    const fileSuffix = fileName[fileName.length - 1];
    cb(null, firstName + "_" + uniqueSuffix + "." + fileSuffix);
  },
});

export const upload = multer({ storage });
