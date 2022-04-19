import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import '../../ui/pages/home/home';
import '../../ui/pages/signUp/signUp';
import '../../ui/pages/menu/menu';
import '../../ui/pages/group/group';
import '../../ui/pages/manageGroup/manageGroup';
import '../../ui/pages/notFound/notFound';
import '../../ui/pages/test/test';



FlowRouter.route('/', {
    name: 'home',
    action() {
        this.render('home');
    },
});

FlowRouter.route('/sign-up', {
    name: 'signUp',
    action() {
        this.render('signUp');
    },
});

FlowRouter.route('/menu', {
    name: 'menu',
    action() {
        this.render('menu');
    },
});

FlowRouter.route('/group', {
    name: 'group',
    action() {
        this.render('group');
    },
});

FlowRouter.route('/manage-group', {
    name: 'manageGroup',
    action() {
        this.render('manageGroup');
    },
});

FlowRouter.route('/test', {
    action(){
        this.render('test');
    },
})

FlowRouter.route('*', {
    action(){
        this.render('notFound');
    },
});
