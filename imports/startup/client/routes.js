import { Router } from 'meteor/iron:router';

import '../../ui/pages/hello.js';
import '../../ui/layouts/layout.js';

Router.configure({
    layoutTemplate: 'Layout',
});

// Home page
Router.route('/', function () {
    this.render('Hello');
});

