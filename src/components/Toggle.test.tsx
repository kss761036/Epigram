import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Toggle from './Toggle';

describe('Toggle Component', () => {
  test('초기 상태가 체크된 상태로 렌더링된다', () => {
    render(<Toggle type='checkbox' checked={true} label='테스트 토글' />);

    const toggle = screen.getByRole('checkbox');
    expect(toggle).toBeChecked();
  });

  test('클릭 시 onChange가 호출된다', async () => {
    const onChangeMock = jest.fn();
    render(<Toggle type='checkbox' checked={false} onChange={onChangeMock} />);

    const toggle = screen.getByRole('checkbox');
    await userEvent.click(toggle);

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(true);
  });

  test('color prop이 적용된다', () => {
    render(<Toggle type='checkbox' label='테스트 토글' labelColor='text-red-500' />);

    const label = screen.getByText('테스트 토글');
    expect(label).toHaveClass('text-red-500');
  });

  test('checked prop이 없는 경우, 기본값 false로 렌더링된다', () => {
    render(<Toggle type='checkbox' label='토글 테스트' />);

    const toggle = screen.getByRole('checkbox');
    expect(toggle).not.toBeChecked();
  });

  test('checked prop을 변경하면 상태가 유지된다', async () => {
    const { rerender } = render(<Toggle type='checkbox' checked={false} label='토글 테스트' />);

    const toggle = screen.getByRole('checkbox');
    expect(toggle).not.toBeChecked();

    rerender(<Toggle type='checkbox' checked={true} label='토글 테스트' />);
    expect(toggle).toBeChecked();
  });
});
