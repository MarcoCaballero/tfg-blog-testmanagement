
export interface IUser {
    displayName: string;
    id: string;
    email: string;
    created: Date;
    lastAccess: Date;
    siteAdmin: number;
}
export interface IBlog {
    id: number;
    title: string;
    imageID: string;
    subtitle: string;
    created: Date;
    lastAccess: Date;
    projectID: number;
    project: string;
}
