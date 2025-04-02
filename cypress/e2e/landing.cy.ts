describe('랜딩페이지', () => {
  describe('랜딩페이지 기능 검증', () => {
    describe('비 로그인 시 랜딩', () => {
      it('로그인되지 않은 사용자가, 첫번째 섹션의 시작하기 버튼을 누를시 로그인 페이지로 이동한다.', () => {
        cy.clearCookies();
        cy.visit('/');
        cy.wait(400);
        cy.contains('button', '시작하기').first().click();
        cy.url().should('include', '/login');
      });

      it('로그인되지 않은 사용자가, 마지막 섹션의 시작하기 버튼을 누를시 로그인 페이지로 이동한다.', () => {
        cy.clearCookies();
        cy.visit('/');
        cy.wait(400);
        cy.contains('button', '시작하기').last().click();
        cy.url().should('include', '/login');
      });
    });

    describe('로그인 시 랜딩', () => {
      beforeEach(() => {
        cy.session('user-session', () => {
          cy.login();
        });

        cy.visit('/');
      });
      it('로그인이 되어 있으면 사용자가, 첫번째 섹션의 시작하기 버튼을 누를 시 메인 페이지로 이동한다.', () => {
        cy.contains('button', '시작하기').first().click();
        cy.url().should('include', '/epigrams');
      });
      it('로그인이 되어 있으면 사용자가, 마지막 섹션의 시작하기 버튼을 누를 시 메인 페이지로 이동한다.', () => {
        cy.contains('button', '시작하기').last().click();
        cy.url().should('include', '/epigrams');
      });
    });
  });
});
