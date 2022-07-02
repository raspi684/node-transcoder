import { Request, Response } from 'express';
import { Container } from '../../ioc';
import { JobSerializer } from '../serializers/job.serializer';
import { AppService } from '../services/app.service';

export class AppController {
  static async downloadVideo(req: Request, res: Response) {
    const { jobId } = req.params;

    const container = Container.getInstance();
    const appService = container.get(AppService);

    const videoPath = await appService.getVideoPathFromJob({ jobId });

    res.download(videoPath);
  }

  static async getJobInfo(req: Request, res: Response) {
    const { jobId } = req.params;

    const container = Container.getInstance();
    const appService = container.get(AppService);
    const serializer = container.get(JobSerializer);

    const job = await appService.getJob({ jobId });

    res.send(await serializer.serialize(job));
  }

  static async uploadVideo(req: Request, res: Response) {
    const { file } = req;
    const { resolution } = req.body;

    const container = Container.getInstance();
    const service = container.get(AppService);
    const serializer = container.get(JobSerializer);

    const createdJob = await service.processVideo({
      file,
      resolution,
    });

    res.status(202).send(await serializer.serialize(createdJob));
  }
}
