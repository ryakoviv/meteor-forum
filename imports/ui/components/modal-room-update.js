import { Template } from 'meteor/templating';
import { AutoForm } from 'meteor/aldeed:autoform';
import { Session } from 'meteor/session';

import './modal-room-update.html';


// AutoForm.hooks({
//     formRoomUpdate: {
//         onSuccess: function(insertDoc, updateDoc, currentDoc) {
//             $('.modal').modal('hide');
//         },
//     }
// });

Template.Modal_room_update.onCreated(function () {
    if (!this.data.modal){
        throw new Meteor.Error('You must provide parameter modal');
    }
    // this.data.formId = 'formRoomUpdate';
});

Template.Modal_room_update.helpers({
    updateRoom(){
        return Session.get('sessionRoomUpdate');
    }
});

Template.Modal_room_update.events({
    'hidden.bs.modal .modal'(event, tmpl) {
        let tmplData = tmpl.data;
        if (event.currentTarget.id === tmplData.modal){
            AutoForm.resetForm(tmplData.formid);
        }
    },
});