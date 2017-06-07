import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';


import './list-topics.html';

import { Topics } from '../../api/topics/topics.js';
import { Rooms } from '../../api/rooms/rooms.js';

Template.List_topics.onCreated(function () {
    Session.set('currentTopic', undefined);
});

// Template.List_topics.onRendered(function () {
//     console.log('.chat_area');
// });

Template.List_topics.helpers({
    CollectionTopics() {
        return Topics;
    },
    topics() {
        return Topics.find({roomId: this.room});
    },
    isOwner(){
        let room = Rooms.findOne({_id: this.room});
        return room.userId === Meteor.userId();
    },
});


Template.List_topics.events({
    'click .member_list li'(e){
        $('.member_list li').removeClass('active');
        $(e.currentTarget).addClass('active');
        Session.set('currentTopic', this._id);
    },
});