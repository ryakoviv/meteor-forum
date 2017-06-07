import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { AutoForm } from 'meteor/aldeed:autoform';
import { Router } from 'meteor/iron:router';

import './list-rooms.html';
import './modal-room-update.js';

import { Rooms } from '../../api/rooms/rooms.js'
import { Topics } from '../../api/topics/topics.js'

Template.List_rooms.helpers({
    isOwner(){
        return this.userId === Meteor.userId();
    },
    rooms() {
        return Rooms.find({});
    },
    organizer () {
        let user = Meteor.users.findOne({_id: this.userId});
        return user.username;
    },
    dateCreatedAt(){
        return  moment(this.createdAt).format("MM-DD-YYYY, h:mm:ss a");
    }
});

Template.List_rooms.onCreated(function () {
    if (!this.data.collection){
        throw new Meteor.Error('You must provide parameter collection');
    }
});

Template.List_rooms.events({
    'click [data-role="room-card-actions-remove"]'(event, tmpl) {
        Rooms.remove({_id: this._id});
        // TODO need delete related topics
        // Topics.remove({roomId: this._id});???????????????????????????
    },

    'click [data-role="room-card-actions-update"]'(event, tmpl) {
        AutoForm.resetForm('formRoomUpdate');
        Session.set('sessionRoomUpdate',this);
    },

    'click [data-role="room-card-actions-chose"]'(event, tmpl) {
        Router.go('/'+this._id);
    },
});