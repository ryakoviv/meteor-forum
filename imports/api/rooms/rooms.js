import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

export const Rooms = new Mongo.Collection('rooms');

Rooms.attachSchema(new SimpleSchema({
    title: {
        type: String,
        label: 'Title'
    },
    desc: {
        type: String,
        label: 'Description'
    },
    createdAt: {
        type: Date,
        autoValue(){
            return new Date();
        },
        autoform: { type: "hidden" }
    },
}, {tracker: Tracker}));