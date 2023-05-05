import { useState, ComponentProps } from 'react';

import { HiOutlineExternalLink as ExternalLinkIcon } from 'react-icons/hi';

export default function ExternalLink({
  children,
  ...rest
}: ComponentProps<'a'>) {
  const [hoverFocus, setHoverFocus] = useState(false);

  return (
    <a
      className="inline-flex items-center gap-2 peer outline-none"
      {...rest}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setHoverFocus(true)}
      onMouseLeave={() => setHoverFocus(false)}
      onFocus={() => setHoverFocus(true)}
      onBlur={() => setHoverFocus(false)}
    >
      <span
        className={`${
          hoverFocus ? 'border-b border-grey-100 dark:border-grey-200' : ''
        }`}
      >
        {children}
      </span>
      <ExternalLinkIcon />
    </a>
  );
}
