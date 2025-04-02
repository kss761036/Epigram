describe('피드 페이지', () => {
  describe('피드 기본 검증', () => {
    it('로그인이 되어있지 않으면, 로그인 페이지로 이동한다.', () => {
      cy.visit('/feeds');
      cy.url().should('include', `${Cypress.config().baseUrl}/login`);
    });
  });

  describe('피드 페이지 기능 검증', () => {
    beforeEach(() => {
      cy.session('user-session', () => {
        cy.login();
      });

      cy.visit('/feeds');
    });

    it('처음 6개의 피드가 랜더링된다.', () => {
      cy.get('ul li a[href^="/epigrams/"]').should('have.length', 6);
    });

    it('에피그램 더보기 버튼을 클릭시, 피드를 더불러온다.', () => {
      cy.contains('button', '에피그램 더보기').click();
      cy.get('ul li a[href^="/epigrams/"]').should('have.length.greaterThan', 6);
    });

    it('에피그램 만들기 버튼을 클릭시, 작성페이지로 이동한다.', () => {
      cy.contains('a', '에피그램 만들기').click();
      cy.url().should('include', '/epigrams/create');
    });

    it('피드를 클릭시 해당 상세페이지로 이동한다.', () => {
      cy.get('ul li a[href^="/epigrams/"]')
        .first()
        .then(($el) => {
          const href = $el.attr('href');
          const id = href?.split('/').pop();

          cy.wrap($el).click();
          cy.url().should('include', `/epigrams/${id}`);
        });
    });
  });
});
