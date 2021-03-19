var DoctorService = require('../services').DoctorService;
var DoctorServiceObj = new DoctorService();
let Validator = require('validatorjs');
const { ObjectId } = require('mongodb');
var doctorsImagePath = require('../config/config').doctorsImagePath;

module.exports = class DoctorsController {

    constructor() {}

    getAll( req, res, next ) {
        try {
            DoctorServiceObj.getAll( req, res, next, function( err, result ) {
                
                if( err ) {

                    return res.send({
                        status: 200,
                        msg: 'Error',
                        data: err
                    });
                } else {

                    return res.send({
                        status: 200,
                        msg: 'Records found',
                        data: result,
                        doctorsImagePath: doctorsImagePath
                    });
                }
            } );
        } catch(ex) {
            console.log('catch');
    
            return res.send({
                status: 400,
                code: 400,
                msg: 'Exception occur',
                result: ex.toString()
            });
        }
    }

    getById( req, res, next ) {
        try {
            let is_valid = ObjectId.isValid(req.params.id);
            if( !is_valid ) {
                return res.send({
                    status: 200,
                    code: 422,
                    msg: 'Validation error: Invalid id'
                });
            }
            let id = ObjectId( req.params.id );
            DoctorServiceObj.getById( req, res, next, function( err, result ) {
                
                if( err ) {

                    return res.send({
                        status: 200,
                        msg: 'Error',
                        data: err
                    });
                } else {

                    return res.send({
                        status: 200,
                        msg: 'Records found',
                        data: result,
                        doctorsImagePath: doctorsImagePath
                    });
                }
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
    
    insert( req, res, next ) {
        try {
            let in_data = req.body;
            let rules = {
                name: 'required',
                address: 'required',
                email: 'required|email',
                password: 'required|min:6',
                age: 'required|numeric|min:1',
                mobile: 'required|numeric|min:1',
                status: 'required|in:OPEN,CLOSE,DELETED',
            };

            let validation = new Validator(in_data, rules);
            if( validation.fails() ) {
                let obj = validation.errors.all();
                let arr = [];
                for (const property in obj) {
                    console.log(`${property}: ${obj[property]}`);
                    arr.push(obj[property][0]);
                }
                return res.send({
                    status: 200,
                    code: 422,
                    msg: 'Validation error',
                    errObj: obj,
                    errArr: arr
                });
            }

            DoctorServiceObj.insert( req, res, next, function( err, result ) {
                if( err ) {
                    return res.send({
                        status: 400,
                        code: 400,
                        msg: 'Exception err occur',
                        data: err.toString()
                    });
                } else {

                    return res.send({
                        status: 200,
                        msg: 'Record inserted',
                        err: err,
                        result: result
                    });
                }
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

    update( req, res, next ) {
        try {
            let id = req.body.id;
            let in_data = req.body;

            let is_valid = ObjectId.isValid(req.body.id);
            if( !is_valid ) {
                return res.send({
                    status: 200,
                    code: 422,
                    msg: 'Validation error: Invalid id'
                });
            }

            // let rules = {
            //     id: 'required|numeric|min:1'
            // };
            let rules = {};

            in_data['name'] ? rules['name'] = 'required' : '' ;
            in_data['address'] ? rules['address'] = 'required' : '' ;
            in_data['email'] ? rules['email'] = 'required|email' : '' ;
            in_data['password'] ? rules['password'] = 'required|min:6' : '' ;
            in_data['age'] ? rules['age'] = 'required|min:1' : '' ;
            in_data['mobile'] ? rules['mobile'] = 'required|min:1' : '' ;
            in_data['status'] ? rules['status'] = 'required|in:OPEN,CLOSE,DELETED' : '' ;

            let validation = new Validator(in_data, rules);
            if( validation.fails() ) {
                let obj = validation.errors.all();
                let arr = [];
                for (const property in obj) {
                    console.log(`${property}: ${obj[property]}`);
                    arr.push(obj[property][0]);
                }
                return res.send({
                    status: 200,
                    code: 422,
                    msg: 'Validation error',
                    errObj: obj,
                    errArr: arr
                });
            }

            DoctorServiceObj.update( req, res, next, function( err, result ) {
                if( err ) {
                    return res.send({
                        status: 400,
                        code: 400,
                        msg: 'Exception err occur',
                        data: err.toString()
                    });
                } else {

                    return res.send({
                        status: 200,
                        msg: 'Record updated',
                        err: err,
                        result: result
                    });
                }
            } );

        } catch(ex) {
            console.log('catch');
    
            return res.send({
                status: 400,
                code: 400,
                msg: 'Exception occur',
                result: ex.toString()
            });
        }
    }

    delete( req, res, next ) {
        try {
            let id = req.params.id;
            
            let is_valid = ObjectId.isValid(req.params.id);
            if( !is_valid ) {
                return res.send({
                    status: 200,
                    code: 422,
                    msg: 'Validation error: Invalid id'
                });
            }

            let dated = new Date();
            let in_data = {
                status : 'DELETED',
                deletedAt: dated
            };

            DoctorServiceObj.delete( req, res, next, in_data, function( err, result ) {
                if( err ) {
                    return res.send({
                        status: 400,
                        code: 400,
                        msg: 'Exception err occur',
                        data: err.toString()
                    });
                } else {

                    return res.send({
                        status: 200,
                        msg: 'Record deleted',
                        err: err,
                        result: result
                    });
                }
            } );
        } catch(ex) {
            console.log('catch');
    
            return res.send({
                status: 400,
                code: 400,
                msg: 'Exception occur',
                result: ex.toString()
            });
        }
    }

    deleteHard( req, res, next ) {
        try {
            let id = req.params.id;
            Patient.destroy({ where: { id: id } })
            .then((result) => {

                if (result === null) {
    
                    return res.send({
                        status: 200,
                        code: 404,
                        msg: 'Record not deleted',
                        data: result
                    });
                } else {
    
                    return res.send({
                        status: 200,
                        code: 200,
                        msg: 'Record deleted successfully',
                        data: result
                    });
                }
            })
            .catch((error) => {

                res.send({
                    status: 400,
                    code: 400,
                    msg: 'Exception occur',
                    data: error.toString()
                });
            });

        } catch(ex) {
            console.log('catch');
    
            return res.send({
                status: 400,
                code: 400,
                msg: 'Exception occur',
                result: ex.toString()
            });
        }
    }

    uploadProfilePic( req, res, next ) {
        try {

            let id = req.body.id;
            let is_valid = ObjectId.isValid(req.body.id);
            if( !is_valid ) {
                return res.send({
                    status: 200,
                    code: 422,
                    msg: 'Validation error: Invalid id'
                });
            }
            let imageDetails = req.params.imageDetails;
            let in_data = {
                profilePic : imageDetails.fullFileName,
                updatedAt : new Date()
            };

            DoctorServiceObj.updateProfilePic( in_data, id, function( err, result ) {
                if( err ) {
                    return res.send({
                        status: 400,
                        code: 400,
                        msg: 'Exception err occur',
                        data: err.toString()
                    });
                } else {

                    return res.send({
                        status: 200,
                        msg: 'Record updated',
                        err: err,
                        result: result
                    });
                }
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