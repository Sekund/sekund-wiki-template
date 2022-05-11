import { ReactFragment, useState } from 'react';

import Link from 'next/link';

export type LinkProps = {
  children: ReactFragment;
  href?: string;
  label: ReactFragment;
  target?: string;
};

const CircledIconLink = ({ label, href, children, target }: LinkProps) => {
  const [color, setColor] = useState('#cbd5e0');

  function Widget() {
    return (
      <a
        className={`relative inline-flex space-x-1 cursor-pointer icon-link no-underline`}
        href={href}
        onMouseOver={() => setColor('#718096')}
        onMouseLeave={() => setColor('#cbd5e0')}
        target={target}
        style={{ color }}
      >
        <span className="text-gray-600">{label}</span>
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
