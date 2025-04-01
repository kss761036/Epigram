describe('회원가입 페이지', () => {
  describe('로그인 유무 체크', () => {
    it('세션이 있을경우, 루트 페이지로 이동한다.', () => {
      cy.login();

      cy.visit('/login');
      cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    });
  });

  beforeEach(() => {
    cy.visit('/signup');
  });

  describe('입력필드 존재 검사', () => {
    it('이메일, 닉네임, 비밀번호, 비밀번호확인 입력창 존재', () => {
      cy.get('[name="email"]').should('exist');
      cy.get('[name="nickname"]').should('exist');
      cy.get('[name="password"]').should('exist');
      cy.get('[name="passwordConfirmation"]').should('exist');
    });
  });

  describe('회원가입 유효성 검사', () => {
    it('모든 필수 입력 필드를 비우고 blur 시 오류 메시지를 보여준다', () => {
      cy.get('[name="email"]').click().blur();
      cy.contains('이메일은 필수 입력입니다.');

      cy.get('[name="nickname"]').click().blur();
      cy.contains('닉네임은 필수 입력입니다.');

      cy.get('[name="password"]').click().blur();
      cy.contains('비밀번호는 필수 입력입니다.');

      cy.get('[name="passwordConfirmation"]').click().blur();
      cy.contains('비밀번호 확인을 입력해 주세요.');
    });

    it('잘못된 이메일 형식 입력 시 오류 메시지를 보여준다', () => {
      cy.get('[name="email"]').type('invalid-email').blur();
      cy.contains('이메일 형식으로 작성해 주세요.');
    });

    it('닉네임이 20자를 초과하면 오류 메시지를 보여준다', () => {
      cy.get('[name="nickname"]').type('a'.repeat(21)).blur();
      cy.contains('닉네임은 최대 20자까지 가능합니다.');
    });

    it('비밀번호가 8자 미만이면 오류 메시지를 보여준다', () => {
      cy.get('[name="password"]').type('short').blur();
      cy.contains('비밀번호는 최소 8자 이상입니다.');
    });

    it('비밀번호가 지정된 형식에 맞지 않으면 오류 메시지를 보여준다', () => {
      cy.get('[name="password"]').type('비밀번호123}').blur();
      cy.contains('비밀번호는 숫자, 영문, 특수문자로만 가능합니다.');
    });

    it('비밀번호와 비밀번호 확인이 일치하지 않으면 오류 메시지를 보여준다', () => {
      cy.get('[name="password"]').type('Test1234!');
      cy.get('[name="passwordConfirmation"]').type('Another!').blur();
      cy.contains('비밀번호가 일치하지 않습니다.');
    });

    it('모든 입력이 유효할 경우 폼 제출 후 로그인 페이지으로 이동한다', () => {
      cy.intercept('POST', '**/auth/signUp', {
        statusCode: 200,
      }).as('signup');

      cy.get('[name="email"]').type('user@example.com');
      cy.get('[name="nickname"]').type('테스트유저');
      cy.get('[name="password"]').type('Test1234!');
      cy.get('[name="passwordConfirmation"]').type('Test1234!');
      cy.get('form').submit();

      cy.wait('@signup');
      cy.url().should('eq', `${Cypress.config().baseUrl}/login`);
    });

    it('닉네임 중복 시 500 에러 메시지를 보여준다', () => {
      cy.intercept('POST', '**/auth/signUp', {
        statusCode: 500,
        body: { message: '중복된 닉네임입니다.' },
      }).as('signup');

      cy.get('[name="email"]').type('duplicate@example.com');
      cy.get('[name="nickname"]').type('중복닉네임');
      cy.get('[name="password"]').type('Test1234!');
      cy.get('[name="passwordConfirmation"]').type('Test1234!');

      cy.get('form').submit();

      cy.wait('@signup');
      cy.contains('중복된 닉네임입니다.');
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
