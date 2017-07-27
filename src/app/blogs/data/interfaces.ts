export interface IBlog {
    id: number;
    title: string;
    imageID: string;
    subtitle: string;
    created: Date;
    lastAccess: Date;
    day: number;
    month: number;
    year: number;
    projectID: number;
    project: string;
}
export interface ITimeBlog {
    name: string;
    blogs?: IBlog[];
}
