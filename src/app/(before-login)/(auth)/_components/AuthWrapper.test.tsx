import { render, screen, fireEvent } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import AuthWrapper from './AuthWrapper';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

const originalLocation = window;

describe('AuthWrapper', () => {
  beforeEach(() => {
    Object.defineProperty(globalThis, 'window', {
      value: { location: { href: 'http://localhost:3000' } },
    });
  });

  afterEach(() => {
    Object.defineProperty(globalThis, 'window', {
      value: originalLocation,
    });
  });

  it('로그인 경로에서 올바른 메시지를 표시해야 한다', () => {
    (usePathname as jest.Mock).mockReturnValue('/login');

    render(<AuthWrapper />);

    expect(screen.getByText('SNS 계정으로 로그인하기')).toBeInTheDocument();
  });

  it('회원가입 경로에서 올바른 메시지를 표시해야 한다', () => {
    (usePathname as jest.Mock).mockReturnValue('/signup');

    render(<AuthWrapper />);

    expect(screen.getByText('SNS 계정으로 간편 가입하기')).toBeInTheDocument();
  });

  it('구글 로그인 버튼 클릭 시 이동해야 한다', () => {
    render(<AuthWrapper />);

    fireEvent.click(screen.getByAltText('구글 로그인/회원가입'));
    expect(window.location.href).toBe('/api/auth/oauth/google');
  });

  it('카카오 로그인 버튼 클릭 시 이동해야 한다', () => {
    render(<AuthWrapper />);

    fireEvent.click(screen.getByAltText('카카오 로그인/회원가입'));
    expect(window.location.href).toBe('/api/auth/oauth/kakao');
  });
});
