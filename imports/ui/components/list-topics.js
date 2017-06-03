import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';


import './list-topics.html';

import { Topics } from '../../api/topics/topics.js';
import { Messages } from '../../api/messages/messages.js';

Template.List_topics.onCreated(function () {
    Session.set('currentTopic', undefined);
});

Template.List_topics.onRendered(function () {
    console.log('.chat_area');
});

Template.List_topics.helpers({
    topics() {
        return Topics.find({roomId: this.room});
    },
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
    topicIsSelected(){
        return !!Session.get('currentTopic');
    }
});


Template.List_topics.events({
    'click .member_list li'(e){
        $('.member_list li').removeClass('active');
        $(e.currentTarget).addClass('active');
        Session.set('currentTopic', this._id);
    },
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