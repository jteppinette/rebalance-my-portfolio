# Rebalance My Portfolio

[![pre-commit](https://github.com/jteppinette/rebalance-my-portfolio/actions/workflows/pre-commit.yml/badge.svg)](https://github.com/jteppinette/rebalance-my-portfolio/actions/workflows/pre-commit.yml)

![Rebalance My Portfolio - Overview Screenshot](./screenshots/overview.png)

## Development

### Required Software

- [direnv](https://direnv.net)
- [git](https://git-scm.com/)
- [nvm](https://formulae.brew.sh/formula/nvm#default)
- [pre-commit](https://pre-commit.com/#install)

### Getting Started

**Setup**

```sh
$ nvm install 16
$ direnv allow
$ pre-commit install
$ npm install
```

**Watch & Serve**

```sh
$ npm run dev
```

### Build

```sh
$ npm run build
```

### Analyze Bundle Size

```sh
$ npm run build -- --detailed-report
```
