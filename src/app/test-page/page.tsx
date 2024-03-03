import React from 'react';

import TimePicker from '@/components/testPicker/TimePicker';

const TestPage = () => (

  <div
    style={{
      display: 'flex',
      position: 'relative',
      flexDirection: 'row',
      gap: '20px',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      width: '100%',
    }}
  >
    Час роботи
    <TimePicker label="З" />
    <TimePicker label="По" />
  </div>
);

export default TestPage;
