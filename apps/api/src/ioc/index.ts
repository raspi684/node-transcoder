import { Container as InversifyContainer } from 'inversify';
import { JobSerializer } from '../app/serializers/job.serializer';
import { AppService } from '../app/services/app.service';
import { VideoQueue } from '../app/queues/video.queue';

export class Container {
  static instance: InversifyContainer;

  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new InversifyContainer();
      this.init();
    }

    return this.instance;
  }

  private static init() {
    const container = Container.getInstance();

    container
      .bind(VideoQueue)
      .toDynamicValue(() => new VideoQueue())
      .inSingletonScope();

    container.bind(AppService).to(AppService).inSingletonScope();
    container.bind(JobSerializer).to(JobSerializer).inSingletonScope();
  }
}
