import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Radio from './Radio';

describe('Radio Component', () => {
  test('라벨이 정상적으로 렌더링된다', () => {
    render(<Radio label='테스트 라디오' name='test' />);
    expect(screen.getByText('테스트 라디오')).toBeInTheDocument();
  });

  test('초기 상태가 체크된 상태로 렌더링된다', () => {
    render(<Radio label='테스트 라디오' name='test' checked={true} />);
    const input = screen.getByDisplayValue('테스트 라디오') as HTMLInputElement;
    expect(input.checked).toBe(true);
  });

  test('클릭 시 onChange가 호출된다', async () => {
    const onChangeMock = jest.fn();
    render(<Radio label='테스트 라디오' name='test' checked={false} onChange={onChangeMock} />);

    const label = screen.getByText('테스트 라디오');
    await userEvent.click(label);

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith('테스트 라디오');
  });

  test('checked prop 변경 시 상태가 반영된다', () => {
    const { rerender } = render(<Radio label='테스트 라디오' name='test' checked={false} />);
    const input = screen.getByDisplayValue('테스트 라디오') as HTMLInputElement;
    expect(input.checked).toBe(false);

    rerender(<Radio label='테스트 라디오' name='test' checked={true} />);
    expect(input.checked).toBe(true);
  });
});
