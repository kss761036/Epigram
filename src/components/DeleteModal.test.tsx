import { render, screen, fireEvent } from '@testing-library/react';
import DeleteModal from './DeleteModal';

describe('DeleteModal 컴포넌트', () => {
  const onCloseMock = jest.fn();
  const onDeleteMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'portal-root');
    document.body.appendChild(modalRoot);
  });

  afterEach(() => {
    const modalRoot = document.getElementById('portal-root');
    if (modalRoot) {
      document.body.removeChild(modalRoot);
    }
  });

  it('모달이 열렸을 때 제목과 설명이 정상적으로 렌더링된다', () => {
    render(
      <DeleteModal isOpen={true} type='comment' onClose={onCloseMock} onDelete={onDeleteMock} />,
      {
        container: document.getElementById('portal-root')!,
      },
    );

    expect(screen.getByText('댓글을 삭제하시겠어요?')).toBeInTheDocument();
    expect(screen.getByText('댓글은 삭제 후 복구할 수 없어요.')).toBeInTheDocument();
  });

  it('모달이 닫혀 있을 때 렌더링되지 않는다', () => {
    render(
      <DeleteModal isOpen={false} type='comment' onClose={onCloseMock} onDelete={onDeleteMock} />,
    );

    expect(screen.queryByText('댓글을 삭제하시겠어요?')).not.toBeInTheDocument();
  });

  it('취소 버튼 클릭 시 onClose가 호출된다', () => {
    render(
      <DeleteModal isOpen={true} type='post' onClose={onCloseMock} onDelete={onDeleteMock} />,
      {
        container: document.getElementById('portal-root')!,
      },
    );

    const cancelButton = screen.getByText('취소');
    fireEvent.click(cancelButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('삭제하기 버튼 클릭 시 onDelete가 호출된다', () => {
    render(
      <DeleteModal isOpen={true} type='post' onClose={onCloseMock} onDelete={onDeleteMock} />,
      {
        container: document.getElementById('portal-root')!,
      },
    );

    const deleteButton = screen.getByText('삭제하기');
    fireEvent.click(deleteButton);

    expect(onDeleteMock).toHaveBeenCalledTimes(1);
  });

  it('ESC 키 입력 시 onClose가 호출된다', () => {
    render(<DeleteModal isOpen={true} type='post' onClose={onCloseMock} onDelete={onDeleteMock} />);

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
