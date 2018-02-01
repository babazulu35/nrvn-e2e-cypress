// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add('login', (userType, options = {}) => {

    const types = {
        mobilet: {
            username: 'mobilet',
            password: 'nirvana',
            apiKey: '11',
            terminalId: '1',
            channelCode: 'Web',
            firmCode: 'MBT',
            grant_type: 'refresh_token'
        },
        boxoffice: {
            username: 'mobilet',
            password: 'nirvana',
            apiKey: '1',
            terminalId: '1',
            channelCode: 'Box office',
            firmCode: 'MBT',
            grant_type: 'refresh_token'
        }
    }

    const user = types[userType];

    cy.request({
            method: 'POST',
            url: 'https://backofficeapi-test.backstage.solutions/api/v1.0/Token',
            body: user
        })
        .then(resp => {
            localStorage.setItem("access_token", resp.body.access_token);
            localStorage.setItem("token_type", resp.body.token_type);
            expect(resp.status).to.eq(200)
            expect(resp.body).to.have.property('access_token')
            expect(resp.body.access_token).not.to.be.empty
            expect(localStorage.getItem('access_token')).to.equal(resp.body.access_token)
            expect(resp).to.have.property('headers')
            expect(resp).to.have.property('duration')
        })

})