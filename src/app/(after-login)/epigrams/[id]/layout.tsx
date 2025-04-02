import { PropsWithChildren } from 'react';
import { getEpigramDetailsOnServer } from '@/apis/epigram/epigram.service';
import { truncateText } from '@/utils/truncateText';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let renderText = '상세페이지';

  try {
    const { content } = await getEpigramDetailsOnServer(Number(id));
    renderText = truncateText(content, 8);
  } catch (error) {
    console.error(error);
  }

  return {
    title: `${renderText} | 에피그램`,
  };
}

export default function Layout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
