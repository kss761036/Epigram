import { render, screen } from '@testing-library/react';
import ErrorFallback from './ErrorFallback';

describe('에러페이지 컴포넌트', () => {
  it('title과 content가 제대로 랜더링 된다.', () => {
    const testTitle = '테스트 타이틀';
    const testContent = '테스트 메세지';

    render(<ErrorFallback title={testTitle} content={testContent} />);

    expect(screen.getByText(testTitle)).toBeInTheDocument();
    expect(screen.getByText(testContent)).toBeInTheDocument();
  });
});
