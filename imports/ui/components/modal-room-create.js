import { Template } from 'meteor/templating';
import { AutoForm } from 'meteor/aldeed:autoform';
//
import './modal-room-create.html';


Template.Modal_room_create.onCreated(function () {
    if (!this.data.modal){
        throw new Meteor.Error('You must provide parameter modal');
    }
});


Template.Modal_room_create.events({
    'hidden.bs.modal .modal'(event, tmpl) {
        let tmplData = tmpl.data;
        if (event.currentTarget.id === tmplData.modal){
            AutoForm.resetForm(tmplData.formid);
        }
    },
});