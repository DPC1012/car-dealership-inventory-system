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

// Protect all vehicle routes with authentication
vehicleRouter.use(authenticate);

vehicleRouter.post('/upload-image', requireAdmin, upload.single('image'), vehicleController.uploadImage);
vehicleRouter.get('/', vehicleController.getVehicles);
vehicleRouter.get('/search', validate({ query: searchVehicleSchema }), vehicleController.searchVehicles);
vehicleRouter.get('/:id', vehicleController.getVehicleById);
vehicleRouter.post('/', validate({ body: createVehicleSchema }), vehicleController.createVehicle);
vehicleRouter.put('/:id', validate({ body: updateVehicleSchema }), vehicleController.updateVehicle);
vehicleRouter.delete('/:id', requireAdmin, vehicleController.deleteVehicle);
vehicleRouter.post('/:id/purchase', vehicleController.purchaseVehicle);
vehicleRouter.post('/:id/restock', requireAdmin, validate({ body: restockVehicleSchema }), vehicleController.restockVehicle);

