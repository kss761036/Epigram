import { render, screen, fireEvent } from '@testing-library/react';
import IconButton from './IconButton';

describe('IconButton 컴포넌트', () => {
  it('camera variant가 정상적으로 렌더링된다', () => {
    render(<IconButton variant='camera' />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-black-700');
    const icon = button.querySelector('svg');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('text-blue-100');
  });

  it('arrowUp variant가 정상적으로 렌더링된다', () => {
    render(<IconButton variant='arrowUp' />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-blue-900');
    const icon = button.querySelector('svg');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('rotate-180');
  });

  it('추가 className이 적용된다', () => {
    render(<IconButton variant='camera' className='custom-class' />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('클릭 시 onClick 핸들러가 호출된다', () => {
    const onClick = jest.fn();
    render(<IconButton variant='camera' onClick={onClick} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
