import { Tracker } from 'meteor/tracker';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

export const Messages = new Mongo.Collection('messages');

Messages.attachSchema(new SimpleSchema({
    text: {
        type: String,
        label: 'Text'
    },
    topicId: {
        type: String,
        label: 'Id of topic',
        autoform: { type: "hidden" }
    },
    userId: {
        type: String,
        autoValue(){
            return this.userId;
        },
        autoform: { type: "hidden" }
    },
    createdAt: {
        type: Date,
        autoValue(){
            return new Date();
        },
        autoform: { type: "hidden" }
    },
}, {tracker: Tracker}));