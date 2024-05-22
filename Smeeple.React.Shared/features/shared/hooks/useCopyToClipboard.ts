import {useState} from 'react';
import copy from 'copy-to-clipboard';

export default function useCopyToClipboard() {
  const [isCopied, setCopied] = useState(false);

  function handleCopy(text: string | number) {
    if (typeof text === 'string' || typeof text === 'number') {
      copy(text.toString());
      setCopied(true);
    }
  }

  return {isCopied, handleCopy};
}
