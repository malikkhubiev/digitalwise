declare module '*.less' {
    const resource: { [key: string]: string };
    export = resource;
}
declare module '*.svg' {
    const content: string;
    export default content;
}
declare module '*.png' {
    const content: string;
    export default content;
}
declare module '*.jpg' {
    const content: string;
    export default content;
}