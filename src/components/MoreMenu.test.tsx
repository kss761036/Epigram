import { screen, render, fireEvent } from '@testing-library/react';
import { MoreMenu, MoreMenuItem } from './MoreMenu';

jest.mock('./Dropdown', () => ({
  __esModule: true,
  Dropdown: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DropdownTrigger: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='dropdown-trigger'>{children}</div>
  ),
  DropdownMenu: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='dropdown-menu'>{children}</div>
  ),
  DropdownItem: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock('./Icon', () => ({
  __esModule: true,
  default: ({ name }: { name: string }) => <div>{name}</div>, // 직접 반환된 이름을 보여줍니다.
}));

describe('MoreMenu Component', () => {
  test('MoreMenu 랜더링 테스트', () => {
    render(
      <MoreMenu>
        <MoreMenuItem>Item 1</MoreMenuItem>
      </MoreMenu>,
    );

    expect(screen.getByTestId('dropdown-trigger')).toBeInTheDocument();
    expect(screen.getByText('more')).toBeInTheDocument();
  });

  test('MoreMenu Trigger버튼을 누르면, Dropdown메뉴가 열림', () => {
    render(
      <MoreMenu>
        <MoreMenuItem>Item 1</MoreMenuItem>
      </MoreMenu>,
    );

    fireEvent.click(screen.getByTestId('dropdown-trigger'));

    expect(screen.getByTestId('dropdown-menu')).toBeInTheDocument();
  });
});
