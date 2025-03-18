import { render, screen, fireEvent } from '@testing-library/react';
import ProfileModal from './ProfileModal';

describe('ProfileModal 컴포넌트', () => {
  const onCloseMock = jest.fn();
  const writer = {
    image: 'https://example.com/avatar.jpg',
    nickname: 'Test User',
  };

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

  it('모달이 닫혀 있을 때 렌더링되지 않는다', () => {
    render(<ProfileModal isOpen={false} writer={writer} onClose={onCloseMock} />);

    expect(screen.queryByText('Test User')).not.toBeInTheDocument();
  });

  it('닫기 버튼 클릭 시 onClose가 호출된다', () => {
    render(<ProfileModal isOpen={true} writer={writer} onClose={onCloseMock} />, {
      container: document.getElementById('portal-root')!,
    });

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('모달 외부 클릭 시 onClose가 호출된다', () => {
    render(<ProfileModal isOpen={true} writer={writer} onClose={onCloseMock} />, {
      container: document.getElementById('portal-root')!,
    });

    const overlay = screen.getByTestId('modal-overlay');
    fireEvent.click(overlay);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
