import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';


import './list-messages.html';
import './list-messages-message.js';
import '../components/modal-room-create.js';

import { Messages } from '../../api/messages/messages.js';

Template.List_messages.onCreated(function() {
    Meteor.subscribe('messages');
});

Template.List_messages.onRendered(function() {
    $('.chat_area').scrollTop($('.chat_area')[0].scrollHeight);
});

Template.List_messages.helpers({
    messages(){
        return Messages.find({topicId: Session.get('currentTopic')}, { sort: { createdAt: 1 }});
    },
    topicIsSelected(){
        return !!Session.get('currentTopic');
    }
});


Template.List_messages.events({
    'keyup #text-message-input': function (e, t) {
        let value = e.target.value;
        if (e.keyCode === 13 && Meteor.userId() && !e.shiftKey && value.trim() ) {
            Messages.insert({text: value, topicId: Session.get('currentTopic')});
            e.target.value = '';
            // $('.chat_area').scrollTop($('.chat_area')[0].scrollHeight);
        }
    },
    'keydown #text-message-input': function (e, t) {
        if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
        }
    }
});