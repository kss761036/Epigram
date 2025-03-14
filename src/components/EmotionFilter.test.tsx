import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import EmotionFilter from './EmotionFilter';

jest.mock('./Emoji', () => ({
  __esModule: true,
  default: ({ name }: { name: string }) => <div>{name}</div>, // 직접 반환된 이름을 보여줍니다.
}));

jest.mock('./Icon', () => ({
  __esModule: true,
  default: ({ name }: { name: string }) => <div>{name}</div>, // 직접 반환된 이름을 보여줍니다.
}));

jest.mock('./EmojiButton', () => ({
  __esModule: true,
  default: ({ name, onClick }: { name: string; onClick: () => void }) => (
    <button onClick={onClick}>{name}</button>
  ),
}));

jest.mock('./Dropdown', () => ({
  __esModule: true,
  Dropdown: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DropdownTrigger: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DropdownMenu: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='dropdown-menu'>{children}</div>
  ),
  DropdownItem: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('EmotionFilter Component', () => {
  test('기본 렌더링: 필터 값이 없을 경우 "없음"으로 표시', () => {
    render(<EmotionFilter value={null} onChange={jest.fn()} />);

    expect(screen.getByText('필터: 없음')).toBeInTheDocument();
  });

  test('기본 렌더링: 선택된 값이 있을 경우 해당 이모지로 표시', () => {
    const selectedEmotion = 'HAPPY';
    const expectedLabel = '기쁨';
    render(<EmotionFilter value={selectedEmotion} onChange={jest.fn()} />);

    expect(screen.getByText(`필터: ${expectedLabel}`)).toBeInTheDocument();
  });

  test('DropdownTrigger 클릭 시 DropdownMenu가 열림', () => {
    render(<EmotionFilter value={null} onChange={jest.fn()} />);

    fireEvent.click(screen.getByText('필터: 없음'));

    expect(screen.getByTestId('dropdown-menu')).toBeInTheDocument();
  });

  test('이모지 버튼 클릭 시 onChange 함수 호출', async () => {
    const onChangeMock = jest.fn();
    render(<EmotionFilter value={null} onChange={onChangeMock} />);

    fireEvent.click(screen.getByText('필터: 없음'));

    await waitFor(() => {
      fireEvent.click(screen.getByText('HAPPY'));

      expect(onChangeMock).toHaveBeenCalledWith('HAPPY');
    });
  });
});
