describe('Nirvana Test Run', () => {

    before(() => {
        cy.clearLocalStorage().should(function(ls) {
            expect(localStorage.getItem('access_token')).to.be.null
            expect(localStorage.getItem('token_type')).to.be.null
        })
        cy.login('mobilet');

    })
    it('should that <title> is correct', () => {
        cy.visit('/')
        cy.title().should('include', 'Backstage')
    })

    it('logged in ', () => {

            cy.get('input[name="username"]').focus().type('mobilet')
            cy.get('input[name="password"]').focus().type('nirvana')
            cy.get('input[name="apiKey"]').focus().type('11')
            cy.get('input[name="terminalId"]').focus().type('1')
            cy.get('input[name="channelCode"]').focus().type('Web')
            cy.get('input[name="firmCode"]').focus().type('MBT')
            cy.get('button').click().then((resp) => {
                console.log("Button Resposne", resp);
            })

        })
        /*     context('Case Create Venue', function() {
                it('Venue Link Selecte', () => {

                    cy.get('.c-main-menu__list>li').then(($lis) => {
                        console.log($lis);
                        $lis.eq(3).click();
                        cy.hash().should('eq', '#/venues');

                    })
                    cy.get('.c-header__title').contains('Mekanlar');
                    cy.wait(1000)
                })
                it('Create Venu Link Clicked', function() {
                    cy.get('.o-filter-bar .o-tab__button .c-button--primary').click()
                    cy.hash().should('eq', '#/venue/create')
                })
                it('Fill inline edit', function() {
                    cy.get('.c-inline-edit').click()
                    cy.wait(1000);
                    cy.get('app-tether-dialog__overlay').should('have.class', 'c-tether-dialog__overlay')
                    cy.get('input[name="tr-TR"]').focus().type('Turkish Home');
                    cy.get('input[name="en-US"]').focus().type('English Home');
                    cy.get('.c-dialog-box__footer-content button').should('not.have.class', 'c-button--disabled')
                    cy.get('.c-dialog-box__footer-content button').click();

                })

            }) */

    context('PERFORMER Create', function() {
        const performerName = "Brewww End2End";
        it('get All Perfromers', () => {
            cy.get('.c-main-menu__list>li').then(($lis) => {
                cy.wait(1000);
                $lis.eq(6).click();
                cy.get('app-tether-dialog__overlay').should('have.class', 'c-tether-dialog__overlay')
                cy.wait(1500);
                cy.get('.c-context-menu').should('be.visible');
                cy.get('.c-context-menu__list-item-label').click();
                cy.hash().should('eq', '#/performers')
            })
        })



        it('click create new Performer', () => {
            cy.get('.o-filter-bar .o-tab__button .c-button--primary').click()
            cy.hash().should('eq', '#/performers?action=create')
        })
        it('type Performer Name', () => {
            cy.get('input[name="Name"]').focus().type(performerName);
        })
        it('check type elements', () => {
            cy.get('.c-basic-button-group__inner>li').then($tip => {
                cy.wait(1000);
                $tip.eq(0).click();
                cy.get('app-attributes-select-add').should('be.visible');
                cy.get('body').click(10, 10);
                cy.wait(1000);
                $tip.eq(1).click();
                cy.get('app-attributes-select-add').should('be.visible');
                cy.get('body').click(10, 10);
                cy.wait(1000);
                $tip.eq(2).click();
                cy.get('app-attributes-select-add').should('be.visible');
                cy.get('body').click(10, 10);
                cy.wait(1000);
                $tip.eq(3).click();
                cy.get('app-attributes-select-add').should('be.visible');
                cy.get('body').click(10, 10);
                cy.wait(1000);

            })
            cy.get('.c-dialog-box__footer-content .c-button').then($butons => {
                $butons.eq(0).click();
                cy.wait(2000);
                console.log("Server", cy.server());
                cy.hash().should('eq', '#/performers?refresh=true');
            })

        })

        it('search for added Performer', () => {
            cy.get('.c-inline-search-input input').click().type(performerName);
            cy.wait(2000)
            cy.get('.c-primary-column-line__title').contains(performerName);
            cy.end();

        })


    })
});