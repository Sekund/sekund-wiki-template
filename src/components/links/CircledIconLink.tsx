import { ReactFragment, useContext, useState } from 'react';

import Link from 'next/link';

import { DarkModeContext } from '@/components/ThemedApp';

export type LinkProps = {
  children: ReactFragment;
  href?: string;
  label: ReactFragment;
  target?: string;
};

const CircledIconLink = ({ label, href, children, target }: LinkProps) => {
  const { darkMode } = useContext(DarkModeContext);
  const [color, setColor] = useState(darkMode ? '#cbc5e0' : '#718096');

  function toggleHighlight(hl: boolean) {
    if (darkMode) {
      setColor(hl ? '#f7fafc' : '#cbc5e0');
    } else {
      setColor(hl ? '#1a202c' : '#718096');
    }
  }

  function Widget() {
    return (
      <a
        className={`relative inline-flex space-x-1 cursor-pointer icon-link no-underline`}
        href={href}
        onMouseOver={() => toggleHighlight(true)}
        onMouseLeave={() => toggleHighlight(false)}
        target={target}
        style={{ color }}
      >
        <span style={{ color }}>{label}</span>
        <span
          className={`flex flex-col items-center justify-center border rounded-full`}
          style={{ width: '1.5em', height: '1.5em', borderColor: color }}
        >
          {children}
        </span>
      </a>
    );
  }

  return href && !target ? <Link href={href}>{Widget()}</Link> : Widget();
};

export { CircledIconLink };
