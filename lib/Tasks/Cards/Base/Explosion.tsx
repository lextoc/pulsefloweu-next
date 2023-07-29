export interface ExplosionProps {}

export default function Explosion(props: ExplosionProps) {
  return (
    <svg
      className="explosion"
      viewBox="467 392 58 57"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" fillRule="evenodd" transform="translate(467 392)">
        <g className="grp7" opacity="0" transform="translate(7 6)">
          <circle className="oval1" fill="#FF7C00" cx="2" cy="6" r="2" />
          <circle className="oval2" fill="#FFD500" cx="5" cy="2" r="2" />
        </g>

        <g className="grp6" opacity="0" transform="translate(0 28)">
          <circle className="oval1" fill="#FF7C00" cx="2" cy="7" r="2" />
          <circle className="oval2" fill="#FFD500" cx="3" cy="2" r="2" />
        </g>

        <g className="grp3" opacity="0" transform="translate(52 28)">
          <circle className="oval2" fill="#FF7C00" cx="2" cy="7" r="2" />
          <circle className="oval1" fill="#FFD500" cx="4" cy="2" r="2" />
        </g>

        <g className="grp2" opacity="0" transform="translate(44 6)">
          <circle className="oval2" fill="#FF7C00" cx="5" cy="6" r="2" />
          <circle className="oval1" fill="#FFD500" cx="2" cy="2" r="2" />
        </g>

        <g className="grp5" opacity="0" transform="translate(14 50)">
          <circle className="oval1" fill="#FF7C00" cx="6" cy="5" r="2" />
          <circle className="oval2" fill="#FFD500" cx="2" cy="2" r="2" />
        </g>

        <g className="grp4" opacity="0" transform="translate(35 50)">
          <circle className="oval1" fill="#FF7C00" cx="6" cy="5" r="2" />
          <circle className="oval2" fill="#FFD500" cx="2" cy="2" r="2" />
        </g>

        <g className="grp1" opacity="0" transform="translate(24)">
          <circle className="oval1" fill="#FF7C00" cx="2.5" cy="3" r="2" />
          <circle className="oval2" fill="#FFD500" cx="7.5" cy="2" r="2" />
        </g>
      </g>
    </svg>
  );
}
