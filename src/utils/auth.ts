const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY!;
const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!;

export function getKakaoAuthURL() {
  const baseURL = 'https://kauth.kakao.com/oauth/authorize';
  const query = new URLSearchParams({
    client_id: KAKAO_REST_API_KEY,
    redirect_uri: KAKAO_REDIRECT_URI,
    response_type: 'code',
  }).toString();

  return `${baseURL}?${query}`;
}

export async function getKakaoToken(code: string) {
  const response = await fetch('https://kauth.kakao.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: KAKAO_REST_API_KEY,
      redirect_uri: KAKAO_REDIRECT_URI,
      code,
    }),
  });

  return response.json();
}

export async function refreshAccessToken(refreshToken: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) {
      throw new Error('액세스 토큰 갱신에 실패했습니다.');
    }

    const { accessToken } = await res.json();
    return accessToken;
  } catch (error) {
    console.error('토큰 갱신 실패:', error);
    return null;
  }
}
