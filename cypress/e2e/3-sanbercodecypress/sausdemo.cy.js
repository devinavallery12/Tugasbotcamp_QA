describe('scenario login saucdemo',()=> {
    it('TSD-001-user menginputkan username dan password dengan valid',() => {
        cy.visit('https://www.saucedemo.com/v1/');
        cy.get('#user-name').clear().type('standard_user');
        cy.xpath("//input[@id='password']").type('secret_sauce');
        cy.get('.btn_action').click();
    })
})