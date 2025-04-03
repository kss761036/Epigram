import { ImageResponse } from 'next/og';
import { headers } from 'next/headers';
import { truncateText } from '@/utils/truncateText';

/**
 * OG 이미지 필수 export
 */
export const contentType = 'image/png';
export const alt = '에피그램';
export const size = {
  width: 1200,
  height: 630,
};

/**
 * OG 이미지 스타일 설정값 및 API 경로
 */
const API_URL = 'https://fe-project-epigram-api.vercel.app/12-4';
const FONT_PATH = '/IropkeBatang.woff';
const FONT_NAME = 'Iropke';
const FONT_SIZE = 100;
const FONT_COLOR = 'black';
const BG_PATH = '/open-bg.png';
const BG_COLOR = '#fafafa';
const FALLBACK_CONTENT = '에피그램';
const CONTENT_MAX_LENGTH = 8;

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = host?.includes('localhost') ? 'http' : 'https';
  const APP_URL = `${protocol}://${host}`;

  let fontData: ArrayBuffer | undefined;
  let bgBase64: string | undefined;
  let content = FALLBACK_CONTENT;

  try {
    const [fontRes, bgRes, dataRes] = await Promise.all([
      fetch(`${APP_URL}/${FONT_PATH}`),
      fetch(`${APP_URL}/${BG_PATH}`),
      fetch(`${API_URL}/epigrams/${id}`),
    ]);

    if (!fontRes.ok) throw new Error('Font fetch failed');
    if (!bgRes.ok) throw new Error('Background fetch failed');
    if (!dataRes.ok) throw new Error('Data fetch failed');

    const [font, bg, data] = await Promise.all([
      fontRes.arrayBuffer(),
      bgRes.arrayBuffer(),
      dataRes.json(),
    ]);

    fontData = font;
    bgBase64 = `data:image/png;base64,${Buffer.from(bg).toString('base64')}`;

    if (data.content) {
      content = truncateText(data.content, CONTENT_MAX_LENGTH);
    }
  } catch (error) {
    console.error('Fail to generate og-image', error);
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: FONT_SIZE,
          color: FONT_COLOR,
          backgroundImage: bgBase64 ? `url(${bgBase64})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: BG_COLOR,
        }}
      >
        {content}
      </div>
    ),
    {
      ...size,
      fonts: fontData
        ? [
            {
              name: FONT_NAME,
              data: fontData,
              style: 'normal',
              weight: 400,
            },
          ]
        : [],
    },
  );
}
