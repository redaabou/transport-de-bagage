import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createReview = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { transportId, rating, comment } = req.body;
    const userId = (req as any).user.id;
    const review = await prisma.review.create({
      data: {
        rating,
        comment,
        userId,
        transportId,
      },
    });
    res.status(201).json({ message: 'Review created successfully', review });
  } catch (error) {
    next(error);
  }
};

export const getReviewsByTransport = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { transportId } = req.params;
    const reviews = await prisma.review.findMany({
      where: { transportId: parseInt(transportId) },
      include: { user: { select: { name: true, email: true } } },
    });
    res.json(reviews);
  } catch (error) {
    next(error);
  }
};