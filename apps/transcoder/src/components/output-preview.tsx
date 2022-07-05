import { Flex, Button} from '@chakra-ui/react';

export const OutputPreview = (props: { jobId: string }) => {

  const downloadVideo = () => {
    // TODO: download file instead redirecting
    window.location.href += `api/job/${props.jobId}/video`;
  };

  return (
    <Flex direction="column">
      <video
        src={`api/job/${props.jobId}/video`}
        controls={true}
        autoPlay={true}
      />
      <Button
        colorScheme={'green'}
        onClick={downloadVideo}
        marginTop={5}
        width="100%"
      >
        Download video
      </Button>
    </Flex>
  );
};

export default OutputPreview;
