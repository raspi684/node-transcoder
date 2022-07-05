import * as joi from 'joi';
import { Resolution } from '@transcoder/api-interfaces';

const uploadVideoValidationSchema = joi.object({
  resolution: joi
    .string()
    .valid(...Object.values(Resolution))
    .required(),
});

export { uploadVideoValidationSchema };
