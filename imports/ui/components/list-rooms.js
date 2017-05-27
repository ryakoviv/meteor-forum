import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { AutoForm } from 'meteor/aldeed:autoform';

import './list-rooms.html';
import './modal-room-update.js';

import { Rooms } from '../../api/rooms/rooms.js'

Template.List_rooms.helpers({
    rooms() {
        return Rooms.find({});
    },
});

Template.List_rooms.onCreated(function () {
    if (!this.data.collection){
        throw new Meteor.Error('You must provide parameter collection');
    }
});

Template.List_rooms.events({
    'click [data-role="room-card-actions-remove"]'(event, tmpl) {
        Rooms.remove({_id: this._id});
    },

    'click [data-role="room-card-actions-update"]'(event, tmpl) {
        AutoForm.resetForm('formRoomUpdate');
        Session.set('sessionRoomUpdate',this);
    },
});