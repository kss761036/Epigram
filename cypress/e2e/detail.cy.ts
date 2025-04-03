describe('상세페이지', () => {
  const epigramId = 1445;

  describe('상세페이지 기본 검증', () => {
    describe('비로그인', () => {
      beforeEach(() => {
        cy.visit(`/epigrams/${epigramId}`);
      });
      it('댓글이 가려지고 로그인 버튼이 생긴다.', () => {
        cy.contains('댓글을 보려면 로그인이 필요합니다.').should('exist');
        cy.contains('a', '로그인하기').should('exist');
      });

      it('로그인 버튼을 누르면 로그인 페이지로 이동한다.', () => {
        cy.contains('a', '로그인하기').click();
        cy.url().should('include', '/login');
      });
    });
    describe('로그인', () => {
      beforeEach(() => {
        cy.session('user-session', () => {
          cy.login();
        });
        cy.visit(`/epigrams/${epigramId}`);
      });

      it('상세페이지가 정상적으로 랜더링된다.', () => {
        cy.get('h2').first().should('exist');
        cy.get('textarea').should('exist');
        cy.contains('h2', '댓글')
          .parents()
          .find('ul')
          .find('li')
          .should('have.length.greaterThan', 4);
      });

      it('좋아요 버튼을 누르면 +1이 된다.', () => {
        cy.get('button')
          .contains(/^\d+$/)
          .invoke('text')
          .then((text1) => {
            const before = parseInt(text1);
            cy.get('button').contains(/^\d+$/).click();
            cy.get('button')
              .contains(`${before + 1}`)
              .should('exist');
          });
      });

      it('좋아요 버튼을 다시 누르면 -1이 된다.', () => {
        cy.get('button')
          .contains(/^\d+$/)
          .invoke('text')
          .then((text1) => {
            const before = parseInt(text1);
            cy.get('button').contains(`${before}`).click();
            cy.get('button')
              .contains(`${before - 1}`)
              .should('exist');
          });
      });

      it('댓글 더보기 클릭 시 추가 댓글이 렌더링된다', () => {
        cy.contains('button', '댓글 더보기').click();
        cy.contains('h2', '댓글')
          .parents()
          .find('ul')
          .find('li')
          .should('have.length.greaterThan', 8);
      });

      it('댓글을 입력하고 등록할 수 있다', () => {
        cy.intercept('POST', '/api/comments', {
          statusCode: 200,
          body: { id: 9999, content: '테스트 댓글입니다', isPrivate: false },
        }).as('createComment');
        cy.get('textarea').type('테스트 댓글입니다');
        cy.get('form').submit();
        cy.wait('@createComment').its('request.body').should('include', {
          content: '테스트 댓글입니다',
        });
        cy.contains('댓글이 생성되었습니다.').should('exist');
      });

      it('드롭다운 수정 버튼을 누르면 수정 페이지로 이동한다.', () => {
        cy.wait(400);
        cy.get('button').eq(1).click();
        cy.contains('수정하기').click();
        cy.url().should('include', `/epigrams/${epigramId}/edit`);
      });

      it('드롭다운 삭제 버튼을 누르면 해당 에피그램이 삭제된다.', () => {
        cy.intercept('DELETE', `/api/epigrams/${epigramId}`, {
          statusCode: 200,
          body: { id: epigramId },
        }).as('deleteEpigram');
        cy.wait(400);
        cy.get('button').eq(1).click();
        cy.contains('삭제하기').click();
        cy.get('button').contains('삭제하기').click();
        cy.wait('@deleteEpigram');
        cy.url().should('include', '/feeds');
      });
    });
  });
});
