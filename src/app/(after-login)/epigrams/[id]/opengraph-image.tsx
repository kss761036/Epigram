import { ImageResponse } from 'next/og';
import { truncateText } from '@/utils/truncateText';

export const contentType = 'image/png';
export const alt = '에피그램';
export const size = {
  width: 1200,
  height: 630,
};

function getHost() {
  return process.env.NODE_ENV === 'production'
    ? 'https://epigram-gilv.vercel.app'
    : 'http://localhost:3000';
}

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const HOST = getHost();
  const API_URL = 'https://fe-project-epigram-api.vercel.app/12-4';

  let iropke: ArrayBuffer | undefined;
  let bgBase64: string | undefined;
  let content = '에피그램';

  try {
    const [fontRes, bgRes, dataRes] = await Promise.all([
      fetch(`${HOST}/IropkeBatang.woff`),
      fetch(`${HOST}/open-bg.png`),
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

    iropke = font;
    bgBase64 = `data:image/png;base64,${Buffer.from(bg).toString('base64')}`;

    if (data.content) {
      content = truncateText(data.content, 8);
    }
  } catch (err) {
    console.error('Fail to generate og-image', err);
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
          fontSize: 100,
          fontWeight: 'bold',
          color: 'black',
          backgroundImage: bgBase64 ? `url(${bgBase64})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#fafafa',
        }}
      >
        {content}
      </div>
    ),
    {
      ...size,
      fonts: iropke
        ? [
            {
              name: 'Iropke',
              data: iropke,
              style: 'normal',
              weight: 400,
            },
          ]
        : [],
    },
  );
}
