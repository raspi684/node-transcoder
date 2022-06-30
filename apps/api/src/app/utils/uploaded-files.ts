import { existsSync } from 'fs';
import { rm } from 'fs/promises';
import { join } from 'path';

const uploadedDir = 'uploads';

const constructPathToUploadsDir = () => {
  return join(__dirname, '..', '..', '..', uploadedDir);
};

const constructPathToFileInUploadsDir = (filename: string) => {
  return join(__dirname, '..', '..', '..', uploadedDir, filename);
};

const removeUploadedFile = (filepath: string) => {
  return rm(filepath);
};

const removeUploadedFileIfExists = (filename: string) => {
  const filepath = join(constructPathToUploadsDir(), filename);

  if (existsSync) {
    return removeUploadedFile(filepath);
  }
};

export {
  removeUploadedFileIfExists,
  constructPathToUploadsDir,
  constructPathToFileInUploadsDir,
};
