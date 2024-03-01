'use client';

import React, { useEffect } from 'react';

const SettingsPage = () => {
  useEffect(() => {
    console.log(2);
  }, []);
  return (
    <div>
      <h1>Settings</h1>
    </div>
  );
};

export default SettingsPage;
