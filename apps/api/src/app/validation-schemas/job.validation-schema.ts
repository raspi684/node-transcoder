import * as joi from 'joi';

const getJobStatusValidationSchema = joi.object({
  jobId: joi.number().required(),
});

const getVideoFromJobValidationSchema = joi.object({
  jobId: joi.number().required(),
});

export { getJobStatusValidationSchema, getVideoFromJobValidationSchema };
