import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password, name, isOwner } = req.body;
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ error: 'User already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        isOwner,
      },
    });
    const token = jwt.sign({ id: user.id, isOwner: user.isOwner }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    res.status(201).json({ message: 'User created successfully', user, token });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(400).json({ error: 'user not found' });
      return;
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(400).json({ error: 'Invalid password' });
      return;
    }
    const token = jwt.sign(
      { id: user.id, email: user.email, isOwner: user.isOwner },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );
    res.json({ message: 'Login successful', user, token });
  } catch (error) {
    next(error);
  }
};