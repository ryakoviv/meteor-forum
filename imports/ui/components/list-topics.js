import { Template } from 'meteor/templating';


import './list-topics.html';

import { Topics } from '../../api/topics/topics.js';

// Template.List_topics.onCreated(function () {
//     console.log(this);
// });

Template.List_topics.helpers({
    topics() {
        return Topics.find({roomId: this.room});
    }
});