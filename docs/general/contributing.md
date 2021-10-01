# Contributing

## Repository Setup

Leyden consists of multiple packages within a single [monorepo][leyden-repo]. All packages operations (installing dependencies, linting, build, etc) are executed from the repository root. To get started, clone the Leyden monorepo, install its dependencies, and build the packages.

```text
git clone git@github.com:1build/leyden.git
cd leyden
npm install
npm run build
```

## Running Examples

Until Leyden has a test suite, tinkering with the example is the primary method for testing new features.

Before running the examples, you must [set up the repository](#repository-setup). Then, install the example dependencies and serve them locally.

**Commands within the example project must be run with Yarn!**

```text
cd example
yarn install
yarn run start
```

### Update Leyden Version

Examples use the version of Leyden that was built within the repo at the time they started being served. To update the examples such that they utilize the Leyden source code present within your local repository, rebuild Leyden and refresh the example leyden version.

```text
npm run build
cd example
yarn run refreshLeyden
```

[leyden-repo]: https://github.com/1build/leyden
