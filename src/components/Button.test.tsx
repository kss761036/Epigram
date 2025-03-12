import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button 컴포넌트', () => {
  it('기본 variant와 size로 렌더링된다', () => {
    render(<Button>클릭하기</Button>);
    const buttonElement = screen.getByRole('button', { name: /클릭하기/i });
    expect(buttonElement).toHaveClass('bg-black-500');
    expect(buttonElement).toHaveClass('h-[44px]');
  });

  it('outlined variant로 렌더링된다', () => {
    render(<Button variant='outlined'>클릭하기</Button>);
    const buttonElement = screen.getByRole('button', { name: /클릭하기/i });
    expect(buttonElement).toHaveClass('bg-transparent');
    expect(buttonElement).toHaveClass('border');
  });

  it('size prop이 xs로 전달되면 xs 사이즈 클래스가 적용된다', () => {
    render(<Button size='xs'>클릭하기</Button>);
    const buttonElement = screen.getByRole('button', { name: /클릭하기/i });
    expect(buttonElement).toHaveClass('h-[32px]');
  });

  it('추가 className prop이 적용된다', () => {
    render(<Button className='custom-class'>클릭하기</Button>);
    const buttonElement = screen.getByRole('button', { name: /클릭하기/i });
    expect(buttonElement).toHaveClass('custom-class');
  });

  it('disabled 상태일 때 disabled 속성이 적용된다', () => {
    render(<Button disabled>클릭하기</Button>);
    const buttonElement = screen.getByRole('button', { name: /클릭하기/i });
    expect(buttonElement).toBeDisabled();
  });
});
