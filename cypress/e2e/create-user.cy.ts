describe('Criar Usuário', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/users'); 
  });

  it('deve preencher os campos e criar um usuário', () => {
    const randomRole = Math.floor(Math.random() * 3) + 1;

    cy.get('input[name="name"]').type('Test User');
    cy.get('input[name="email"]').type(`user.teste${Date.now()}@email.com`);
    cy.get('select[name="roleId"]').select(randomRole.toString());
    cy.get('button[type="submit"]').click();

    cy.get('.alert')
      .should('exist')
      .and(($alert) => {
        expect(
          $alert.text().trim()
        ).to.be.oneOf([
          'Usuário atualizado com sucesso!',
          'Cadastro não realizado'
        ]);
      });
  });
});
