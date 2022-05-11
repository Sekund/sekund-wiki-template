import { CircledIconLink, LinkProps } from './CircledIconLink';

const ExternalLink = ({ label, href }: LinkProps) => {
  return href && href?.includes('wikipedia') ? (
    <CircledIconLink label={label} href={href} target="_blank">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 30 30"
        width="30"
        height="30"
        style={{ padding: '2px', paddingTop: '4px' }}
      >
        <path
          d="M29 6.428c0 .098-.03.188-.094.27-.062.08-.13.122-.205.122-.612.058-1.115.257-1.505.595-.39.338-.793.983-1.21 1.935L19.63 23.667c-.042.133-.16.2-.35.2a.39.39 0 0 1-.348-.2l-3.568-7.438-4.096 7.435a.39.39 0 0 1-.35.2c-.182 0-.303-.067-.36-.2L4.315 9.35c-.39-.894-.802-1.518-1.234-1.873-.43-.355-1.03-.574-1.804-.658-.066 0-.13-.037-.187-.106a.36.36 0 0 1-.09-.24c0-.226.066-.34.2-.34.556 0 1.14.025 1.746.075.565.05 1.097.072 1.596.072.507 0 1.105-.025 1.796-.075a28.2 28.2 0 0 1 1.92-.076c.132 0 .198.115.198.344 0 .228-.04.342-.124.342-.557.04-.995.183-1.315.425-.32.243-.48.56-.48.953 0 .2.067.45.2.75l5.092 11.68 2.99-5.56-2.732-5.718c-.49-1.028-.894-1.69-1.21-1.986-.315-.297-.793-.478-1.432-.545-.06 0-.116-.035-.17-.104a.377.377 0 0 1-.08-.24c0-.226.057-.34.174-.34.556 0 1.067.024 1.533.074.448.05.926.074 1.433.074.498 0 1.025-.026 1.582-.076a19.55 19.55 0 0 1 1.694-.076c.133 0 .2.115.2.343 0 .23-.042.342-.125.342-1.113.075-1.67.392-1.67.952 0 .25.13.64.386 1.166l1.806 3.665 1.8-3.345c.248-.477.373-.878.373-1.204 0-.768-.557-1.177-1.67-1.227-.1 0-.15-.117-.15-.346 0-.08.025-.16.075-.232.05-.074.1-.11.15-.11.4 0 .89.024 1.47.074.557.05 1.014.075 1.37.075.258 0 .636-.02 1.135-.06.63-.058 1.16-.087 1.582-.087.1 0 .15.097.15.293 0 .26-.092.392-.274.392-.645.065-1.17.244-1.56.536-.396.293-.888.957-1.478 1.99l-2.39 4.43 3.236 6.6 4.79-11.128c.166-.41.25-.786.25-1.128 0-.82-.558-1.253-1.67-1.303-.1 0-.15-.115-.15-.344 0-.227.074-.34.224-.34.406 0 .887.025 1.444.075.515.048.947.073 1.296.073.365 0 .79-.026 1.27-.075.498-.05.946-.076 1.345-.076.117 0 .175.097.175.293z"
          fill="currentColor"
        />
      </svg>
    </CircledIconLink>
  ) : (
    <CircledIconLink label={label} href={href} target="_blank">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        style={{ zoom: '.8' }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
    </CircledIconLink>
  );
};

export { ExternalLink };