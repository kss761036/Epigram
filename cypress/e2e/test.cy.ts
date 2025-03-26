describe('랜딩페이지', () => {
  it('로그인되지 않은 사용자가, 첫번째 섹션의 시작하기 버튼을 누를시 로그인 페이지로 이동한다.', () => {
    cy.clearCookies();
    cy.visit('http://localhost:3000');
    cy.contains('button', '시작하기').first().click();
    cy.url().should('include', '/login');
  });

  it('로그인되지 않은 사용자가, 마지막 섹션의 시작하기 버튼을 누를시 로그인 페이지로 이동한다.', () => {
    cy.clearCookies();
    cy.visit('http://localhost:3000');
    cy.contains('button', '시작하기').last().click();
    cy.url().should('include', '/login');
  });
});
