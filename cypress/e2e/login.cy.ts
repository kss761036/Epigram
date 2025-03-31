describe('로그인 페이지', () => {
  describe('로그인 유무 체크', () => {
    it('세션이 있을경우, 루트 페이지로 이동한다.', () => {
      cy.login();

      cy.wait(400);

      cy.visit('/login');
      cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    });
  });

  beforeEach(() => {
    cy.visit('/login');
  });

  describe('입력필드 존재 검사', () => {
    it('이메일, 비밀번호 입력창 존재', () => {
      cy.get('[name="email"]').should('exist');
      cy.get('[name="password"]').should('exist');
    });
  });

  describe('로그인 유효성 검사', () => {
    it('모든 필수 입력 필드를 비우고 blur 시 오류 메시지를 보여준다', () => {
      cy.get('[name="email"]').click().blur();
      cy.contains('이메일은 필수 입력입니다.');

      cy.get('[name="password"]').click().blur();
      cy.contains('비밀번호는 필수 입력입니다.');
    });

    it('잘못된 이메일 형식 입력 시 오류 메시지를 보여준다', () => {
      cy.get('[name="email"]').type('invalid-email').blur();
      cy.contains('이메일 형식으로 작성해 주세요.');
    });

    it('모든 입력이 유효할 경우 폼 제출 후 루트 페이지으로 이동한다', () => {
      cy.intercept('POST', '/api/auth/callback/credentials', {
        statusCode: 200,
        body: {
          url: 'http://localhost:3000',
          ok: true,
        },
      }).as('signin');

      cy.get('[name="email"]').type('user@example.com');
      cy.get('[name="password"]').type('Test1234!');
      cy.get('form').submit();

      cy.wait('@signin');
      cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    });

    it('로그인 실패 시 로그인 페이지로 이동하고 에러 메시지를 포함한다', () => {
      cy.intercept('POST', '/api/auth/callback/credentials', {
        statusCode: 401,
        body: {
          ok: false,
          url: 'http://localhost:3000/login?error=login%20error',
        },
      }).as('signin');

      cy.get('[name="email"]').type('wrong@example.com');
      cy.get('[name="password"]').type('wrongpass');
      cy.get('form').submit();

      cy.wait('@signin');

      cy.url().should('include', '/login?error=login%20error');
    });
  });

  describe('간편가입 검사', () => {
    it('카카오 버튼 클릭 시 콜백 페이지로 이동한다', () => {
      cy.intercept('GET', '/api/auth/oauth/kakao', (req) => {
        req.reply({
          statusCode: 302,
          headers: {
            location: '/oauth/kakao',
          },
        });
      });

      cy.get('[data-oauth-id="kakao"]').click();

      cy.url().should('include', `${Cypress.config().baseUrl}/oauth/kakao`);
    });

    it('구글 버튼 클릭 시 콜백 페이지로 이동한다', () => {
      cy.intercept('GET', '/api/auth/oauth/google', (req) => {
        req.reply({
          statusCode: 302,
          headers: {
            location: '/oauth/google',
          },
        });
      });

      cy.get('[data-oauth-id="google"]').click();

      cy.url().should('include', `${Cypress.config().baseUrl}/oauth/google`);
    });
  });
});
