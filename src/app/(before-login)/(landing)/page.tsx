import Card from '@/components/Card';

const data = [
  {
    id: 1,
    content: '오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아 간다.',
    author: '앙드레 말로',
    tags: [
      { id: 1, name: '나아가야할때' },
      { id: 2, name: '꿈을이루고싶을때' },
    ],
    referenceUrl: '/',
  },
  {
    id: 2,
    content:
      '이 세상에는 위대한 진실이 하나 있어. 무언가를 온 마음을 다해 원한다면, 반드시 그렇게 된다는 거야. 무언가를 바라는 마음은 곧 우주의 마음으로부터 비롯된 것이기 때문이지.',
    author: '파울로 코엘료',
    tags: [
      { id: 1, name: '나아가야할때' },
      { id: 2, name: '꿈을이루고싶을때' },
    ],
    referenceUrl: '/',
  },
  {
    id: 3,
    content: '오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아 간다.',
    author: '앙드레 말로',
    tags: [
      { id: 1, name: '나아가야할때' },
      { id: 2, name: '꿈을이루고싶을때' },
    ],
    referenceUrl: '/',
  },
  {
    id: 4,
    content:
      '이 세상에는 위대한 진실이 하나 있어. 무언가를 온 마음을 다해 원한다면, 반드시 그렇게 된다는 거야. 무언가를 바라는 마음은 곧 우주의 마음으로부터 비롯된 것이기 때문이지.',
    author: '파울로 코엘료',
    tags: [
      { id: 1, name: '나아가야할때' },
      { id: 2, name: '꿈을이루고싶을때' },
    ],
    referenceUrl: '/',
  },
];

export default function LandingPage() {
  return (
    <div className='grid justify-center gap-4 p-4 text-center'>
      <h1 className='text-3xl'>랜딩페이지</h1>
      <div className='font-iropke text-lg'>이롭게바탕체</div>

      <ul className='grid w-full grid-cols-1 gap-x-0 gap-y-4 md:grid-cols-2 md:gap-x-3 md:gap-y-6 lg:gap-x-[30px] lg:gap-y-10'>
        {data.map((card) => (
          <li key={card.id}>
            <Card {...card} />
          </li>
        ))}
      </ul>
    </div>
  );
}
