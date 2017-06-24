import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';


import './list-messages.html';
import './list-messages-message.js';
import '../components/modal-room-create.js';

import { Messages } from '../../api/messages/messages.js';
import { Topics } from '../../api/topics/topics.js';

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
    isTyping(){
        let curTopic =  Topics.findOne({_id: Session.get('currentTopic')});
        let usersTyping = [];
        let typingText = '';
        curTopic.isTyping.forEach(function (el) {
            if (el!==Meteor.userId()){
                usersTyping.push(Meteor.users.findOne({_id: el}).username);
            }
        });
        if (usersTyping.length > 1){
            typingText = ' are typing...';
        }
        else if(usersTyping.length === 1){
            typingText = ' is typing...';
        }
        return usersTyping.join(', ') + typingText;
    },
    topicIsSelected(){
        return !!Session.get('currentTopic');
    }
});

let _timerIsTyping;

Template.List_messages.events({
    'keyup #text-message-input': function (e, t) {
        let value = e.target.value;
        let currentTopic = Session.get('currentTopic');
        _timerIsTyping = Meteor.setTimeout(function(){
            Topics.update({ _id: currentTopic },{ $pull: { isTyping: Meteor.userId() } });
        }, 10000);

        if (e.keyCode === 13 && Meteor.userId() && !e.shiftKey && value.trim() ) {
            Messages.insert({text: value, topicId: Session.get('currentTopic')});
            e.target.value = '';
        }
    },
    'keydown #text-message-input': function (e, t) {
        let currentTopic = Session.get('currentTopic');
        Meteor.clearTimeout(_timerIsTyping);
        Topics.update({ _id: currentTopic },{ $addToSet: { isTyping: Meteor.userId() } });
        if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
        }
    }
});