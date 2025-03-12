import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Radio from './Radio';

describe('Radio Component', () => {
  test('라벨이 정상적으로 렌더링된다', () => {
    render(<Radio label='테스트 라디오' />);
    expect(screen.getByText('테스트 라디오')).toBeInTheDocument();
  });

  test('초기 상태가 체크된 상태로 렌더링된다', () => {
    render(<Radio label='테스트 라디오' checked={true} />);
    const radio = screen.getByRole('radio');
    expect(radio).toBeChecked();
  });

  test('클릭 시 onChange가 호출된다', async () => {
    const onChangeMock = jest.fn();
    render(<Radio label='테스트 라디오' checked={false} onChange={onChangeMock} />);

    const radio = screen.getByRole('radio');
    await userEvent.click(radio);

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(true);
  });

  test('checked prop을 변경하면 상태가 유지된다', async () => {
    const { rerender } = render(<Radio label='테스트 라디오' checked={false} />);
    const radio = screen.getByRole('radio');
    expect(radio).not.toBeChecked();

    rerender(<Radio label='테스트 라디오' checked={true} />);
    expect(radio).toBeChecked();
  });
});
