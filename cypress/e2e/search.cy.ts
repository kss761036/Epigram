describe('검색페이지', () => {
  describe('검색페이지 기능 검증', () => {
    beforeEach(() => {
      cy.session('user-session', () => {
        cy.login();
      });

      cy.visit('/search', {
        onBeforeLoad(win) {
          win.localStorage.setItem(
            'recent-keywords',
            JSON.stringify({
              state: { keywords: ['test-keyword-1', 'test-keyword-2'] },
              version: 0,
            }),
          );
        },
      });
    });

    it('검색어 입력창 존재 검사', () => {
      cy.get('[type="search"]').should('exist');
    });

    it('로컬스토리지에 저장된 키워드가 있으면 노출된다.', () => {
      cy.contains('span', 'test-keyword-1').should('exist');
      cy.contains('span', 'test-keyword-2').should('exist');
    });

    it('검색을하면 최근검색어에 키워드가 저장된다.', () => {
      const keyword = '테스트키워드';
      cy.get('[type="search"]').type(keyword).type('{enter}');
      cy.contains('span', keyword).should('exist');

      cy.window().then((win) => {
        const stored = JSON.parse(win.localStorage.getItem('recent-keywords') || '[]');
        expect(stored.state.keywords).to.include(keyword);
      });
    });

    it('최근 검색어 클릭 시 해당 검색어로 다시 검색하는가?', () => {
      const keyword = 'test-keyword-1';
      cy.contains('span', keyword).click();

      const input = cy.get('[type="search"]');
      input.should('have.value', keyword);
      cy.url().should('include', `keyword=${keyword}`);
    });

    it('모두 지우기 버튼 클릭 시 모든 최근 검색어를 제거하는가?', () => {
      cy.contains('span', 'test-keyword-1').should('exist');
      cy.contains('span', 'test-keyword-2').should('exist');

      const deleteButton = cy.contains('button', '모두지우기');
      deleteButton.click();

      cy.contains('span', 'test-keyword-1').should('not.exist');
      cy.contains('span', 'test-keyword-2').should('not.exist');

      cy.window().then((win) => {
        const stored = JSON.parse(win.localStorage.getItem('recent-keywords') || '[]');
        expect(stored.state.keywords).length(0);
      });
    });

    it('검색 키워드 하이라이팅 하는가?', () => {
      const keyword = '테스트';
      cy.get('[type="search"]').type(keyword).type('{enter}');

      cy.get('[data-search-results] li').should('have.length.greaterThan', 0);

      cy.get('span.text-illust-blue')
        .should('exist')
        .each(($el) => {
          cy.wrap($el).should('contain.text', keyword);
        });
    });

    it('검색 결과 아이템 클릭시 해당 에피그램 상세페이지로 이동하는가?', () => {
      const keyword = '테스트';
      cy.get('[type="search"]').type(keyword).type('{enter}');

      cy.get('a[href^="/epigrams/"]')
        .first()
        .then(($el) => {
          const href = $el.attr('href');
          const id = href?.split('/').pop();

          cy.wrap($el).click();

          cy.url().should('include', `/epigrams/${id}`);
        });
    });

    it('검색 결과를 URL에 저장하고, 새로고침시 데이터가 보존되는가?', () => {
      const keyword = '테스트';

      cy.get('input[type="search"]').type(keyword).type('{enter}');
      cy.url().should('include', `keyword=${encodeURIComponent(keyword)}`);

      cy.reload();

      cy.get('input[type="search"]').should('have.value', keyword);
    });

    it('검색 결과가 무한스크롤로 구현되어있는가', () => {
      const keyword = '테스트';

      cy.get('input[type="search"]').type(keyword).type('{enter}');

      cy.get('[data-search-results] li')
        .should('have.length.greaterThan', 0)
        .then(() => {
          cy.scrollTo('bottom');

          cy.contains('div', '검색중입니다.').should('exist');
        });
    });
  });
});
