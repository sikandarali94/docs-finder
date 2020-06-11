import { LogoPathsModel } from '../models/models';

export enum Technologies {
    Angular = 'Angular',
    JS = 'JavaScript',
    PHP = 'PHP',
    React = 'React Redux',
    Vue = 'VueJS'
}

export const LogoPaths: LogoPathsModel =  {
    [Technologies.Angular]: './assets/img/angular.png',
    [Technologies.JS]: './assets/img/javascript.png',
    [Technologies.PHP]: './assets/img/php.png',
    [Technologies.React]: './assets/img/react.png',
    [Technologies.Vue]: './assets/img/vue.svg'
}
