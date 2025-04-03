describe('에피그램 수정 페이지', () => {
  describe('비로그인 상태 접근 시 동작 검증', () => {
    it('로그인이 되어있지 않으면, 로그인 페이지로 이동한다.', () => {
      cy.visit('/epigrams/1445/edit');
      cy.url().should('include', `${Cypress.config().baseUrl}/login`);
    });
  });

  describe('로그인 후 기능 동작 검증', () => {
    beforeEach(() => {
      cy.session('user-session', () => {
        cy.login();
      });
    });

    it('수정된 내용이 잘 반영되는가?', () => {
      const randomValue = Math.floor(Math.random() * 10000);
      const expectedText = `수정된 내용 ${randomValue}`;

      cy.visit('/epigrams/1445/edit');
      cy.get('form > ul > li:nth-child(1) textarea').clear().type(expectedText);
      cy.get('button[type="submit"]').click();
      cy.url().should('include', `${Cypress.config().baseUrl}/epigrams/1445`);
      cy.get('h2').contains(expectedText).should('exist');
    });

    it('수정권한이 없는 게시글 진입 시 얼럿모달이 뜨는가?', () => {
      cy.visit('/epigrams/1046/edit');
      cy.get('h2').contains('문제가 발생했어요').should('exist');
      cy.get('h2 + div').contains('수정 권한이 없습니다.').should('exist');
    });
  });
});
