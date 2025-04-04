import { render, screen, fireEvent } from '@testing-library/react';
import EmojiButton from './EmojiButton'; // 경로에 맞게 수정
import { EMOTION_LABEL } from '@/types/common'; // 적절한 경로로 수정

jest.mock('./Emoji', () => ({
  __esModule: true,
  default: ({ name }: { name: string }) => <div>{name}</div>,
}));

describe('EmojiButton Component', () => {
  test('버튼이 제대로 렌더링되는지 확인', () => {
    render(<EmojiButton name='HAPPY' />);

    expect(screen.getByText('HAPPY')).toBeInTheDocument();
  });

  test('selected가 true일 때 버튼의 스타일 변경 확인', () => {
    render(<EmojiButton name='HAPPY' selected />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-white');
    expect(button).toHaveClass('hover:bg-white');
  });

  test('selected가 false일 때 버튼의 스타일은 기본값 확인', () => {
    render(<EmojiButton name='HAPPY' selected={false} />);

    const button = screen.getByRole('button');
    expect(button).not.toHaveClass('bg-white');
    expect(button).not.toHaveClass('hover:bg-white');
  });

  test('withLabel의 기본값 확인(true일 때 라벨이 표시됨)', () => {
    render(<EmojiButton name='HAPPY' withLabel />);

    expect(screen.getByText(EMOTION_LABEL.HAPPY)).toBeInTheDocument();
  });

  test('withLabel이 false일 때 라벨이 표시되지 않음', () => {
    render(<EmojiButton name='HAPPY' withLabel={false} />);

    expect(screen.queryByText(EMOTION_LABEL.HAPPY)).toBeNull();
  });

  test('클릭 이벤트가 제대로 호출되는지 확인', () => {
    const handleClick = jest.fn();
    render(<EmojiButton name='HAPPY' onClick={handleClick} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
