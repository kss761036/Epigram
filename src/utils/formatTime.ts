import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

export default function formatTime(date: string): string {
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    throw new Error(`formatTime: 유효하지 않은 날짜 형식입니다. 입력값: ${date}`);
  }

  return formatDistanceToNow(parsedDate, { addSuffix: true, locale: ko });
}
