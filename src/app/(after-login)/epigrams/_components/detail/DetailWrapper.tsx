import { PropsWithChildren } from 'react';
import Inner from '@/components/Inner';
import paperBackground from '@/assets/img/common/paper.svg';

export function DetailWrapper({ children }: PropsWithChildren) {
  return (
    <section>
      <div className='bg-[repeating-linear-gradient(#fff_0_36.69px,#f2f2f2_0_37.69px)] py-10'>
        <Inner>{children}</Inner>
      </div>
      <div
        className='h-10 bg-repeat-x'
        style={{ backgroundImage: `url(${paperBackground.src})` }}
      ></div>
    </section>
  );
}
