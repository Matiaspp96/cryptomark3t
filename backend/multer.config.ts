import { MulterModuleOptions } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { randomBytes } from 'crypto';

export const multerConfig = {
  
  storage: diskStorage({
    destination:  './uploads',
    

    filename: (req, file, cb) => {
      const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      cb(null, `${1}${extname(file.originalname)}`);
     
    },
  }), 
};