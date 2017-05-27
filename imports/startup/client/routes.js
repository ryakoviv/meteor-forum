import { Router } from 'meteor/iron:router';

import '../../ui/pages/home.js';
import '../../ui/layouts/layout.js';

Router.configure({
    layoutTemplate: 'Layout',
});

// Home page
Router.route('/', function () {
    this.render('Home');
});

