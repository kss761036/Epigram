describe('마이페이지', () => {
  describe('마이페이지 기본 검증', () => {
    it('로그인이 되어있지 않으면, 로그인 페이지로 이동한다.', () => {
      cy.visit('/mypage');
      cy.url().should('include', `${Cypress.config().baseUrl}/login`);
    });
  });

  describe('마이이페이지 기능 검증', () => {
    beforeEach(() => {
      cy.login();
      cy.visit('/mypage');
    });

    it('초기 렌더링 시 로그아웃 버튼, 오늘의 감정, 감정 달력, 감정 차트, 내 에피그램, 내 댓글이 렌더링된다.', () => {
      cy.contains('button', '로그아웃').should('exist');
      cy.contains('div', '오늘의 감정').should('exist');
      cy.contains('span', /[0-9]{4}년 [0-9]{1,2}월/).should('exist');
      cy.contains('p', '감정 차트').should('exist');
      cy.contains('button', '내 에피그램').should('exist');
      cy.contains('button', '내 댓글').should('exist');
    });

    it('내 에피그램 메뉴에서 초기 4개의 에피그램이 렌더링된다.', () => {
      cy.contains('내 에피그램')
        .parents()
        .find('ul')
        .find('li')
        .should('have.length.greaterThan', 4);
    });

    it('내 에피그램 더보기 클릭 시 추가 에피그램이 렌더링된다.', () => {
      cy.contains('button', '내 에피그램 더보기').should('exist').click();
      cy.contains('내 에피그램')
        .parents()
        .find('ul')
        .find('li')
        .should('have.length.greaterThan', 8);
    });

    it('내 댓글 메뉴에서 초기 4개의 댓글이 렌더링된다.', () => {
      cy.contains('내 댓글').parents().find('ul').find('li').should('have.length.greaterThan', 4);
    });

    it('내 댓글 더보기 클릭 시 추가 댓글이 렌더링된다.', () => {
      cy.contains('button', '내 댓글').click();
      cy.contains('button', '내 댓글 더보기').click();
      cy.contains('내 댓글').parents().find('ul').find('li').should('have.length.greaterThan', 8);
    });
  });
});
