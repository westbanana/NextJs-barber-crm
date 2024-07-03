import { useState } from 'react';

export const useCopyToClipboard = ({ timeout = 500 }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [copyTimeout, setCopyTimeout] = useState<number | null>(null);

  const handleCopyResult = (value: boolean) => {
    window.clearTimeout(copyTimeout!);
    setCopyTimeout(window.setTimeout(() => setCopied(false), timeout));
    setCopied(value);
  };
  const copy = (valueToCopy: any) => {
    if ('clipboard' in navigator) {
      navigator.clipboard
        .writeText(valueToCopy)
        .then(() => handleCopyResult(true));
    }
  };

  const reset = () => {
    setCopied(false);
    window.clearTimeout(copyTimeout!);
  };
  return { reset, copy, copied };
};
