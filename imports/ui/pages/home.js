import { Template } from 'meteor/templating';

import './home.html';
import '../components/list-rooms.js';
import '../components/modal-room-create.js';

import { Rooms } from '../../api/rooms/rooms.js';

Template.Home.helpers({
    CollectionRooms() {
        return Rooms;
    },
});