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
        label: 'Description',
        autoform: {rows: 5}
    },
    createdAt: {
        type: Date,
        autoValue(){
            return new Date();
        },
        autoform: { type: "hidden" }
    },
    userId: {
        type: String,
        autoValue(){
            return this.userId;
        },
        autoform: { type: "hidden" }
    },
}, {tracker: Tracker}));

if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish tasks that are public or belong to the current user
    Meteor.publish('rooms', function roomsPublication() {
        return Rooms.find();
    });
}