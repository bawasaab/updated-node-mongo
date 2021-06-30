const Validator = require('validatorjs');
const { ObjectId } = require('mongodb');

const ResponseService = require('../services').ResponseService;
const responseServiceObj = new ResponseService();

const UserService = require('../services').UserService;
const UserServiceObj = new UserService();

var userImagePath = require('../config/config').userImageBasePath;

module.exports = class UserController {

    constructor() {}

    insertUser( req, res, next ) {

        try {

            let in_data = req.body;
            let rules = {
                first_name: 'required',
                email: 'required|email',
                password: 'required|min:6',
                contact_number: 'required|min:10',
                role: 'required|in:ADMIN,SUB_ADMIN,CUSTOMER',
            };
            let validation = new Validator(in_data, rules);
            if( validation.fails() ) {

                return responseServiceObj.sendException( res, {
                    msg : responseServiceObj.getFirstError( validation )
                } );
            }
            
            UserServiceObj.isUserEmailExists( in_data.email )
            .then( async (isExists) => {
                if( isExists ) {
                    throw 'Email already exists.'
                }
                return true;
            } )
            .then( async (inResult) => {
                let isExists = await UserServiceObj.isUserContactNoExists( in_data.contact_number )
                if( isExists ) {
                    throw 'Contact number already exists.'
                }
                return true;
            } )
            .then( async (inResult) => {
                let result = await UserServiceObj.insertUser( in_data );
                return await responseServiceObj.sendResponse( res, {
                    msg : 'Record inserted successfully',
                    data : {
                        user: result,
                        userImagePath: userImagePath
                    }
                } );
            } )
            .catch( async (ex) => {
                return await responseServiceObj.sendException( res, {
                    msg : ex.toString()
                } );
            } );
            
        } catch( ex ) {

            return responseServiceObj.sendException( res, {
                msg : ex.toString()
            } );
        }
    }

    updateUser( req, res, next ) {

        try {

            let in_id = req.params.id;
            let id = ObjectId( in_id );
            let in_data = req.body;
            let rules = {
                first_name: 'required',
                email: 'required|email',
                password: 'required|min:6',
                contact_number: 'required|min:10',
                role: 'required|in:ADMIN,SUB_ADMIN,CUSTOMER'
            };
            let validation = new Validator(in_data, rules);
            if( validation.fails() ) {

                return responseServiceObj.sendException( res, {
                    msg : responseServiceObj.getFirstError( validation )
                } );
            }
            
            UserServiceObj.isUserEmailExists( in_data.email, id )
            .then( async (isExists) => {
                if( isExists ) {
                    throw 'Email already exists.'
                }
                return true;
            } )
            .then( async (inResult) => {
                let isExists = await UserServiceObj.isUserContactNoExists( in_data.contact_number, id )
                if( isExists ) {
                    throw 'Contact number already exists.'
                }
                return true;
            } )
            .then( async (inResult) => {
                let result = await UserServiceObj.updateUser( in_data, id );
                return await responseServiceObj.sendResponse( res, {
                    msg : 'Record updated successfully',
                    data : {
                        user: await UserServiceObj.getUserById( id ),
                        userImagePath: userImagePath
                    }
                } );
            } )
            .catch( async (ex) => {
                return await responseServiceObj.sendException( res, {
                    msg : ex.toString()
                } );
            } );
            
        } catch( ex ) {

            return responseServiceObj.sendException( res, {
                msg : ex.toString()
            } );
        }
    }

    deleteUser( req, res, next ) {
        try {
            
            let id = ObjectId( req.params.id );
            UserServiceObj.isUserIdExists( id )
            .then( async (isExists) => {
                if( !isExists ) {
                    throw 'Invalid user id.'
                }
                return true;
            } )
            .then( async (inResult) => {
                let in_data = {
                    status: 'DELETED'
                };
                let result = await UserServiceObj.updateUser( in_data, id );
                return await responseServiceObj.sendResponse( res, {
                    msg : 'Record deleted successfully'
                } );
            } )
            .catch( async (ex) => {
                return await responseServiceObj.sendException( res, {
                    msg : ex.toString()
                } );
            } );
        } catch(ex) {
            cb( ex, null );
        }
    }

    getUserById( req, res, next ) {
        try {
            let id = req.params.id;
            let is_valid = ObjectId.isValid(id);
            if( !is_valid ) {
                throw 'User id not well formed.'
            }
            id = ObjectId( id );
            UserServiceObj.getUserById( id )
            .then( async (result) => {
                return await responseServiceObj.sendResponse( res, {
                    msg : 'Record found',
                    data : {
                        user: result,
                        userImagePath: userImagePath
                    }
                } );
            } )
            .catch( async (ex) => {
                return await responseServiceObj.sendException( res, {
                    msg : ex.toString()
                } );
            } );

        } catch(ex) {
    
            return res.send({
                status: 400,
                code: 400,
                msg: 'Exception occur',
                result: ex.toString()
            });
        }
    }

    getAllUser( req, res, next ) {

        try {

            UserServiceObj.getAllUser()
            .then( async (result) => {
                return await responseServiceObj.sendResponse( res, {
                    msg : 'Record found',
                    data : {
                        user: result,
                        userImagePath: userImagePath
                    }
                } );
            } )
            .catch( async (ex) => {
                return await responseServiceObj.sendException( res, {
                    msg : ex.toString()
                } );
            } );
        } catch( ex ) {

        }
    }

    changeProfilePic( req, res, next ) {
        try {
            let id = req.params.id;
            let is_valid = ObjectId.isValid(id);
            if( !is_valid ) {
                throw 'User id not well formed.'
            }
            id = ObjectId( id );

            UserServiceObj.isUserIdExists( id )
            .then( async (isExists) => {
                if( !isExists ) {
                    throw 'Invalid user id.'
                }
                return true;
            } )
            .then( async (inResult) => {

                let imageDetails = req.params.imageDetails;
                let in_data = {
                    profilePic : imageDetails.fullFileName,
                    updatedAt : new Date()
                };
                
                let result = await UserServiceObj.updateUser( in_data, id );
                return await responseServiceObj.sendResponse( res, {
                    msg : 'Profile pic uploaded successfully',
                    data : {
                        user: await UserServiceObj.getUserById( id ),
                        userImagePath: userImagePath
                    }
                } );
            } )
            .catch( async (ex) => {
                return await responseServiceObj.sendException( res, {
                    msg : ex.toString()
                } );
            } );

        } catch(ex) {
    
            return res.send({
                status: 400,
                code: 400,
                msg: 'Exception occur',
                result: ex.toString()
            });
        }
    }
}