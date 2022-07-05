import { DoneCallback, Job } from 'bull';
import { Container } from '../../ioc';
import { VideoQueue } from '../queues/video.queue';
import * as hbjs from 'handbrake-js';
import {
  constructPathToFileInUploadsDir,
  removeUploadedFileIfExists,
} from '../utils/uploaded-files';
import { VideoTranscodeJob } from '../jobs';

export default class VideoQueueWorker {
  private constructor() {
    const videoQueue = Container.getInstance().get(VideoQueue);

    videoQueue.process(this.process);
  }

  static start() {
    new VideoQueueWorker();
  }

  static constructNewFilename({
    filename,
    outputFormat,
  }: {
    filename: string;
    outputFormat: string;
  }) {
    return `transcoded-${filename}.${outputFormat}`;
  }

  process(job: Job<VideoTranscodeJob>, done: DoneCallback) {
    const { data } = job;

    console.log(
      `[VIDEO QUEUE WORKER] File ${data.filename}, ${data.outputResolution}, ${data.outputFormat}`
    );

    hbjs
      .spawn({
        width: +data.outputResolution.split(':')[0],
        height: +data.outputResolution.split(':')[1],
        input: constructPathToFileInUploadsDir(data.filename),
        output: constructPathToFileInUploadsDir(
          VideoQueueWorker.constructNewFilename(data)
        ),
      })
      .on('progress', (progress) => {
        job.progress(progress.percentComplete);
      })
      .on('error', (err) => {
        console.error('[VIDEO QUEUE WORKER] Transcoding failed', err);
        done(err);
      })
      .on('end', async () => {
        await removeUploadedFileIfExists(data.filename);
        done(null, VideoQueueWorker.constructNewFilename(data));
      });
  }
}
