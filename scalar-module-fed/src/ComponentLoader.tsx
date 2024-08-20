import React, { type ReactNode } from 'react';
import loadComponent from './utils/loadComponent';
import useDynamicScript from "./utils/useDynamicScript";


// more info https://oskari.io/blog/dynamic-remotes-module-federation/
const ComponentLoader = (args: {
    url: string;
    scope: string;
    module: string;
  }): JSX.Element => {
    const { url, scope, module } = args;

    const { ready, failed } = useDynamicScript({
      url: args && url,
    });

    if (!ready && !failed) {
      return <p>Loading</p>;
    }

    if (failed) {
      return <h2>Failed to load microfrontend from: {url}</h2>;
    }

    const Component = React.lazy(loadComponent(scope, module));

    return (
      <React.Suspense fallback={<p>Replace with loader</p>}>
        {Component && <Component />}
      </React.Suspense>
    );
  };

  export default ComponentLoader;
