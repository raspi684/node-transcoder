import { Resolution } from '@transcoder/api-interfaces';
import { existsSync } from 'fs';
import { inject, injectable } from 'inversify';
import { join } from 'path';
import { VideoQueue } from '../queues/video.queue';
import { BadRequestException, NotFoundException } from '../exceptions';
import {
  constructPathToUploadsDir,
  removeUploadedFileIfExists,
} from '../utils/uploaded-files';
import { createVideoTransodeJob } from '../jobs';

@injectable()
export class AppService {
  constructor(@inject(VideoQueue) private readonly videoQueue: VideoQueue) {}

  async processVideo({
    file,
    resolution,
  }: {
    file: Express.Multer.File;
    resolution: Resolution;
  }) {
    const uploadedFileIsPresent = file && file.mimetype;
    const uploadedFileIsVideo =
      uploadedFileIsPresent && file.mimetype.split('/')[0] === 'video';

    if (!uploadedFileIsPresent || !uploadedFileIsVideo) {
      await removeUploadedFileIfExists(file.filename);
      throw BadRequestException.create({ message: 'File is not a video.' });
    }

    const job = await this.videoQueue.add(
      createVideoTransodeJob({
        inputFile: file,
        resolution,
      })
    );

    return job;
  }

  async getVideoPathFromJob({ jobId }: { jobId: string }) {
    const job = await this.videoQueue.getJob(jobId);

    if (!job) {
      throw NotFoundException.create();
    }

    const videoPath = join(
      constructPathToUploadsDir(),
      job?.returnvalue ?? 'undefined'
    );

    if (!existsSync(videoPath)) {
      throw NotFoundException.create({ message: 'File not found.' });
    }

    return videoPath;
  }

  async getJob({ jobId }: { jobId: string }) {
    const job = await this.videoQueue.getJob(jobId);

    if (!job) {
      throw NotFoundException.create();
    }

    return job;
  }
}
