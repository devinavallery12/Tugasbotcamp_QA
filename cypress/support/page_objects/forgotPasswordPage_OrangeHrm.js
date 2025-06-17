import loginData_orangeHrm from "../../fixtures/loginData_OrangeHrm.json"

class forgotPage{
    visit() {
        cy.visit('/web/index.php/auth/requestPasswordResetCode')//buka halaman forgot password
    }

    //input username valid di field username
    Input_Username(username) {
        cy.xpath('//input[@placeholder="Username"]').should('be.visible')
        cy.xpath('//input[@placeholder="Username"]').clear().type(username).should('have.value',username)
    }

    //klik button reset
    Click_Button_Reset() {
        cy.xpath('//button[normalize-space()="Reset Password"]').should('be.visible')
        cy.xpath('//button[normalize-space()="Reset Password"]').click()
    }

    //buka halaman dari validasi send password reset setelah klik button reset password
    verify_Send_Password_Reset() {
        cy.url().should('include','/web/index.php/auth/sendPasswordReset')
        cy.wait(2000) // sementara buat debug
        cy.get('h6').should('contain.text', 'Reset Password link sent successfully');
    }

    // input null/kosong username di field username
    Null_Username() {
        cy.xpath('//input[@placeholder="Username"]').should('be.visible')
        cy.xpath('//input[@placeholder="Username"]').clear().should('not.have.value')
    }

    //memunculkan validasai required jika username kosong
    verify_Username_kosong_Forgot_Password() {
        cy.get('.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message')
        .should('contain.text', 'Required');
    }

    verify_Base_Url_Forgot_Password() {
        cy.url().should('include','requestPasswordResetCode')
        cy.get('h6').should('contain.text','Reset Password')
    }
}


export default new forgotPage(); //export forgotPage nya