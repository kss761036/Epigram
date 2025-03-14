import { render, screen, fireEvent } from '@testing-library/react';
import Comment from './Comment';

describe('댓글 컴포넌트', () => {
  const mockHandleEdit = jest.fn();
  const mockHandleDelete = jest.fn();

  const defaultProps = {
    content: '테스트 댓글',
    author: {
      image: 'https://placehold.co/40x40/000000/FFFFFF.png',
      nickname: '테스터',
    },
    createdAt: '2025-03-14T12:04:09.521Z',
    className: '',
    handleEdit: mockHandleEdit,
    handleDelete: mockHandleDelete,
  };

  it('댓글 내용을 렌더링해야 한다', () => {
    render(<Comment {...defaultProps} />);
    expect(screen.getByText('테스트 댓글')).toBeInTheDocument();
  });

  it('작성자 닉네임을 렌더링해야 한다', () => {
    render(<Comment {...defaultProps} />);
    expect(screen.getByText('테스터')).toBeInTheDocument();
  });

  it('수정 버튼을 클릭하면 handleEdit 함수가 호출되어야 한다', () => {
    render(<Comment {...defaultProps} />);
    fireEvent.click(screen.getByText('수정'));
    expect(mockHandleEdit).toHaveBeenCalledTimes(1);
  });

  it('삭제 버튼을 클릭하면 handleDelete 함수가 호출되어야 한다', () => {
    render(<Comment {...defaultProps} />);
    fireEvent.click(screen.getByText('삭제'));
    expect(mockHandleDelete).toHaveBeenCalledTimes(1);
  });
});
