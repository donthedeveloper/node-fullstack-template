const chai = require('chai');

const expect = chai.expect;
const Permission = require('./permission');

describe('Permission', function() {
    const nonAlphaNumericPermissionName = '$testpermission';
    const testPermissionName = 'testpermission';

    describe('Create', function() {
        afterEach(function() {
            return Promise.all([
                Permission.deleteOne({
                    name: testPermissionName
                }),
                Permission.deleteOne({
                    name: nonAlphaNumericPermissionName
                })
            ]);
        });

        it('creates a permission', async function() {
            const permission = await Permission.create({ name: testPermissionName });
            expect(permission).to.be.an('object');
            expect(permission.id).to.be.string;
            expect(permission.name).to.equal(testPermissionName);
        });

        it('rejects a non-alphanumeric name', async function() {
            try {
                await Permission.create({ name: nonAlphaNumericPermissionName});
                expect.fail('should have thrown due to an invalid name');
            } catch(error) {
                expect(error.name).to.equal('ValidationError');
                const errors = error.errors;
                expect(errors).to.be.an('object');
                const field = errors.name;
                expect(field).to.be.an('object');
                expect(field.message).to.equal('Provide an alphanumeric name.');
            }
        });

        it('rejects permission with duplicate name', async function() {
            await Permission.create({ name: testPermissionName });

            try {
                await Permission.create({ name: testPermissionName });
                expect.fail('should have thrown due to a duplicate entry');
            } catch(error) {
                expect(error.name).to.equal('ValidationError');
                const errors = error.errors;
                expect(errors).to.be.an('object');
                const field = errors.name;
                expect(field).to.be.an('object');
                expect(field.message).to.equal('This permission name is already taken.');
            }
        });
    });

    describe('Update', function() {
        const updatedTestPermissionName = 'updatedTestPermissionName';
        let permission;
        const testPermission2Name = 'testPermission2Name';

        beforeEach(async function() {
            permission = await Permission.create({ name: testPermissionName });
            return Permission.create({
                name: testPermission2Name
            });
        });

        afterEach(function() {
            return Promise.all([
                Permission.deleteOne({
                    name: testPermissionName
                }),
                Permission.deleteOne({
                    name: testPermission2Name
                }),
                Permission.deleteOne({
                    name: updatedTestPermissionName
                })
            ]);
        });

        it('updates a permission', async function() {
            permission.name = updatedTestPermissionName;
            await permission.save();

            const updatedPermissionInDb = await Permission.findOne({
                name: updatedTestPermissionName
            });
            expect(updatedPermissionInDb).to.not.be.null;
        });

        it('rejects a non-alphanumeric name', async function() {
            try {
                permission.name = nonAlphaNumericPermissionName;
                await permission.save();

                expect.fail('should have thrown due to an invalid name');
            } catch(error) {
                expect(error.name).to.equal('ValidationError');
                const errors = error.errors;
                expect(errors).to.be.an('object');
                const field = errors.name;
                expect(field).to.be.an('object');
                expect(field.message).to.equal('Provide an alphanumeric name.');
            }
        });

        it('rejects permission with duplicate name', async function() {
            try {
                permission.name = testPermission2Name;
                await permission.save();

                expect.fail('should have thrown due to a duplicate entry');
            } catch(error) {
                expect(error.name).to.equal('ValidationError');
                const errors = error.errors;
                expect(errors).to.be.an('object');
                const field = errors.name;
                expect(field).to.be.an('object');
                expect(field.message).to.equal('This permission name is already taken.');
            }
        });
    });
});