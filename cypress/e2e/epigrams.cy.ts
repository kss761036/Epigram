describe('메인 페이지 (/epigrams)', () => {
  describe('메인페이지 기본 검증', () => {
    it('로그인이 되어있지 않으면, 로그인 페이지로 이동한다.', () => {
      cy.visit('/epigrams');
      cy.url().should('include', `${Cypress.config().baseUrl}/login`);
    });
  });

  describe('메인 페이지 기능 검증', () => {
    beforeEach(() => {
      cy.session('user-session', () => {
        cy.login();
      });

      cy.visit('/epigrams');
    });

    it('초기 렌더링 시 오늘의 에피그램, 최신 에피그램, 최신 댓글이 렌더링되어야 한다', () => {
      cy.contains('h2', '오늘의 에피그램').should('exist');
      cy.contains('h2', '최신 에피그램').should('exist');
      cy.contains('h2', '최신 댓글').should('exist');
    });

    it('오늘의 감정을 아직 선택하지 않은 경우 오늘의 감정 컴포넌트가 나타난다', () => {
      cy.contains('label', '오늘의 감정을 선택해 주세요').should('exist');
    });

    it('오늘의 감정을 선택하면 오늘의 감정 컴포넌트가 사라진다', () => {
      cy.intercept('POST', '/api/emotionLogs/today').as('emotionSubmit');
      cy.intercept('GET', '/api/emotionLogs/today*').as('getEmotion');
      cy.get('button[data-name="MOVED"]').click();

      cy.wait('@emotionSubmit');
      cy.wait('@getEmotion');

      cy.contains('label', '오늘의 감정을 선택해 주세요').should('not.exist');
    });

    it('초기 3개의 에피그램이 렌더링된다', () => {
      cy.contains('h2', '최신 에피그램')
        .parents()
        .find('ul')
        .find('li')
        .should('have.length.greaterThan', 3);
    });

    it('에피그램 더보기 클릭 시 추가 에피그램이 렌더링된다', () => {
      cy.contains('button', '에피그램 더보기').click();
      cy.contains('h2', '최신 에피그램')
        .parents()
        .find('ul')
        .find('li')
        .should('have.length.greaterThan', 6);
    });

    it('초기 3개의 댓글이 렌더링된다', () => {
      cy.contains('h2', '최신 댓글')
        .parents()
        .find('ul')
        .find('li')
        .should('have.length.greaterThan', 3);
    });

    it('최신 댓글 더보기 클릭 시 추가 댓글이 렌더링된다', () => {
      cy.contains('button', '최신 댓글 더보기').click();
      cy.contains('h2', '최신 댓글')
        .parents()
        .find('ul')
        .find('li')
        .should('have.length.greaterThan', 7);
    });
  });
});
