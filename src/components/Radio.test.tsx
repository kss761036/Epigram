import { render, screen, fireEvent } from '@testing-library/react';
import Radio, { RadioProps } from '@/components/Radio';

describe('Radio Component', () => {
  const defaultProps: RadioProps = {
    isChecked: false,
    id: 'test-radio',
    name: 'test-group',
    label: '테스트 라디오',
    onChange: jest.fn(),
  };

  it('라디오 버튼이 렌더링 되는지 확인', () => {
    render(<Radio {...defaultProps} />);
    const radioInput = screen.getByRole('radio', { name: '테스트 라디오' });

    expect(radioInput).toBeInTheDocument();
    expect(radioInput).not.toBeChecked();
  });

  it('라벨을 클릭하면 `onChange`가 호출되는지 확인', () => {
    const onChangeMock = jest.fn();
    render(<Radio {...defaultProps} onChange={onChangeMock} />);

    const radioInput = screen.getByRole('radio', { name: '테스트 라디오' });
    fireEvent.click(radioInput);

    expect(onChangeMock).toHaveBeenCalledWith(true);
  });

  it('isChecked가 true이면 라디오 버튼이 체크 상태인지 확인', () => {
    render(<Radio {...defaultProps} isChecked={true} />);
    const radioInput = screen.getByRole('radio', { name: '테스트 라디오' });

    expect(radioInput).toBeChecked();
  });
});
