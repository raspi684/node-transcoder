import React, { useState } from 'react';
import { TranscodingProgress } from '@transcoder/api-interfaces';
import {
  Container,
  Center,
} from '@chakra-ui/react';
import UploadForm from '../components/upload-form';
import TranscodingProgressComponent from '../components/transcoding-progress';
import OutputPreview from '../components/output-preview';

export const Form = () => {
  const [transcodingProgress, setTranscodingProgress] =
    useState<TranscodingProgress>({
      jobId: '',
      progress: 0,
      status: '',
    });

  const checkProgress = (jobId: string) => {
    fetch(`/api/job/${jobId}`)
      .then((r) => r.json())
      .then((progress) => {
        setTranscodingProgress(progress);
        if (progress.progress < 100) {
          setTimeout(() => checkProgress(jobId), 700);
        }
      });
  };

  const videoProcessingStatusses = ['active', 'waiting'];

  return (
    <Container>
      <UploadForm
        onUploadFinished={checkProgress}
        controlsDisabled={videoProcessingStatusses.includes(
          transcodingProgress.status
        )}
      />
      {videoProcessingStatusses.includes(transcodingProgress.status) && (
        <TranscodingProgressComponent progress={transcodingProgress.progress} status={transcodingProgress.status} />
      )}
      <Center>
        {transcodingProgress.status === 'completed' && (
          <OutputPreview jobId={transcodingProgress.jobId} />
        )}
      </Center>
    </Container>
  );
};

export default Form;
