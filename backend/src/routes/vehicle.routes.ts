import { Router } from 'express';
import { authenticate, requireAdmin } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate';
import { upload } from '../middleware/upload.middleware';
import {
  createVehicleSchema,
  updateVehicleSchema,
  searchVehicleSchema,
  restockVehicleSchema,
} from '../schemas/vehicle.schema';
import * as vehicleController from '../controllers/vehicle.controller';

export const vehicleRouter = Router();

// Public — anyone can browse the inventory
vehicleRouter.get('/', vehicleController.getVehicles);
vehicleRouter.get('/search', validate({ query: searchVehicleSchema }), vehicleController.searchVehicles);
vehicleRouter.get('/:id', vehicleController.getVehicleById);

// Protected — must be logged in
vehicleRouter.post('/:id/purchase', authenticate, vehicleController.purchaseVehicle);

// Admin only
vehicleRouter.post('/upload-image', authenticate, requireAdmin, upload.single('image'), vehicleController.uploadImage);
vehicleRouter.post('/', authenticate, requireAdmin, validate({ body: createVehicleSchema }), vehicleController.createVehicle);
vehicleRouter.put('/:id', authenticate, requireAdmin, validate({ body: updateVehicleSchema }), vehicleController.updateVehicle);
vehicleRouter.delete('/:id', authenticate, requireAdmin, vehicleController.deleteVehicle);
vehicleRouter.post('/:id/restock', authenticate, requireAdmin, validate({ body: restockVehicleSchema }), vehicleController.restockVehicle);

