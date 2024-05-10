'use client';

import React, { useEffect, useState } from 'react';
import { Skeleton } from '@mui/material';
import OpenAI from 'openai';

import cls from './style.module.scss';

import EntryCard from '../../components/Entry/EntryCard';

const TestPage = () => (
  <div className={cls.test} />
);

export default TestPage;
