import { PropsWithChildren } from 'react';
import { motion } from 'motion/react';
import paperBackground from '@/assets/img/common/paper.svg';
import Inner from '@/components/Inner';

export function DetailWrapper({ children }: PropsWithChildren) {
  return (
    <motion.section
      initial={{ y: -300 }}
      animate={{ y: 0 }}
      transition={{ ease: 'easeOut', duration: 0.2 }}
    >
      <div className='bg-[repeating-linear-gradient(#fff_0_36.69px,#f2f2f2_0_37.69px)] py-10'>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <Inner>{children}</Inner>
        </motion.div>
      </div>
      <div
        className='h-10 bg-repeat-x'
        style={{ backgroundImage: `url(${paperBackground.src})` }}
      ></div>
    </motion.section>
  );
}
