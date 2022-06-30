export interface Message {
  message: string;
}

export interface UploadVideo {
  jobId: string;
  status: string;
  progress: number;
}

export interface TranscodingProgress {
  jobId: string;
  status: string;
  progress: number;
}
