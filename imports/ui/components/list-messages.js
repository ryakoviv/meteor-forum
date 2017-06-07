import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';


import './list-messages.html';
import '../components/modal-room-create.js';

import { Messages } from '../../api/messages/messages.js';

Template.List_messages.onCreated(function roomOnCreated() {
    Meteor.subscribe('messages');
});

Template.List_messages.helpers({
    messages(){
        let messages = Messages.find({topicId: Session.get('currentTopic')}, { sort: { createdAt: 1 }});
        // watch the cursor for changes
        let handle = messages.observe({
            added:function(order){
                $('.chat_area').scrollTop($('.chat_area')[0].scrollHeight);
            }
        });
        return messages;
    },
    sender () {
        let user = Meteor.users.findOne({_id: this.userId});
        return user.username;
    },
    isSender(){
        return this.userId === Meteor.userId();
    },
    timeFromNow(){
        return  moment(this.createdAt).fromNow();
    },
    timeCreatedAt(){
        return  moment(this.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a");
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