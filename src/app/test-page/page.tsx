import React from 'react';

import TestPicker from '@/components/testPicker/TestPicker';

const TestPage = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      width: '100%',
    }}
  >
    <TestPicker />
  </div>
);

export default TestPage;
