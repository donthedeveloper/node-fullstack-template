const chai = require('chai');
const app = require('../../../app');
const expect = chai.expect;
const User = require('./user');

describe('User', function() {
    const testUserEmail = 'test@test.com';
    const testInvalidUserEmail = 'test';
    const testUserPassword = 'test';

    describe('Create', function() {
        afterEach(function() {
            return User.deleteOne({
                email: testUserEmail
            });
        });

        it('creates a user', async function() {
            const user = await User.create({
                email: testUserEmail,
                password: testUserPassword
            });
            expect(user).to.be.an('object');
            expect(user.email).to.equal(testUserEmail);
        });

        it('rejects an empty email address', async function() {
            try {
                await User.create({ password: testUserPassword });
                expect.fail('should have thrown due to an empty email address');
            } catch(error) {
                expect(error.name).to.equal('ValidationError');
                const errors = error.errors;
                expect(errors).to.be.an('object');
                const field = errors.email;
                expect(field).to.be.an('object');
                expect(field.message).to.equal('You must provide an email address.');
            }
        });

        it('rejects an invalid email', async function() {
            try {
                await User.create({ email: testInvalidUserEmail });
                expect.fail('should have thrown due to an invalid email address');
            } catch(error) {
                expect(error.name).to.equal('ValidationError');
                const errors = error.errors;
                expect(errors).to.be.an('object');
                const field = errors.email;
                expect(field).to.be.an('object');
                expect(field.message).to.equal('Provide a proper email address.');
            }
        });

        it('rejects an empty password', async function() {
            try {
                await User.create({ email: testUserEmail });
                expect.fail('should have thrown due to an empty password');
            } catch(error) {
                expect(error.name).to.equal('ValidationError');
                const errors = error.errors;
                expect(errors).to.be.an('object');
                const field = errors.password;
                expect(field).to.be.an('object');
                expect(field.message).to.equal('You must provide a password.');
            }
        });

        it('rejects user with duplicate email', async function() {
            await User.create({
                email: testUserEmail,
                password: testUserPassword
            });

            try {
                await User.create({
                    email: testUserEmail,
                    password: testUserPassword
                });
                expect.fail('should have thrown due to a duplicate email');
            } catch(error) {
                expect(error.name).to.equal('ValidationError');
                const errors = error.errors;
                expect(errors).to.be.an('object');
                const field = errors.email;
                expect(field).to.be.an('object');
                expect(field.message).to.equal('This email address is already taken.');
            }
        });
    });
    // todo: test Update
});