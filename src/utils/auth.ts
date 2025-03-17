const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY!;
const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!;
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
const GOOGLE_REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!;

export function getKakaoAuthURL() {
  const baseURL = 'https://kauth.kakao.com/oauth/authorize';
  const query = new URLSearchParams({
    client_id: KAKAO_REST_API_KEY,
    redirect_uri: KAKAO_REDIRECT_URI,
    response_type: 'code',
    scope: 'account_email,profile_image,profile_image',
    prompt: 'login',
  }).toString();

  return `${baseURL}?${query}`;
}

export function getGoogleAuthURL() {
  const baseURL = 'https://accounts.google.com/o/oauth2/v2/auth';
  const query = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: GOOGLE_REDIRECT_URI,
    response_type: 'code',
    scope: 'openid email profile',
    prompt: 'consent',
  }).toString();

  return `${baseURL}?${query}`;
}
