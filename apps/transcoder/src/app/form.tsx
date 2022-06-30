import React, { createRef, useState } from 'react';
import {
  TranscodingProgress,
  UploadVideo,
  Resolution,
} from '@transcoder/api-interfaces';

export const Form = () => {
  const [m, setMessage] = useState<UploadVideo>({
    jobId: '0',
    progress: 0,
    status: 'idle',
  });
  const [transcodingProgress, setTranscodingProgress] =
    useState<TranscodingProgress>({
      jobId: 'unknown',
      progress: 0,
      status: 'idle',
    });

  const fileInput = createRef<HTMLInputElement>();
  const resolutionInput = createRef<HTMLSelectElement>();

  const resolutions = Object.keys(Resolution).map((key) => ({
    text: key,
    value: Resolution[key as keyof typeof Resolution],
  }));

  const handleSubmit = (event: any) => {
    const data = new FormData();

    event.preventDefault();
    if (fileInput!.current!.files && fileInput!.current!.files.length > 0) {
      data.append('video', fileInput!.current!.files[0], 'video');
      data.append('resolution', resolutionInput!.current!.value);

      fetch('/api/video', {
        method: 'post',
        body: data,
      })
        .then((r) => r.json())
        .then((a) => {
          setMessage(a);
          checkProgress(a.jobId);
        });
    }
  };

  const checkProgress = (jobId: string) => {
    fetch(`/api/job/${jobId}`)
      .then((r) => r.json())
      .then((progress) => {
        setTranscodingProgress(progress);
        if (progress.progress < 100) {
          setTimeout(() => checkProgress(jobId), 700);
        } else {
          // window.location.href += `api/job/${progress.jobId}/video`;
        }
      });
  };

  const downloadVideo = () => {
    window.location.href += `api/job/${transcodingProgress.jobId}/video`;
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Upload form:</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="file" name="video" id="video-input" ref={fileInput} />
        </div>
        <div>
          <select ref={resolutionInput}>
            {resolutions.map((res) => (
              <option value={res.value}>{res.text}</option>
            ))}
          </select>
        </div>
        <button type="submit">Upload</button>
      </form>
      <div>
        Status: {m.status}
        <br />
        {m.jobId && `Job ID: ${m.jobId}`}
      </div>
      <div>
        <h3>Transcoding status</h3>
        <div>
          <progress value={transcodingProgress.progress} max="100" /> <br />
          {transcodingProgress.progress}% <br />
          {transcodingProgress.status}
        </div>
      </div>
      {transcodingProgress.status == 'completed' && (
        <button onClick={downloadVideo}>Download video</button>
      )}
    </div>
  );
};

export default Form;
