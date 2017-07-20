export interface IRoutesObject {
    title: string;
    route: string;
    routeOptions?: string;
    icon: string;
}
export const routes: IRoutesObject[] = [{
    title: 'Dashboard',
    route: '/',
    routeOptions: '{exact:true}',
    icon: 'home',
}, {
    title: 'Blogs section',
    route: '/blogs',
    routeOptions: '{exact:false}',
    icon: 'description',
}, {
    title: 'About',
    route: '/product',
    routeOptions: '{exact:false}',
    icon: 'face',
},
];
