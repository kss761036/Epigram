import { Epigram } from '@/apis/epigram/epigram.type';

interface EpigramCommentslProps {
  id: Epigram['id'];
}

export default function EpigramComments({ id }: EpigramCommentslProps) {
  return <div>코멘트(id:{id})</div>;
}
