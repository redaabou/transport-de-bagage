import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Request, Response, NextFunction } from 'express';


const uploadDir = path.join(__dirname, '..', '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});


const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Error: Images Only!'));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 },
  fileFilter: fileFilter
});

export const uploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
  upload.single('image')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      
      return res.status(400).json({ error: err.message });
    } else if (err) {
      
      return res.status(500).json({ error: err.message });
    }
    
    
    if (req.file) {
      req.body.image = `/uploads/${req.file.filename}`;
    }
    next();
  });
};