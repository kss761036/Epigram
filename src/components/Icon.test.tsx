import { render } from '@testing-library/react';
import Icon from './Icon';

describe('Icon 컴포넌트 테스트', () => {
  it('아이콘 데이터에 없는 이름을 넣을시 경고와 함께 null을 반환한다.', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const invalidName = 'test' as any;
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const { container } = render(<Icon name={invalidName} />);

    expect(consoleWarnSpy).toHaveBeenCalledWith(`${invalidName}은 존재하지 않는 아이콘입니다.`);
    expect(container.firstChild).toBeNull();
  });

  it('아이콘 이름이 유효한 경우 아이콘이 렌더링된다.', () => {
    const { container } = render(<Icon name='search' />);

    expect(container.firstChild).not.toBeNull();
  });

  it('size가 없을경우, 기본값 24가 적용된다.', () => {
    const defaultSize = 24;
    const { container } = render(<Icon name='search' size={defaultSize} />);
    const svgElement = container.querySelector('svg');

    expect(svgElement).toHaveAttribute('width', `${defaultSize}`);
  });

  it('size를 받을 경우, width에 값이 적용된다.', () => {
    const testSize = 40;
    const { container } = render(<Icon name='search' size={testSize} />);
    const svgElement = container.querySelector('svg');

    expect(svgElement).toHaveAttribute('width', `${testSize}`);
  });

  it('color를 받을 경우, color에 값이 적용된다.', () => {
    const testColor = 'red';
    const { container } = render(<Icon name='search' color={testColor} />);
    const svgElement = container.querySelector('svg');

    expect(svgElement).toHaveAttribute('color', testColor);
  });

  it('className을 받을 경우, 기존 className과 함께 적용된다.', () => {
    const testClassName = 'test-classname';
    const defaultClassName = 'aspect-square';
    const { container } = render(<Icon name='search' className={testClassName} />);
    const svgElement = container.querySelector('svg');

    expect(svgElement).toHaveClass(defaultClassName);
    expect(svgElement).toHaveClass(testClassName);
  });
});
