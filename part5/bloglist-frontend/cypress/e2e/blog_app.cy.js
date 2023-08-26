describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset');
        cy.addUser({
            username: 'test',
            name: 'Test User',
            password: 'test'
        });
        cy.addUser({
            username: 'test2',
            name: 'Test User 2',
            password: 'test2'
        });
        cy.visit('http://localhost:5173');
    })

    it('Login form is shown', function () {
        cy.contains('Log in');
    });

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('#login-username').type('test');
            cy.get('#login-password').type('test');
            cy.get('#login-button').click();
            cy.get('.success').contains('Logged in successfuly.');
        });

        it('fails with wrong credentials', function () {
            cy.get('#login-username').type('test');
            cy.get('#login-password').type('wrong');
            cy.get('#login-button').click();
            cy.get('.error')
                .should('contain', 'Invalid username or password.')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-style', 'solid')
        });
    });

    describe('When logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'test', password: 'test' });
        });

        it('a blog can be created', function () {
            cy.contains('new blog').click();
            cy.get('#title').type('Test blog');
            cy.get('#author').type('Test author');
            cy.get('#url').type('Test url');
            cy.get('#new-blog-button').click();

            cy.get('.success').contains('A new blog: Test blog, by Test author added.');
            cy.get('#blog-list').contains('Test blog Test author');
        });
    });

    describe('When a blog is created', function () {
        beforeEach(function () {
            cy.login({ username: 'test', password: 'test' });
            cy.addBlog({
                title: 'Test blog', author: 'Test author', url: 'Test url'
            });

            cy.get('#blog-list')
                .contains('Test blog Test author')
                .parent().as('blog');
        });

        it('can be liked', function () {
            cy.get('@blog').contains('show').click();
            cy.get('@blog').contains('like').click();

            cy.get('.success').contains('Blog liked successfuly.');
            cy.contains('likes: 1');
        });

        it('can be deleted', function () {
            cy.get('@blog').contains('show').click();
            cy.get('@blog').contains('remove').click();

            cy.get('.success').contains('Blog deleted successfuly.');
            cy.contains('No blogs');
        });

        it('only the user who created the blog can delete it', function () {
            cy.get('@blog').contains('show').click();
            cy.get('@blog').contains('remove');

            cy.contains('logout').click();
            cy.login({ username: 'test2', password: 'test2' });

            cy.get('@blog').contains('show').click();
            cy.get('@blog').contains('remove').should('not.exist');
        });
    });

    describe('When there are two or more blogs', function () {
        beforeEach(function () {
            cy.login({ username: 'test', password: 'test' });
            cy.addBlog({
                title: 'Test blog', author: 'Test author', url: 'Test url'
            });
            cy.addBlog({
                title: 'Another test blog', author: 'Test author 2', url: 'Test url 2'
            });
            cy.get('#blog-list').contains('Test blog Test author').parent().as('blog1');
            cy.get('#blog-list').contains('Another test blog Test author 2').parent().as('blog2');
        });

        it.only('are ordered by likes', function () {
            cy.get('@blog2').contains('show').click();
            cy.get('@blog2').contains('like').click();

            cy.get('.blog').eq(0).should('contain', 'Another test blog');
            cy.get('.blog').eq(1).should('contain', 'Test blog');

            cy.get('@blog1').contains('show').click();
            cy.get('@blog1').contains('like').click();
            cy.get('@blog1').contains('likes: 1');
            cy.get('@blog1').contains('like').click();

            cy.get('.blog').eq(0).should('contain', 'Test blog');
            cy.get('.blog').eq(1).should('contain', 'Another test blog');
        });
    });
});