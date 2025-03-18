interface ZigzagProps {
  reverse?: boolean;
}

export default function Zigzag({ reverse = false }: ZigzagProps) {
  return (
    <div className={`relative h-[15px] w-full ${reverse ? 'rotate-180' : ''}`}>
      <svg
        className='h-[15px] w-full'
        width='100%'
        height='15'
        xmlns='http://www.w3.org/2000/svg'
        preserveAspectRatio='none'
      >
        <defs>
          <pattern
            id='zigzagPattern'
            x='0'
            y='0'
            width='140'
            height='15'
            patternUnits='userSpaceOnUse'
          >
            <path d='M0,15 L35,0 L70,15 L105,0 L140,15' fill='#f5f7fa' />
          </pattern>
        </defs>
        <rect width='100%' height='15' fill='#ffffff' />
        <rect width='100%' height='15' fill='url(#zigzagPattern)' />
      </svg>
    </div>
  );
}
