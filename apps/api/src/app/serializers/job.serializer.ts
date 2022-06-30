import { Job } from 'bull';
import { Serializer } from './serializer';

export class JobSerializer extends Serializer<Job> {
  serializeCollection(jobs: Job[]) {
    return Promise.all(jobs.map((job) => this.serialize(job)));
  }

  async serialize(job: Job) {
    return {
      jobId: job.id,
      status: await job.getState(),
      progress: job.progress(),
    };
  }
}
