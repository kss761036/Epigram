export function focusTrap(e: React.KeyboardEvent<HTMLElement>, container: HTMLElement | null) {
  if (e.key !== 'Tab' || !container) return;

  const focusableElements = Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'));

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
