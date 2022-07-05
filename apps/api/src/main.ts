import 'reflect-metadata';
import VideoQueueWorker from './app/workers/video-queue.worker';
import app from './server';

VideoQueueWorker.start();

const port = process.env.port || 3333;
app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
