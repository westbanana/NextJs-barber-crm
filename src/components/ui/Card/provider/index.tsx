import { createContext, useContext } from 'react';

type CardContextProps = {
  onClose: () => void;
}

export const CardContext = createContext<CardContextProps>(null!);
export const useCardContext = () => {
  const props = useContext(CardContext);
  if (!props) {
    throw new Error('useCardContext must be used within a CardProvider');
  }
  return props;
};
