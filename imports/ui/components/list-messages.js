import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';


import './list-messages.html';
import '../components/modal-room-create.js';

import { Messages } from '../../api/messages/messages.js';

Template.List_messages.helpers({
    messages(){
        return Messages.find({topicId: Session.get('currentTopic')}, { sort: { createdAt: 1 }})
    },
    sender () {
        let user = Meteor.users.findOne({_id: this.userId});
        return user.username;
    },
    isSender(){
        return this.userId === Meteor.userId();
    },
});


Template.List_messages.events({
    'keyup #text-message-input': function (e, t) {
        let value = e.target.value;
        if (e.keyCode === 13 && Meteor.userId() && !e.shiftKey && value.trim() ) {
            Messages.insert({text: value, topicId: Session.get('currentTopic')});
            e.target.value = '';
            $('.chat_area').scrollTop($('.chat_area')[0].scrollHeight);
        }
    },
    'keydown #text-message-input': function (e, t) {
        if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
        }
    }
});