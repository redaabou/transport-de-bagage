import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createTransport = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { image, city, description, status, pricePerKm } = req.body;
    const userId = (req as any).user.id;
    const transport = await prisma.transport.create({
      data: {
        image,
        city,
        description,
        status,
        pricePerKm: parseFloat(pricePerKm),
        ownerId: userId,
      },
    });
    res.status(201).json({ message: 'Transport created successfully', transport });
  } catch (error) {
    next(error);
  }
};

export const getAllTransports = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const transports = await prisma.transport.findMany({
      include: { owner: { select: { name: true, email: true } } },
    });
    res.json(transports);
  } catch (error) {
    next(error);
  }
};

export const getTransportById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const transport = await prisma.transport.findUnique({
      where: { id: parseInt(id) },
      include: { owner: { select: { name: true, email: true } } },
    });
    if (!transport) {
      res.status(404).json({ error: 'Transport not found' });
      return;
    }
    res.json(transport);
  } catch (error) {
    next(error);
  }
};

export const updateTransport = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    let updateData: any = { status };

    if (req.body.image) updateData.image = req.body.image;
    if (req.body.city) updateData.city = req.body.city;
    if (req.body.description) updateData.description = req.body.description;
    if (req.body.status) updateData.status = req.body.status;
    if (req.body.pricePerKm) updateData.pricePerKm = parseFloat(req.body.pricePerKm);
    const userId = (req as any).user.id;
    const transport = await prisma.transport.findUnique({ where: { id: parseInt(id) } });
    if (!transport) {
      res.status(404).json({ error: 'Transport not found' });
      return;
    }
    if (transport.ownerId !== userId) {
      res.status(403).json({ error: 'Not authorized to update this transport' });
      return;
    }
    const updatedTransport = await prisma.transport.update({
      where: { id: parseInt(id) },
      data: updateData,
    });
    res.json({ message: 'Transport updated successfully', transport: updatedTransport });
  } catch (error) {
    next(error);
  }
};

export const deleteTransport = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;
    const transport = await prisma.transport.findUnique({ where: { id: parseInt(id) } });
    if (!transport) {
      res.status(404).json({ error: 'Transport not found' });
      return;
    }
    if (transport.ownerId !== userId) {
      res.status(403).json({ error: 'Not authorized to delete this transport' });
      return;
    }
    await prisma.transport.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Transport deleted successfully' });
  } catch (error) {
    next(error);
  }
};