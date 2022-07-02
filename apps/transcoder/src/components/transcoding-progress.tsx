import { Progress, Heading, Flex, Spacer } from '@chakra-ui/react';
import { useMemo } from 'react';

export const TranscodingProgress = (props: {
  progress: number;
  status: string;
}) => {
  const jobStatus = useMemo(() => {
    switch (props.status) {
      case 'waiting':
        return 'In queue';
      case 'active':
        return 'Processing';
      default:
        return 'Unknown status';
    }
  }, [props.status]);

  return (
    <div>
      <Progress value={props.progress} colorScheme={'green'} />
      <Heading>
        <Flex>
          {jobStatus}
          <Spacer />
          {props.progress}%
        </Flex>
      </Heading>
    </div>
  );
};

export default TranscodingProgress;
