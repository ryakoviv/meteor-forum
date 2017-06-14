import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import './home.html';
import '../components/list-rooms.js';
import '../components/modal-room-create.js';
import '../components/not-login.js';


import { Rooms } from '../../api/rooms/rooms.js';

Template.Home.onCreated(function() {
    Meteor.subscribe('rooms');
});

Template.Home.helpers({
    CollectionRooms() {
        return Rooms;
    },
});