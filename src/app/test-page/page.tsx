import React from 'react';

import Select from '@/components/ui/Select/Select';

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
    <Select />

  </div>
);

export default TestPage;
