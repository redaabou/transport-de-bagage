import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }

  try {
    console.log('Received token:', token);
    console.log('JWT_SECRET:', process.env.JWT_SECRET);
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number; isOwner: boolean };
    
    if (!decoded) {
      res.status(401).json({ error: 'Invalid token' });
      return;
    }
    console.log('Decoded token:', decoded);
    
    (req as any).user = decoded;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};