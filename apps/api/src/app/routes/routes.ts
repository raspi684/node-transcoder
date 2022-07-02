import Router from 'express-promise-router';
import * as multer from 'multer';
import { AppController } from '../controllers/app.controller';
import { validationMiddleware } from '../middlewares';
import {
  uploadVideoValidationSchema,
  getJobStatusValidationSchema,
  getVideoFromJobValidationSchema,
} from '../validation-schemas';

const uploadFiles = multer({ dest: 'uploads/' });

const appRoutes = Router();

appRoutes.post(
  '/video',
  uploadFiles.single('video'),
  validationMiddleware(uploadVideoValidationSchema, 'body'),
  AppController.uploadVideo
);
appRoutes.get(
  '/job/:jobId/video',
  validationMiddleware(getVideoFromJobValidationSchema, 'params'),
  AppController.downloadVideo
);
appRoutes.get(
  '/job/:jobId',
  validationMiddleware(getJobStatusValidationSchema, 'params'),
  AppController.getJobInfo
);

export default appRoutes;
