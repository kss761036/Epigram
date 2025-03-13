import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EtcButton from './EtcButton';

describe('EtcButton', () => {
  it('버튼이 정상적으로 렌더링되는지 확인', () => {
    render(<EtcButton>버튼</EtcButton>);
    expect(screen.getByRole('button', { name: '버튼' })).toBeInTheDocument();
  });

  it('클릭 이벤트가 정상적으로 실행되는지 확인', () => {
    const handleClick = jest.fn();
    render(<EtcButton onClick={handleClick}>클릭</EtcButton>);
    fireEvent.click(screen.getByRole('button', { name: '클릭' }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('링크가 정상적으로 렌더링되는지 확인', () => {
    render(<EtcButton href='https://example.com'>링크</EtcButton>);
    const link = screen.getByRole('link', { name: '링크' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  it('새 탭에서 열리는 링크인지 확인', () => {
    render(
      <EtcButton href='https://example.com' target='_blank'>
        새 창에서 열기
      </EtcButton>,
    );
    const link = screen.getByRole('link', { name: '새 창에서 열기' });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('variant가 정상적으로 적용되는지 확인', () => {
    const { container } = render(<EtcButton variant='outlined'>버튼</EtcButton>);
    expect(container.firstChild).toHaveClass('border-blue-400');
  });

  it('size가 정상적으로 적용되는지 확인', () => {
    const { container } = render(<EtcButton size='lg'>버튼</EtcButton>);
    expect(container.firstChild).toHaveClass('md:h-14');
  });

  it('추가적인 className이 적용되는지 확인', () => {
    const { container } = render(<EtcButton className='custom-class'>버튼</EtcButton>);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
