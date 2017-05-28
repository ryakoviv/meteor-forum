import { AutoForm } from 'meteor/aldeed:autoform';
import { Session } from 'meteor/session';

AutoForm.addHooks(null, {
        onSuccess: function(insertDoc, updateDoc, currentDoc) {
            $('.modal').modal('hide');
        },
    }
);

AutoForm.addHooks('formTopicInsert', {before: {
        insert: function (doc) {
            doc.roomId = Session.get('currentRoom');
            console.log(doc);
            return doc;
        }
    }}
);
