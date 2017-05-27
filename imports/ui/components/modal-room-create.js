import { Template } from 'meteor/templating';
import { AutoForm } from 'meteor/aldeed:autoform';

import './modal-room-create.html';

AutoForm.hooks({
    formRoomInsert: {
        onSuccess: function(insertDoc, updateDoc, currentDoc) {
            $('.modal').modal('hide');
        },
    }
});


Template.Modal_room_create.onCreated(function () {
    if (!this.data.modal){
        throw new Meteor.Error('You must provide parameter modal');
    }
    this.data.formId = 'formRoomInsert';
});


Template.Modal_room_create.events({
    'hidden.bs.modal .modal'(event, tmpl) {
        let tmplData = tmpl.data;
        if (event.currentTarget.id === tmplData.modal){
            AutoForm.resetForm(tmplData.formId);
        }
    },
});