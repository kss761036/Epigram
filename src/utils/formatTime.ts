import { formatDistanceToNow, isValid } from 'date-fns';
import { ko } from 'date-fns/locale';

export default function formatTime(date: string): string {
  const parsedDate = new Date(date);
  if (!isValid(parsedDate)) {
    return '----,--,--';
  }

  return formatDistanceToNow(parsedDate, { addSuffix: true, locale: ko });
}
