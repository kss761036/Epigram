import { render } from '@testing-library/react';
import Emoji from './Emoji';

describe('Emoji 컴포넌트 테스트', () => {
  it('아이콘 데이터에 없는 이름을 넣을시 경고와 함께 null을 반환한다.', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const invalidName = 'test' as any;
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const { container } = render(<Emoji name={invalidName} />);

    expect(consoleWarnSpy).toHaveBeenCalledWith(`${invalidName}은 존재하지 않는 아이콘입니다.`);
    expect(container.firstChild).toBeNull();
  });

  it('아이콘 이름이 유효한 경우 아이콘이 렌더링된다.', () => {
    const { container } = render(<Emoji name='happy' />);

    expect(container.firstChild).not.toBeNull();
  });

  it('size가 없을경우, 기본값 32가 적용된다.', () => {
    const defaultSize = 32;
    const { container } = render(<Emoji name='happy' size={defaultSize} />);
    const svgElement = container.querySelector('svg');

    expect(svgElement).toHaveAttribute('width', `${defaultSize}`);
  });

  it('size를 받을 경우, width에 값이 적용된다.', () => {
    const testSize = 40;
    const { container } = render(<Emoji name='happy' size={testSize} />);
    const svgElement = container.querySelector('svg');

    expect(svgElement).toHaveAttribute('width', `${testSize}`);
  });

  it('className을 받을 경우, 기존 className과 함께 적용된다.', () => {
    const testClassName = 'test-classname';
    const defaultClassName = 'aspect-square';
    const { container } = render(<Emoji name='happy' className={testClassName} />);
    const svgElement = container.querySelector('svg');

    expect(svgElement).toHaveClass(defaultClassName);
    expect(svgElement).toHaveClass(testClassName);
  });

  it('disabled를 true로 받을 경우, grayscale 클래스가 적용된다.', () => {
    const grayscaleClassName = 'grayscale';
    const { container } = render(<Emoji name='happy' disabled={true} />);
    const svgElement = container.querySelector('svg');

    expect(svgElement).toHaveClass(grayscaleClassName);
  });
});
