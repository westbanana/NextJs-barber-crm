import { useStore } from 'react-redux';

import { AppStore } from '@/lib/store';

export const useAppStore: () => AppStore = useStore;
