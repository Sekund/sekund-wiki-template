import { CircledIconLink, LinkProps } from './CircledIconLink';

const BrokenLink = ({ label }: LinkProps) => {
  return (
    <CircledIconLink label={<span className="italic">{label}</span>}>
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 122.88 122.88"
        xmlSpace="preserve"
        fill="currentColor"
        style={{ padding: '4px' }}
      >
        <g>
          <path
            className="st0"
            d="M110.09,6.2l6.58,6.58c8.27,8.27,8.27,21.81,0,30.08L99.24,60.29c-6.52,6.53-16.33,7.89-24.24,4.12 l30.86-30.86c3.05-3.05,3.05-8.03,0-11.07l-5.97-5.97c-3.05-3.05-8.02-3.05-11.07,0L58.15,47.17c-3.37-7.78-1.9-17.2,4.43-23.53 L80.02,6.2C88.29-2.07,101.82-2.07,110.09,6.2L110.09,6.2z M79.93,116.8l6.38-1.32l-4.12-19.89l-6.37,1.34L79.93,116.8L79.93,116.8 L79.93,116.8z M36.38,2.15l6.31-1.56l4.95,19.66l-6.31,1.6L36.38,2.15L36.38,2.15z M102.86,105.79l4.53-4.67L92.82,86.98 l-4.53,4.68L102.86,105.79L102.86,105.79L102.86,105.79z M117.62,84.76l1.68-6.28l-19.6-5.26l-1.69,6.29L117.62,84.76L117.62,84.76 z M2.54,40.47l1.81-6.25l19.5,5.55l-1.77,6.27L2.54,40.47L2.54,40.47z M13.38,17.17l4.61-4.6l14.34,14.35l-4.59,4.61L13.38,17.17 L13.38,17.17L13.38,17.17z M6.2,110.09l6.58,6.58c8.27,8.27,21.8,8.27,30.08,0l17.43-17.43c6.53-6.52,7.89-16.33,4.12-24.24 l-30.86,30.86c-3.05,3.05-8.03,3.05-11.07,0l-5.97-5.97c-3.05-3.05-3.05-8.03,0-11.08l30.67-30.66c-7.79-3.37-17.2-1.9-23.54,4.44 L6.2,80.02C-2.07,88.29-2.07,101.82,6.2,110.09L6.2,110.09L6.2,110.09z"
          />
        </g>
      </svg>
    </CircledIconLink>
  );
};

export { BrokenLink };
