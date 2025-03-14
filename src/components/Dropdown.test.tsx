import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@/components/Dropdown';

describe('Dropdown Component', () => {
  test('Dropdown외부에서 DropdownTrigger 컴포넌트를 쓰면 에러가 발생한다.', () => {
    try {
      render(<DropdownTrigger>TriggerButton</DropdownTrigger>);
    } catch (error) {
      const expectedError = error as Error;
      expect(expectedError.message).toBe(
        '드롭다운 컨텍스트는 드롭다운 컨텍스트 프로바이더 내부에서 사용해주세요',
      );
    }
  });

  test('Dropdown외부에서 DropdownItem 컴포넌트를 쓰면 에러가 발생한다.', () => {
    try {
      render(<DropdownItem>Item</DropdownItem>);
    } catch (error) {
      const expectedError = error as Error;
      expect(expectedError.message).toBe(
        '드롭다운 컨텍스트는 드롭다운 컨텍스트 프로바이더 내부에서 사용해주세요',
      );
    }
  });

  test('DropdownTrigger 클릭 시 DropdownMenu가 열린다.', () => {
    render(
      <Dropdown>
        <DropdownTrigger>TriggerButton</DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>Item 1</DropdownItem>
          <DropdownItem>Item 2</DropdownItem>
        </DropdownMenu>
      </Dropdown>,
    );

    const trigger = screen.getByText('TriggerButton');

    expect(screen.queryByRole('list')).not.toBeInTheDocument();

    fireEvent.click(trigger);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  test('DropdownItem 클릭 시 드롭다운이 닫힌고, 콜백이 실행된다.', async () => {
    const onClickMock = jest.fn();

    render(
      <Dropdown>
        <DropdownTrigger>TriggerButton</DropdownTrigger>
        <DropdownMenu>
          <DropdownItem onClick={onClickMock}>Item 1</DropdownItem>
        </DropdownMenu>
      </Dropdown>,
    );

    const trigger = screen.getByText('TriggerButton');

    fireEvent.click(trigger);
    expect(screen.getByRole('list')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Item 1'));
    expect(onClickMock).toHaveBeenCalled();
    await waitFor(() => expect(screen.queryByRole('list')).not.toBeInTheDocument());
  });

  test('드롭다운 외부 클릭 시 닫힘', async () => {
    render(
      <>
        <Dropdown>
          <DropdownTrigger>TriggerButton</DropdownTrigger>
          <DropdownMenu>
            <DropdownItem>Item 1</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <button>Outside</button>
      </>,
    );

    const trigger = screen.getByText('TriggerButton');
    const outsideButton = screen.getByText('Outside');

    fireEvent.click(trigger);
    expect(screen.getByRole('list')).toBeInTheDocument();

    fireEvent.click(outsideButton);
    await waitFor(() => expect(screen.queryByRole('list')).not.toBeInTheDocument());
  });
});
