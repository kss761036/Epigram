export const EMOTION = {
  MOVED: 'MOVED',
  HAPPY: 'HAPPY',
  WORRIED: 'WORRIED',
  SAD: 'SAD',
  ANGRY: 'ANGRY',
} as const;

export type Emotion = (typeof EMOTION)[keyof typeof EMOTION];
