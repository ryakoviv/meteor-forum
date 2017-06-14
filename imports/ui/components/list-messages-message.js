import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import './list-messages-message.html';


Template.List_messages_message.onRendered(function() {
    $('.chat_area').scrollTop($('.chat_area')[0].scrollHeight);
});

Template.List_messages_message.helpers({
    sender () {
        return Meteor.users.findOne({_id: this.userId});
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