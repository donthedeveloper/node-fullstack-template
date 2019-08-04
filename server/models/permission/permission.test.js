const chai = require('chai');
const app = require('../../../app');
const expect = chai.expect;
const Permission = require('./permission');

describe('Permission', function() {
    describe('Create', function() {
        const testPermissionName = 'testuser';

        beforeEach(function() {
            return Permission.deleteOne({
                name: 'testPermissionName'
            });
        });

        afterEach(function() {
            return Permission.deleteOne({
                name: testPermissionName
            });
        });

        it(`creates a permission`, async function() {
            const permission = await Permission.create({ name: testPermissionName });
            expect(permission).to.be.an('object');
            expect(permission.id).to.be.string;
            expect(permission.name).to.equal(testPermissionName);
        });

        it('rejects permission with duplicate name', async function() {
            const permission = await Permission.create({ name: testPermissionName });
            // expect(async () => await Permission.create({ name: testPermissionName })).to.throw();
            // const permission2 = await Permission.create({ name: testPermissionName });
            // expect permission

            try {
                const permission2 = await Permission.create({ name: testPermissionName });
                // expect(async () => await Permission.create({ name: testPermissionName })).to.throw();
                expect.fail('should have thrown due to a duplicate entry');
            } catch(error) {
                // todo: continue finishing this test
                expect(error.name).to.equal('ValidationError');
                const errors = error.errors;
                expect(errors).to.be.an('object');
                const field = errors.name;
                expect(field).to.exist();
                expect(field.message).to.equal('This permission name is already taken.');
            }
        });
    });
});