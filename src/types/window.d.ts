// todo: figure out a way to remove `any`
declare global {
    interface Window {
        CDEKWidget?: new (config: any) => any;
    }
}

export {};
