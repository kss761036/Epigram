import { render, screen, fireEvent } from '@testing-library/react';
import Toggle from './Toggle';

describe('Toggle 컴포넌트', () => {
  it('초기 상태가 체크되지 않은 상태로 렌더링된다', () => {
    render(<Toggle isChecked={false} onChange={jest.fn()} id='test-toggle' />);
    const toggleInput = screen.getByRole('checkbox');
    expect(toggleInput).not.toBeChecked();
  });

  it('초기 상태가 체크된 상태로 렌더링된다', () => {
    render(<Toggle isChecked={true} onChange={jest.fn()} id='test-toggle' />);
    const toggleInput = screen.getByRole('checkbox');
    expect(toggleInput).toBeChecked();
  });

  it('클릭 시 onChange가 호출되고 상태가 변경된다', () => {
    const onChangeMock = jest.fn();
    render(<Toggle isChecked={false} onChange={onChangeMock} id='test-toggle' />);
    const toggleInput = screen.getByRole('checkbox');
    fireEvent.click(toggleInput);
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(true);
  });

  it('label이 전달되면 표시된다', () => {
    render(<Toggle isChecked={false} onChange={jest.fn()} label='공개' id='test-toggle' />);
    const labelElement = screen.getByText('공개');
    expect(labelElement).toBeInTheDocument();
  });

  it('label이 전달되지 않으면 표시되지 않는다', () => {
    render(<Toggle isChecked={false} onChange={jest.fn()} id='test-toggle' />);
    const labelElement = screen.queryByText('공개');
    expect(labelElement).not.toBeInTheDocument();
  });

  it('color prop이 적용된다', () => {
    render(
      <Toggle
        isChecked={false}
        onChange={jest.fn()}
        color='text-red-500'
        label='테스트'
        id='test-toggle'
      />,
    );
    const labelElement = screen.getByText('테스트');
    expect(labelElement).toHaveClass('text-red-500');
  });

  it('name prop이 올바르게 적용된다', () => {
    render(<Toggle isChecked={false} onChange={jest.fn()} name='toggle-name' id='test-toggle' />);
    const toggleInput = screen.getByRole('checkbox');
    expect(toggleInput).toHaveAttribute('name', 'toggle-name');
  });

  it('id prop이 올바르게 적용된다', () => {
    render(<Toggle isChecked={false} onChange={jest.fn()} id='custom-toggle-id' />);
    const toggleInput = screen.getByRole('checkbox');
    expect(toggleInput).toHaveAttribute('id', 'custom-toggle-id');
  });
});
