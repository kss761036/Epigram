export function getFocusableElements(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'));
}

export function focusTrap(e: React.KeyboardEvent<HTMLElement>, container: HTMLElement | null) {
  if (e.key !== 'Tab' || !container) return;

  const focusableElements = getFocusableElements(container);
  if (focusableElements.length === 0) return;

  const first = focusableElements[0];
  const last = focusableElements[focusableElements.length - 1];
  const isShift = e.shiftKey;
  const activeElement = document.activeElement;

  if (isShift) {
    if (activeElement === first || !container.contains(activeElement)) {
      e.preventDefault();
      last.focus();
    }
  } else {
    if (activeElement === last || !container.contains(activeElement)) {
      e.preventDefault();
      first.focus();
    }
  }
}

/**
 * keyboard arrow의 조작으로 변경되는 tab focus
 * - React DOM에 직접적으로 연결이 아니라, useEffect 내부에서 eventListener를 등록, 해제하는 방향으로 작성 (window KeyobardEvent 사용)
 * - 넘겨진 event에서 currentTarget으로 eventListener가 걸린 HTMLElement를 container로 등록하고 사용
 */

export function focusTrapWithArrow(e: KeyboardEvent, direction: 'vertical' | 'horizontal') {
  const container = e.currentTarget as HTMLElement;
  if (!container) return;

  const isForward =
    (direction === 'vertical' && e.key === 'ArrowDown') ||
    (direction === 'horizontal' && e.key === 'ArrowRight');

  const isBackward =
    (direction === 'vertical' && e.key === 'ArrowUp') ||
    (direction === 'horizontal' && e.key === 'ArrowLeft');

  if (!isForward && !isBackward) return;

  const focusableElements = getFocusableElements(container);
  if (focusableElements.length === 0) return;

  const currentIndex = focusableElements.findIndex((el) => el === document.activeElement);
  if (currentIndex === -1) return;

  const focusableLength = focusableElements.length;
  let targetIndex: number | null = null;

  if (isForward) {
    targetIndex = currentIndex + 1 < focusableLength ? currentIndex + 1 : 0;
  } else if (isBackward) {
    targetIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : focusableLength - 1;
  }

  if (targetIndex !== null) {
    e.preventDefault();
    focusableElements[targetIndex]?.focus();
  }
}
