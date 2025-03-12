import { render, screen, waitFor } from '@testing-library/react';
import Avatar from './Avatar';

jest.mock('./Emoji', () => ({
  __esModule: true,
  default: () => <span data-default-avatar />,
}));

describe('Avatar 컴포넌트', () => {
  it('정상적인 프로필 이미지 url을 받을경우, 이미지 아바타가 랜더링된다.', () => {
    const validImageUrl =
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Wikied/user/1269/1741694256600/profile.png';
    render(<Avatar src={validImageUrl} />);
    const img = screen.getByRole('img');

    expect(img).not.toBeNull();
  });

  it('비정상적인 프로필 이미지 url 또는 이미지 로드에 실패시, alt가 있을경우 CharacterAvatar를 랜더링한다.', async () => {
    const validImageUrl = 'https://error';
    const { container } = render(<Avatar src={validImageUrl} alt='Test User Name' />);
    const img = screen.getByRole('img');

    await waitFor(() => {
      img.dispatchEvent(new Event('error'));
    });

    await waitFor(() => {
      expect(img).not.toBeInTheDocument();

      const characterAvatar = container.querySelector('[data-character-avatar]');
      expect(characterAvatar).toBeInTheDocument();
      expect(characterAvatar).toHaveTextContent('T');
    });
  });

  it('비정상적인 프로필 이미지 url 또는 이미지 로드에 실패시, alt가 없을경우 DefaultAvatar를 랜더링한다.', async () => {
    const validImageUrl = 'https://error';
    const { container } = render(<Avatar src={validImageUrl} />);
    const img = screen.getByRole('img');

    await waitFor(() => {
      img.dispatchEvent(new Event('error'));
    });

    await waitFor(() => {
      expect(img).not.toBeInTheDocument();

      const characterAvatar = container.querySelector('[data-default-avatar]');
      expect(characterAvatar).toBeInTheDocument();
    });
  });

  it('아무런 props를 전달하지 않으면, 기본 아바타가 랜더링된다.', () => {
    const { container } = render(<Avatar />);
    const avatarElement = container.querySelector('[data-default-avatar]');

    expect(avatarElement).toBeInTheDocument();
  });
});
