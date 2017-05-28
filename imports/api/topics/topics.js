import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

export const Topics = new Mongo.Collection('topics');

Topics.attachSchema(new SimpleSchema({
    title: {
        type: String,
        label: 'Title'
    },
    roomId:{
        type: String,
        label: 'Id of room',
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