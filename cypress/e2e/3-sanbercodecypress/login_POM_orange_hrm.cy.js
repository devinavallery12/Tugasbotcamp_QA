import loginPage_OrangeHrm from "../../support/page_objects/loginPage_OrangeHrm"
import forgotPasswordPage_OrangeHrm from "../../support/page_objects/forgotPasswordPage_OrangeHrm"
import loginData_orangeHrm from "../../fixtures/loginData_OrangeHrm.json"

describe('fungsional login', () =>{
    //positive case
    beforeEach(() => {
            // cy.visit('https://opensource-demo.orangehrmlive.com/')
            loginPage_OrangeHrm.visit();
        })
    it('TL-001-User menginputkan username & password yang valid',() =>{
        //memastikan sudah berada di url login orangeHRM
        loginPage_OrangeHrm.Verify_Base_Url_Login() 
        //Input Username
        loginPage_OrangeHrm.Input_Username(loginData_orangeHrm.valid_Username)
        //Input Password
        loginPage_OrangeHrm.Input_Password(loginData_orangeHrm.valid_Password)

        //intercept dulu untuk men-trigger request ke AP
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary').as('actionsummary')

        
        //Click Button
        loginPage_OrangeHrm.Click_Btn_Login()

        cy.wait('@actionsummary', {timeout: 10000}).its('response.statusCode').should('eq', 200)

        //Assert Login
        loginPage_OrangeHrm.Verify_Login_Success()

    });

    //negative case
    it.only('TL-002-User tidak menginputkan username dan password',() =>{
        //masuk url login OrangeHRM
        loginPage_OrangeHrm.Verify_Base_Url_Login()

        //tidak menginputkan username
        loginPage_OrangeHrm.Null_Username()

        //tidak menginputkan password
        loginPage_OrangeHrm.Null_Password()

        //intercept
        //cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages').as('messagesrequired')

        //cklick button login
        loginPage_OrangeHrm.Click_Btn_Login()

        //menunggu sampai request login selesai
        //cy.wait('@messagesrequired' , {timeout: 10000}).its('response.statusCode').should('eq', 304)

        //assert error login
        loginPage_OrangeHrm.verifyusernameandpassswordKosong()
    });

    it('TL-003-User menginputkan username valid & password yang invalid',() =>{
        //panggil url login OrangeHRM
        loginPage_OrangeHrm.Verify_Base_Url_Login()

       //Input username
       loginPage_OrangeHrm.Input_Username(loginData_orangeHrm.valid_Username)

       //input password
       loginPage_OrangeHrm.Input_Password(loginData_orangeHrm.invalid_Password)

       //clikbuttonlogin
       loginPage_OrangeHrm.Click_Btn_Login()

       //menunggu sampai request login selesai
       cy.wait('@loginRequest')

       //assert error login
       loginPage_OrangeHrm.Verify_Password_Invalid()

    });

    it('TL-004-User menginputkan username invalid & password valid',() =>{
        //panggil url login OrangeHRM
        loginPage_OrangeHrm.Verify_Base_Url_Login()

        //input username invalid
        loginPage_OrangeHrm.Input_Username(loginData_orangeHrm.invalid_Username)

        //input password valid
        loginPage_OrangeHrm.Input_Password(loginData_orangeHrm.valid_Password)

        //clickbuttonlogin
        loginPage_OrangeHrm.Click_Btn_Login()

        //menunggu sampai request login selesai
        cy.wait('@loginRequest')

        //assert error login
        loginPage_OrangeHrm.Verify_Username_Invalid()

    });

    it('TL-005-User hanya mengiputkan password dan tidak menginputkan username',() =>{
        //panggil url login OrangeHRM
        loginPage_OrangeHrm.Verify_Base_Url_Login()

        //tidak menginputkan username alias null
        loginPage_OrangeHrm.Null_Password()

        //input password valid
        loginPage_OrangeHrm.Input_Password(loginData_orangeHrm.valid_Password)

        //clickbuttonlogin
        loginPage_OrangeHrm.Click_Btn_Login()

        //menunggu sampai request login selesai
        cy.wait('@loginRequest')

        //assert error login
        loginPage_OrangeHrm.Verify_Username_Kosong()
    });

    it('TL-006-User hanya menginputkan username dan tidak menginputkan password', () =>{
        //panggil url login OrangeHRM
        loginPage_OrangeHrm.Verify_Base_Url_Login()

        //input username 
        loginPage_OrangeHrm.Input_Username(loginData_orangeHrm.valid_Username)

        //tidak menginputkan password alias null
        loginPage_OrangeHrm.Null_Password()

        //clickbuttonlogin
        loginPage_OrangeHrm.Click_Btn_Login()

        //menunggu sampai request login selesai
        cy.wait('@loginRequest')

        //assert error login
        loginPage_OrangeHrm.Verify_Username_Kosong()

    });

    it('TL-007-User menginputkan username dan password yang invalid', () => {
        //panggil url login OrangeHRM
        loginPage_OrangeHrm.Verify_Base_Url_Login()

        //input username invalid
        loginPage_OrangeHrm.Input_Username(loginData_orangeHrm.invalid_Username)

        //input password valid
        loginPage_OrangeHrm.Input_Password(loginData_orangeHrm.invalid_Password)

        //clickbuttonlogin
        loginPage_OrangeHrm.Click_Btn_Login()

        //menunggu sampai request login selesai
        cy.wait('@loginRequest')

        //assert error login
        loginPage_OrangeHrm.Verify_Username_Invalid()

    });
});

describe('fungsional forgot password', () =>{
    //positif case
    beforeEach(() => {

        //intercept dulu untuk men-trigger request ke API
        cy.intercept('POST', '/web/index.php/auth/login').as('loginRequest')

        //cy.visit login page dulu
        loginPage_OrangeHrm.visit();
    })

    it('TF-001-User menginputkan username valid via email yang valid', () => {

        //cklik button forgot password di halaman login
        loginPage_OrangeHrm.clickforgotpasswordlink()

        //membuka atau memverifikasi yang dibuka di halaman forgot password
        forgotPasswordPage_OrangeHrm.verify_Base_Url_Forgot_Password()

        //input username
        forgotPasswordPage_OrangeHrm.Input_Username(loginData_orangeHrm.valid_Username)

        //click button reset password
        forgotPasswordPage_OrangeHrm.Click_Button_Reset()

        //menggu aksi request dari intercept
        cy.wait('@loginRequest')

        //assert reset password
        forgotPasswordPage_OrangeHrm.verify_Send_Password_Reset()
    })

    it('TF-002-User tidak input username via email yang valid di field username', () => {

        //cklik button forgot password di halaman login
        loginPage_OrangeHrm.clickforgotpasswordlink()
        
        //membuka atau memverifikasi yang dibuka di halaman forgot password
        forgotPasswordPage_OrangeHrm.verify_Base_Url_Forgot_Password()

        //input username
        forgotPasswordPage_OrangeHrm.Null_Username()

        //click button reset password
        forgotPasswordPage_OrangeHrm.Click_Button_Reset()

        //menggu aksi request dari intercept
        cy.wait('@loginRequest')

        //assert username kosong di forgot password
        forgotPasswordPage_OrangeHrm.verify_Username_kosong_Forgot_Password()
    })
})