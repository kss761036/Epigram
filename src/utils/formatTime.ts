import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

export default function formatTime(date: string): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ko });
}
