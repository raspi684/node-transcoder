import * as Queue from 'bull';
import { injectable } from 'inversify';

@injectable()
export class VideoQueue extends Queue {
  constructor() {
    super(VideoQueue.name);
  }
}
