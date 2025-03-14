export const EMOTION = {
  MOVED: 'MOVED',
  HAPPY: 'HAPPY',
  WORRIED: 'WORRIED',
  SAD: 'SAD',
  ANGRY: 'ANGRY',
} as const;

export const EMOTION_LABEL: Record<Emotion, string> = {
  MOVED: '감동',
  HAPPY: '기쁨',
  WORRIED: '고민',
  SAD: '슬픔',
  ANGRY: '분노',
};

export const EMOTION_BORDER_COLOR: Record<Emotion, string> = {
  MOVED: 'border-illust-yellow',
  HAPPY: 'border-illust-green',
  WORRIED: 'border-illust-purple',
  SAD: 'border-illust-blue',
  ANGRY: 'border-illust-red',
};

export type Emotion = (typeof EMOTION)[keyof typeof EMOTION];
