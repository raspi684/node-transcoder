import { Resolution } from '@transcoder/api-interfaces';

export interface VideoTranscodeJob {
  filepath: string;
  filename: string;
  outputResolution: string;
  outputFormat: string;
}

const createVideoTransodeJob = ({
  inputFile,
  resolution,
}: {
  inputFile: Express.Multer.File;
  resolution: Resolution;
}): VideoTranscodeJob => {
  return {
    filepath: inputFile.path,
    filename: inputFile.filename,
    outputResolution: resolution,
    outputFormat: 'mp4',
  };
};

export { createVideoTransodeJob };
