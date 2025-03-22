import Inner from '@/components/Inner';
import EpigramDetail from '../_components/EpigramDetail';
import EpigramComments from '../_components/EpigramComments';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = Number((await params).id);

  return (
    <div className='bg-bg flex min-h-dvh flex-col gap-8 md:gap-10 lg:gap-12'>
      <EpigramDetail id={id} />

      <Inner>
        <EpigramComments id={id} />
      </Inner>
    </div>
  );
}
