import React, { createRef, SyntheticEvent, useState } from 'react';
import { Resolution, UploadVideo } from '@transcoder/api-interfaces';
import { Button, Select, Input, Center, FormLabel } from '@chakra-ui/react';

export const UploadForm = (props: {
  onUploadFinished: (jobId: string) => void;
  controlsDisabled: boolean;
}) => {
  const fileInput = createRef<HTMLInputElement>();
  const resolutionInput = createRef<HTMLSelectElement>();
  const [isUploading, setIsUploading] = useState(false);

  const resolutions = Object.keys(Resolution).map((key) => ({
    text: key,
    value: Resolution[key as keyof typeof Resolution],
  }));

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    if (
      fileInput.current &&
      fileInput.current.files &&
      fileInput.current.files.length > 0 &&
      resolutionInput.current
    ) {
      const data = new FormData();

      data.append('video', fileInput.current.files[0], 'video');
      data.append('resolution', resolutionInput.current.value);

      setIsUploading(true);

      fetch('/api/video', {
        method: 'post',
        body: data,
      })
        .then((r) => r.json())
        .then((response: UploadVideo) => {
          setIsUploading(false);
          props.onUploadFinished(response.jobId);
        });
    }
  };

  return (
    <Center>
      <form onSubmit={handleSubmit}>
        <FormLabel>Video to transcode</FormLabel>
        <Input
          accept="video/*"
          type="file"
          name="video"
          id="video-input"
          ref={fileInput}
          marginBottom={5}
          disabled={props.controlsDisabled}
        />
        <FormLabel>Output resolution</FormLabel>
        <Select
          ref={resolutionInput}
          marginBottom={5}
          disabled={props.controlsDisabled}
        >
          {resolutions.map((res) => (
            <option value={res.value} key={res.value}>{res.text}</option>
          ))}
        </Select>
        <Center>
          <Button
            type="submit"
            colorScheme={'green'}
            marginBottom={5}
            width="50%"
            isLoading={isUploading}
            onClick={handleSubmit}
            disabled={props.controlsDisabled}
          >
            Upload
          </Button>
        </Center>
      </form>
    </Center>
  );
};

export default UploadForm;
