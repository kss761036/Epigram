import { Epigram } from '@/apis/epigram/epigram.type';

interface EpigramDetailProps {
  id: Epigram['id'];
}

export default function EpigramDetail({ id }: EpigramDetailProps) {
  return (
    <div>
      상세페이지(id:{id}): /epigrams/{id}
    </div>
  );
}
