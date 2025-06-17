import loginPage_OrangeHrm from "../../support/page_objects/loginPage_OrangeHrm"
import loginData_orangeHrm from "../../fixtures/loginData_OrangeHrm.json"

describe('fungsional login', () =>{
    //positive case
    beforeEach(() => {
            // cy.visit('https://opensource-demo.orangehrmlive.com/')
            loginPage_OrangeHrm.visit();
        })
    it('TL-001-User menginputkan username & password yang valid',() =>{
        loginPage_OrangeHrm.Verify_Base_Url_Login() //panggil url login orangeHRM
        //Input Username
        loginPage_OrangeHrm.Input_Username(loginData_orangeHrm.valid_Username)
        //Input Password
        loginPage_OrangeHrm.Input_Password(loginData_orangeHrm.valid_Password)
        //Click Button
        loginPage_OrangeHrm.Click_Btn_Login()
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

        //cklick button login
        loginPage_OrangeHrm.Click_Btn_Login()

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

        //assert error login
        loginPage_OrangeHrm.Verify_Username_Invalid()

    });
});