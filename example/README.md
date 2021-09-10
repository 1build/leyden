# Leyden Example

![Screenshot Capture - 2021-09-09 - 03-46-56](https://user-images.githubusercontent.com/3399889/132645410-b1b79ea7-f56e-40a6-ae20-cdb71d208c3b.png)


## Setup

1. Build Leyden packages (see instructions in [root README][root-readme]).
2. `yarn install` (**from example folder**)
3. `yarn start` (**from example folder**)
4. Navigate to [localhost:8081](http://localhost:8081/)

## Updating Leyden

This example does not automatically utilize the newest version of `leyden` and `leyden-react`. To use the version currently present in this repo, the libraries must be built and re-added to this project.

1. (Re)build Leyden packages (see instructions in [root README][root-readme]).
2. `yarn run refreshLeyden` (**from example folder**)

## Hot Reloading

To enable hot reloading, you may need to disable network caching. To do so, check the **Disable cache** checkbox in the **Network** DevTools tab of your browser.

## Troubleshooting

### Invalid Hook Call

`yarn` must be used to install the example's modules (**not npm**).

[root-readme]: https://github.com/1build/leyden/blob/main/README.md
