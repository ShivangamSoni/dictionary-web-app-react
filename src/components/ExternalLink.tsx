import { useState, ComponentProps } from 'react';

import { HiOutlineExternalLink as ExternalLinkIcon } from 'react-icons/hi';

export default function ExternalLink({
  children,
  ...rest
}: ComponentProps<'a'>) {
  const [hover, setHover] = useState(false);

  return (
    <a
      className="inline-flex items-center gap-2 peer"
      {...rest}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span
        className={`${
          hover ? 'border-b border-grey-100 dark:border-grey-200' : ''
        }`}
      >
        {children}
      </span>
      <ExternalLinkIcon />
    </a>
  );
}
