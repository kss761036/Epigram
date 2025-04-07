import { render, screen } from '@testing-library/react';
import Button from './Button';

const TEST_BUTTON_TEXT = '클릭하기';

describe('Button 컴포넌트', () => {
  it('기본 variant와 size로 렌더링된다', () => {
    render(<Button>{TEST_BUTTON_TEXT}</Button>);
    const buttonElement = screen.getByRole('button', { name: new RegExp(TEST_BUTTON_TEXT, 'i') });
    expect(buttonElement).toHaveClass('bg-black-500');
    expect(buttonElement).toHaveClass('h-[44px]');
  });

  it('outlined variant로 렌더링된다', () => {
    render(<Button variant='outlined'>{TEST_BUTTON_TEXT}</Button>);
    const buttonElement = screen.getByRole('button', { name: new RegExp(TEST_BUTTON_TEXT, 'i') });
    expect(buttonElement).toHaveClass('bg-transparent');
    expect(buttonElement).toHaveClass('border');
  });

  it('size prop이 xs로 전달되면 xs 사이즈 클래스가 적용된다', () => {
    render(<Button size='xs'>{TEST_BUTTON_TEXT}</Button>);
    const buttonElement = screen.getByRole('button', { name: new RegExp(TEST_BUTTON_TEXT, 'i') });
    expect(buttonElement).toHaveClass('h-[32px]');
  });

  it('추가 className prop이 적용된다', () => {
    render(<Button className='custom-class'>{TEST_BUTTON_TEXT}</Button>);
    const buttonElement = screen.getByRole('button', { name: new RegExp(TEST_BUTTON_TEXT, 'i') });
    expect(buttonElement).toHaveClass('custom-class');
  });

  it('disabled 상태일 때 disabled 속성이 적용된다', () => {
    render(<Button disabled>{TEST_BUTTON_TEXT}</Button>);
    const buttonElement = screen.getByRole('button', { name: new RegExp(TEST_BUTTON_TEXT, 'i') });
    expect(buttonElement).toBeDisabled();
  });
});
