var DoctorModel = require('../models').DoctorModel;
const { ObjectId } = require('mongodb');

module.exports = class PatientService {

    constructor() {}

    getAll( req, res, next, cb ) {
        try {

            DoctorModel.find( { status: { $ne: 'DELETED' } }, function( err, result ) {
                cb( err, result );
            } );    
        } catch(ex) {
            
            cb( ex, null );
        }
    }

    getById( req, res, next, cb ) {
        try {
            let id = ObjectId( req.params.id );
            DoctorModel.findOne( { _id: id, status: { $ne: 'DELETED' } }, function( err, result ) {
                cb( err, result );
            } );    
        } catch(ex) {
            
            cb( ex, null );
        }
    }

    insert( req, res, next, cb ) {
        try {
            let in_data = req.body;
            DoctorModel.create( in_data, function( err, result ) {
                cb( err, result );
            } );
        } catch(ex) {
            cb( ex, null );
        }
    }

    update( req, res, next, cb ) {
        try {
            
            let id = ObjectId( req.body.id );
            let in_data = req.body;
            DoctorModel.updateOne({ _id: req.body.id }, in_data, { multi: false }, function(err, result) {
                cb( err, result );
            });
        } catch(ex) {
            cb( ex, null );
        }
    }

    delete( req, res, next, in_data, cb ) {
        try {
            
            let id = ObjectId( req.params.id );
            DoctorModel.updateOne({ _id: id }, in_data, { multi: false }, function(err, result) {
                cb( err, result );
            });
        } catch(ex) {
            cb( ex, null );
        }
    }

    updateProfilePic( in_data, in_id, cb ) {
        try {
            let id = ObjectId( in_id );
            DoctorModel.updateOne({ _id: id }, in_data, { multi: false }, function(err, result) {
                cb( err, result );
            });
        } catch(ex) {
            cb( ex, null );
        }
    }
    
    isEmailExists( in_email, cb ) {
        try {
            DoctorModel.countDocuments( { email: in_email }, function( err, result ) {
                result > 0 ? cb( err, true ) : cb( err, false );
            } );    
        } catch(ex) {
            cb( ex, null );
        }
    }
}
