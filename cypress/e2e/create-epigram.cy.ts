describe('에피그램 생성 페이지', () => {
  describe('비로그인 상태 접근 시 동작 검증', () => {
    it('로그인이 되어있지 않으면, 로그인 페이지로 이동한다.', () => {
      cy.visit('/epigrams/create');
      cy.url().should('include', `${Cypress.config().baseUrl}/login`);
    });
  });

  describe('로그인 후 기능 동작 검증', () => {
    beforeEach(() => {
      cy.session('user-session', () => {
        cy.login();
      });
    });

    it('내용 500자 넘어가면 경고 메시지가 하단에 생성 되는가?', () => {
      cy.visit('/epigrams/create');
      cy.get('form > ul > li:nth-child(1) textarea').type('a'.repeat(501));
      cy.get('form > ul > li:nth-child(1) textarea').blur();
      cy.get('form > ul > li:nth-child(1) textarea + span').should('exist');
    });

    it('저자 "직접 입력" 클릭 후 이름 미입력 시 경고 메시지가 하단에 생성 되는가?', () => {
      cy.visit('/epigrams/create');
      cy.get('label').contains('직접 입력').click();
      cy.get('form > ul > li:nth-child(2) > ul + div > .relative input[type="text"]').click();
      cy.get('form > ul > li:nth-child(2) > ul + div > .relative input[type="text"]').blur();
      cy.get('form > ul > li:nth-child(2) > ul + div > .relative + span').should('exist');
    });

    it('저자를 "직접 입력" 후 값 입력 → "본인" 클릭 → 다시 "직접 입력" 클릭 시 입력값이 초기화 되는가?', () => {
      cy.visit('/epigrams/create');
      cy.get('label').contains('직접 입력').click();
      cy.get('form > ul > li:nth-child(2) > ul + div > .relative input[type="text"]').type(
        '테스트 저자',
      );
      cy.get('label').contains('본인').click();
      cy.get('label').contains('직접 입력').click();
      cy.get('form > ul > li:nth-child(2) > ul + div > .relative input[type="text"]').should(
        'have.value',
        '',
      );
    });

    it('출처의 관련 URL에 http:// 또는 https://가 포함되지 않으면 경고 메시지가 하단에 생성 되는가?', () => {
      cy.visit('/epigrams/create');
      cy.get(
        'form > ul > li:nth-child(3) > div:nth-of-type(2) > .relative > input[type="text"]',
      ).type('www.naver.com');
      cy.get(
        'form > ul > li:nth-child(3) > div:nth-of-type(2) > .relative > input[type="text"]',
      ).blur();
      cy.get('form > ul > li:nth-child(3) > div:nth-of-type(2) > .relative + span').should('exist');
    });

    it('출처의 관련 URL에 경고 메시지가 http:// 또는 https://를 포함시키면 사라지는가?', () => {
      cy.visit('/epigrams/create');
      cy.get(
        'form > ul > li:nth-child(3) > div:nth-of-type(2) > .relative > input[type="text"]',
      ).type('www.naver.com');
      cy.get(
        'form > ul > li:nth-child(3) > div:nth-of-type(2) > .relative > input[type="text"]',
      ).blur();
      cy.get('form > ul > li:nth-child(3) > div:nth-of-type(2) > .relative + span').should('exist');
      cy.get(
        'form > ul > li:nth-child(3) > div:nth-of-type(2) > .relative > input[type="text"]',
      ).type('{moveToStart}https://');
      cy.get(
        'form > ul > li:nth-child(3) > div:nth-of-type(2) > .relative > input[type="text"]',
      ).blur();
      cy.get('form > ul > li:nth-child(3) > div:nth-of-type(2) > .relative + span').should(
        'not.exist',
      );
    });

    it('태그 10자 넘어가면 경고 메시지가 하단에 생성 되는가? 경고문구 : "10자 이하로 작성해주세요."', () => {
      cy.visit('/epigrams/create');
      cy.get('form > ul > li:nth-child(4) .relative > input[type="text"]').type(
        'a'.repeat(11) + '{enter}',
      );
      cy.get('form > ul > li:nth-child(4) .relative + span')
        .should('exist')
        .and('have.text', '10자 이하로 작성해주세요.');
    });

    it('태그를 3개 넘게 등록하면 경고 메시지가 하단에 생성 되는가? 경고문구 : "최대 3개까지만 등록가능해요."', () => {
      cy.visit('/epigrams/create');
      cy.get('form > ul > li:nth-child(4) .relative > input[type="text"]').type(
        '태그1{enter}태그2{enter}태그3{enter}태그4{enter}',
      );
      cy.get('form > ul > li:nth-child(4) .relative + span')
        .should('exist')
        .and('have.text', '최대 3개까지만 등록가능해요.');
    });

    it('태그가 중복으로 등록되면 경고 메시지가 하단에 생성 되는가? 경고문구 : "중복된 태그는 사용할 수 없어요."', () => {
      cy.visit('/epigrams/create');
      cy.get('form > ul > li:nth-child(4) .relative > input[type="text"]').type(
        '태그{enter}태그{enter}',
      );
      cy.get('form > ul > li:nth-child(4) .relative + span')
        .should('exist')
        .and('have.text', '중복된 태그는 사용할 수 없어요.');
    });
    it('태그의 처음과 끝에 띄어쓰기를 입력해도 띄어쓰기 없이 등록되는가?', () => {
      cy.visit('/epigrams/create');
      cy.get('form > ul > li:nth-child(4) .relative > input[type="text"]').type(' 태그 {enter}');
      cy.get('form > ul > li:nth-child(4) > ul > li:first-child span')
        .should('exist')
        .and('have.text', '태그');
    });

    it('필수 입력값인 내용과 저자만 입력해도 "작성완료" 버튼이 활성화 되는가?', () => {
      cy.visit('/epigrams/create');
      cy.get('form > ul > li:nth-child(1) textarea').type('이것은 테스트 에피그램입니다.');
      cy.get('label').contains('본인').click();
      cy.get('button').contains('작성 완료').should('not.be.disabled');
    });

    it('폼 입력 후 작성 완료하면 상세 페이지로 이동 되는가?', () => {
      cy.visit('/epigrams/create');
      cy.get('form > ul > li:nth-child(1) textarea').type('이것은 테스트 에피그램입니다.');
      cy.get('label').contains('본인').click();
      cy.get(
        'form > ul > li:nth-child(3) > div:nth-of-type(1) > .relative > input[type="text"]',
      ).type('출처제목 테스트');
      cy.get(
        'form > ul > li:nth-child(3) > div:nth-of-type(2) > .relative > input[type="text"]',
      ).type('https://www.naver.com');
      cy.get('form > ul > li:nth-child(4) input[type="text"]').type('테스트{enter}');
      cy.contains('작성 완료').click();
      cy.url().should('include', '/epigrams/');
    });

    it('작성 완료 버튼을 두 번 눌러도 POST 요청이 한 번만 발생 하는가?', () => {
      cy.intercept('POST', '/api/epigrams').as('createEpigram');
      cy.visit('/epigrams/create');
      cy.get('form > ul > li:nth-child(1) textarea').type('중복 테스트입니다.');
      cy.get('label').contains('본인').click();
      cy.contains('작성 완료').as('submitBtn');
      cy.get('@submitBtn').click();
      cy.get('@submitBtn').click({ force: true });
      cy.wait('@createEpigram');
      cy.get('@createEpigram.all').should('have.length', 1);
      cy.url().should('include', '/epigrams/');
    });
  });
});
