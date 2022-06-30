import React, { useEffect, useState } from 'react';
import { Message } from '@transcoder/api-interfaces';
import Form from './form';

export const App = () => {
  const [m, setMessage] = useState<Message>({ message: '' });

  // useEffect(() => {
  //   fetch('/api')
  //     .then((r) => r.json())
  //     .then(setMessage);
  // }, []);

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h1>Welcome to transcoder!</h1>
      </div>
      <Form />
    </>
  );
};

export default App;
