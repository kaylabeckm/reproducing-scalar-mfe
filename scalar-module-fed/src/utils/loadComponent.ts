// https://webpack.js.org/concepts/module-federation/#dynamic-remote-containers
function loadComponent(scope: string, module: string) {
    return async () => {
        // @ts-expect-error
        // Initializes the share scope. This fills it with known provided modules from this build and all remotes
        await __webpack_init_sharing__('default');
        // @ts-expect-error
        const container = window[scope]; // or get the container somewhere else
        // Initialize the container, it may provide shared modules
        // @ts-expect-error
        await container.init(__webpack_share_scopes__.default);
        // @ts-expect-error
        const factory = await window[scope].get(module);
        const Module = factory();
        return Module;
    };
}
export default loadComponent;
