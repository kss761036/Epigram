import { render, screen, fireEvent } from '@testing-library/react';
import Input from './Input';

describe('Input 컴포넌트', () => {
  it('텍스트 타입 input은 placeholder와 custom class가 적용된다', () => {
    render(<Input type='text' placeholder='텍스트 입력' className='custom-input' />);
    const inputElement = screen.getByPlaceholderText('텍스트 입력');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveClass('custom-input');
    expect(inputElement).toHaveAttribute('type', 'text');
  });

  it('라벨이 제공되면 label 요소가 렌더링된다', () => {
    render(<Input type='text' label='이메일' />);
    const labelElement = screen.getByText('이메일');
    expect(labelElement).toBeInTheDocument();
    const inputElement = screen.getByRole('textbox');
    expect(labelElement).toHaveAttribute('for', inputElement.id);
  });

  it('에러 메시지가 전달되면 에러 메시지가 렌더링된다', () => {
    render(<Input type='text' error='에러 발생' />);
    const errorElement = screen.getByText('에러 발생');
    expect(errorElement).toBeInTheDocument();
  });

  it('password 타입일 때 아이콘 클릭 시 input 타입이 토글된다', () => {
    render(<Input type='password' placeholder='비밀번호 입력' />);
    const inputElement = screen.getByPlaceholderText('비밀번호 입력') as HTMLInputElement;
    expect(inputElement).toHaveAttribute('type', 'password');

    const iconElement = document.querySelector('svg');
    expect(iconElement).toBeInTheDocument();

    if (iconElement) {
      fireEvent.click(iconElement);
    }
    expect(inputElement).toHaveAttribute('type', 'text');
  });

  it('search 타입일 때 Enter 키 및 아이콘 클릭 시 onSearch 핸들러가 호출된다', () => {
    const onSearchMock = jest.fn();
    render(<Input type='search' placeholder='검색' onSearch={onSearchMock} />);
    const inputElement = screen.getByPlaceholderText('검색');

    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });
    expect(onSearchMock).toHaveBeenCalledTimes(1);

    const iconElement = document.querySelector('svg');
    expect(iconElement).toBeInTheDocument();
    if (iconElement) {
      fireEvent.click(iconElement);
    }
    expect(onSearchMock).toHaveBeenCalledTimes(2);
  });
});
