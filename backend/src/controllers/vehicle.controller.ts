import type { Request, Response } from 'express';
import * as vehicleService from '../services/vehicle.service';

export async function getVehicles(_req: Request, res: Response): Promise<void> {
  const vehicles = await vehicleService.getAllVehicles();
  res.status(200).json({ vehicles });
}

export async function searchVehicles(req: Request, res: Response): Promise<void> {
  const vehicles = await vehicleService.searchVehicles(req.query as any);
  res.status(200).json({ vehicles });
}

export async function getVehicleById(req: Request, res: Response): Promise<void> {
  const id = req.params.id as string;
  const vehicle = await vehicleService.getVehicleById(id);
  res.status(200).json({ vehicle });
}

export async function createVehicle(req: Request, res: Response): Promise<void> {
  const vehicle = await vehicleService.createVehicle(req.body);
  res.status(201).json({ vehicle });
}

export async function updateVehicle(req: Request, res: Response): Promise<void> {
  const id = req.params.id as string;
  const vehicle = await vehicleService.updateVehicle(id, req.body);
  res.status(200).json({ vehicle });
}

export async function deleteVehicle(req: Request, res: Response): Promise<void> {
  const id = req.params.id as string;
  await vehicleService.deleteVehicle(id);
  res.status(204).send();
}

export async function purchaseVehicle(req: Request, res: Response): Promise<void> {
  const id = req.params.id as string;
  const vehicle = await vehicleService.purchaseVehicle(id);
  res.status(200).json({ vehicle });
}

export async function restockVehicle(req: Request, res: Response): Promise<void> {
  const id = req.params.id as string;
  const vehicle = await vehicleService.restockVehicle(id, req.body.quantity);
  res.status(200).json({ vehicle });
}

export async function uploadImage(req: Request, res: Response): Promise<void> {
  if (!req.file) {
    res.status(400).json({ error: { message: 'No image file uploaded' } });
    return;
  }
  const imageUrl = await vehicleService.uploadVehicleImage(
    req.file.buffer,
    req.file.originalname,
    req.body.vehicleId,
  );
  res.status(200).json({ imageUrl });
}


