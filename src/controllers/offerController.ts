import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createOffer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { date, fromLocation, toLocation, transportId } = req.body;
    const userId = (req as any).user.id;
    const offer = await prisma.offer.create({
      data: {
        date: new Date(date),
        fromLocation,
        toLocation,
        userId,
        transportId,
      },
    });
    res.status(201).json({ message: 'Offer created successfully', offer });
  } catch (error) {
    next(error);
  }
};

export const getAllOffers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const offers = await prisma.offer.findMany({
      include: { user: { select: { name: true, email: true } }, transport: true },
    });
    res.json(offers);
  } catch (error) {
    next(error);
  }
};

export const getOfferById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const offer = await prisma.offer.findUnique({
      where: { id: parseInt(id) },
      include: { user: { select: { name: true, email: true } }, transport: true },
    });
    if (!offer) {
      res.status(404).json({ error: 'Offer not found' });
      return;
    }
    res.json(offer);
  } catch (error) {
    next(error);
  }
};

export const updateOfferStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = (req as any).user.id;
    const offer = await prisma.offer.findUnique({
      where: { id: parseInt(id) },
      include: { transport: true },
    });
    if (!offer) {
      res.status(404).json({ error: 'Offer not found' });
      return;
    }
    if (offer.transport.ownerId !== userId) {
      res.status(403).json({ error: 'Not authorized to update this offer status' });
      return;
    }
    const updatedOffer = await prisma.offer.update({
      where: { id: parseInt(id) },
      data: { status },
    });
    res.json({ message: 'Offer status updated successfully', offer: updatedOffer });
  } catch (error) {
    next(error);
  }
};