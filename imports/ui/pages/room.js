import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';


import './room.html';
import '../components/modal-room-create.js';
import '../components/list-topics.js';

import { Topics } from '../../api/topics/topics.js';
import { Rooms } from '../../api/rooms/rooms.js';

Template.Room.onRendered(function () {
    Session.set('currentRoom',  this.data.currentRoom);
});

Template.Room.onDestroyed(function () {
    Session.set('currentRoom',  null);
});

Template.Room.helpers({
    room() {
        return Rooms.findOne({_id: this.currentRoom});
    },
    CollectionTopics() {
        return Topics;
    }
});