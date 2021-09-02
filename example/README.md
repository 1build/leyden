# Datum Example

![Screenshot Capture - 2021-08-24 - 23-56-04](https://user-images.githubusercontent.com/3399889/130724121-6ca9cdf5-156d-4a1c-b6a0-416dc08335c1.png)

## Setup

1. Build Datum packages (see instructions in [root README][root-readme]).
2. `yarn install` (**from example folder**)
3. `yarn start` (**from example folder**)
4. Navigate to [localhost:8081](http://localhost:8081/)

## Updating Datum

This example does not automatically utilize the newest version of `datum` and `datum-react`. To use the version currently present in this repo, the libraries must be built and re-added to this project.

1. (Re)build Datum packages (see instructions in [root README][root-readme]).
2. `yarn run refreshDatum` (**from example folder**)

## Hot Reloading

To enable hot reloading, you may need to disable network caching. To do so, check the **Disable cache** checkbox in the **Network** DevTools tab of your browser.

## Troubleshooting

### Invalid Hook Call

`yarn` must be used to install the example's modules (**not npm**).

[root-readme]: https://github.com/1build/datum/blob/main/README.md
