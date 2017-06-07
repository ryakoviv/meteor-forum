import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import './home.html';
import '../components/list-rooms.js';
import '../components/modal-room-create.js';

import { Rooms } from '../../api/rooms/rooms.js';

Template.Home.onCreated(function homeOnCreated() {
    Meteor.subscribe('rooms');
    Meteor.subscribe('users');
});

Template.Home.helpers({
    CollectionRooms() {
        return Rooms;
    },
});