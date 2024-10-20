import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.on('close', () => {
      console.log('Request...');
      console.log('Method:', req.method);
      console.log('Path:', req.path);
      console.log('Status:', res.statusCode);
      console.log('Response:', res.statusMessage);
    });
    next();
  }
}
