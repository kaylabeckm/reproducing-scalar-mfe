# Reproducing a Scalar issue with Module Federation.


This is a monorepo with two projects in it.

## Scalar Module Fed

This is a shell/host app that resolves a remote using module federation.

Run npm start and the app is served with webpack to localhost:8080

## Scalar Remote Module

This is a remote app that includes a scalar api reference page.

Run npm start and the app is served with webpack to localhost:8081

## The issue

The Scalar API reference page works, but it cannot use the Test Request feature. It gets an error about the module for axios.
If I remove the axios dependency from the Scalar Remote Module, then the Test Request feature does work, but in the non-minimal version of our use case we do need to use axios outside of the api reference component.
