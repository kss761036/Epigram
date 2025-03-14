import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card Component', () => {
  const mockProps = {
    content: '테스트 카드 내용이 길어서 말줄임표가 적용되는지 확인하는 테스트',
    referenceUrl: '/test-url',
    author: '테스트 작성자',
    tags: [{ id: 1, name: '테스트태그' }],
  };

  test('카드 내용이 올바르게 렌더링 되는지 확인', () => {
    render(<Card {...mockProps} />);
    expect(
      screen.getByText('테스트 카드 내용이 길어서 말줄임표가 적용되는지 확인하는 테스트', {
        exact: false,
      }),
    ).toBeInTheDocument();
  });

  test('작성자가 존재하면 표시되는지 확인', () => {
    render(<Card {...mockProps} />);
    expect(screen.getByText('- 테스트 작성자 -')).toBeInTheDocument();
  });

  test('태그가 올바르게 렌더링 되는지 확인', () => {
    render(<Card {...mockProps} />);
    expect(screen.getByText('#테스트태그')).toBeInTheDocument();
  });

  test('내용이 지정된 줄 수 이상일 때 말줄임표 적용 확인', () => {
    render(
      <Card
        {...mockProps}
        content='이것은 매우 긴 카드 내용으로서 여러 줄에 걸쳐 렌더링될 것입니다. 이 테스트는 말줄임표 적용 여부를 확인하기 위함입니다.'
      />,
    );
    const contentElement = screen.getByText(/이것은 매우 긴 카드 내용/, { exact: false });
    expect(contentElement).toBeInTheDocument();
    expect(contentElement).toHaveClass('line-clamp-3');
  });
});
