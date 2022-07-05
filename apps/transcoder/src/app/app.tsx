import { ChakraProvider, Heading, Center, Flex, Box } from '@chakra-ui/react';

import Form from './form';

export const App = () => {
  return (
    <ChakraProvider>
      <Flex bg="gray.100" align="center" justify="center" h="100vh">
        <Box bg="white" p={6} rounded="md">
          <Center marginBottom={10}>
            <Heading>Welcome to transcoder!</Heading>
          </Center>

          <Form />
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default App;
