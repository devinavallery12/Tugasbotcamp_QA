import loginData_orangeHrm from "../../fixtures/loginData_OrangeHrm.json"

class LoginPage {
    visit() {
      cy.visit('/web/index.php/auth/login'); // buka halaman login
    }
  
    Input_Username(username) {
      cy.xpath('//input[@placeholder="Username"]').should('be.visible')
      cy.xpath('//input[@placeholder="Username"]').clear().type(username).should('have.value',username)
    }
  
    Null_Username() {
      cy.xpath('//input[@placeholder="Username"]').should('be.visible')
      cy.xpath('//input[@placeholder="Username"]').clear().should('not.have.value')
    }

    Input_Password(password) { //inputpassword di feld password
      cy.xpath('//input[@placeholder="Password"]').should('be.visible')
      cy.xpath('//input[@placeholder="Password"]').clear().type(password).should('have.value',password)
    }
  
    Null_Password() {
      cy.xpath('//input[@placeholder="Password"]').should('be.visible')
      cy.xpath('//input[@placeholder="Password"]').clear().should('not.have.value')
    }

    Click_Btn_Login() { //klik button login
      cy.xpath('//button[normalize-space()="Login"]').should('be.visible')
      cy.xpath('//button[normalize-space()="Login"]').click()
      cy.wait(2000); // Tambahkan delay setelah klik login
    }

    Verify_Base_Url_Login() { //mengunjungi halaman login orangeHRM
      cy.url().should('include','orangehrmlive')
      cy.title().should('include','OrangeHRM') 
    }

    Verify_Login_Success() { //menuju halaman dashboard
      cy.url().should('include', '/web/index.php/dashboard/index'); // cek url dashboard
      cy.get('h6').should('contain.text', 'Dashboard'); // cek teks dashboard muncul
    }
  
    Verify_Username_Invalid() {
      cy.get('.oxd-alert.oxd-alert--error')
      .should('contain.text','Invalid credentials')// cek pesan error untuk validasi inputan username invalid
    }
  
    Verify_Password_Invalid() {
      cy.xpath("//div[@class='oxd-alert-content oxd-alert-content--error']")
      .should('contain.text','Invalid credentials')// cek pesan error untuk inputan password invalid
   }
    Verify_Username_Kosong() {
      cy.get('.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message')
      .should('contain.text', 'Required') 
      // cek pesan error untuk username kosong
    }
  
    verifypasswordkosong() {
      cy.get('.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message')
      .should('contain.text', 'Required')
      // cek pesan error untuk password kosong
   }

   verifyusernameandpassswordKosong() {
    // cek pesan error untuk username/password salah
    cy.get('.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message')
    .should('contain.text', 'Required')
 }

    clickforgotpasswordlink() {
      //clik button link forgot password
      cy.get('.oxd-text.oxd-text--p.orangehrm-login-forgot-header').should('be.visible')
      cy.get('.oxd-text.oxd-text--p.orangehrm-login-forgot-header').click()
    }

  }
  
  export default new LoginPage(); // export instance LoginPage
  