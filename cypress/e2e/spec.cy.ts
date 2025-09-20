describe('Adicionar produto real ao pedido', () => {
  it('Busca produto existente, adiciona ao pedido e valida carrinho', () => {
    // 1. Abrir a página da PDV
    cy.visit('http://localhost:4200/pdv');

    // 2. Digitar no input "Código do Produto" o nome do produto real
    cy.get('#product-search', { timeout: 10000 })
      .should('be.visible')
      .type('Feijão Mulatinho 2kg');

    // 3. Esperar a lista de produtos aparecer
    cy.get('.floating-list li', { timeout: 10000 })
      .should('have.length.greaterThan', 0)
      .first()
      .within(() => {
        // 4. Clicar no botão "ADICIONAR ITEM"
        cy.get('.btn-green').click();
      });

    // 5. Preencher a quantidade
    cy.get('#qty-saleitem')
      .clear()
      .type('1');

    // 6. Clicar no botão "ADICIONAR AO PEDIDO"
    cy.get('button.btn-send-sale').click();

    // 7. Validar se o produto foi adicionado no carrinho
    // Observação: o nome do produto aparece no bloco "currentProduct"
    cy.get('.total-section h2', { timeout: 10000 })
      .should('contain.text', 'Feijão Mulatinho 2kg');

    // Validar quantidade
    cy.get('.total-section p')
      .should('contain.text', '1 X');

    // Opcional: validar se a tabela de carrinho contém o item correto
    cy.get('.table-cart tbody tr', { timeout: 10000 })
      .should('have.length.greaterThan', 0)
      .first()
      .within(() => {
        // Aqui você pode validar o ID ou SKU real
        cy.get('td').eq(0).should('contain.text', '12'); // productId real
        cy.get('td').eq(1).should('contain.text', '1');  // quantidade
      });

      cy.get('.finalize')
      .should('be.visible')
      .click();

  });
});
