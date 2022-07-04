# figma-tokens &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE) [![npm](https://img.shields.io/npm/dt/figma-tokens.svg)](https://www.npmjs.org/package/figma-tokens) [![Gzip size](https://img.badgesize.io/https://unpkg.com/figma-tokens/?compression=gzip)](https://unpkg.com/figma-tokens/)

> A light tool for generate Figma design tokens as variables.

## 🚀 Installation

```sh
npm install figma-tokens --save-dev
```

## 🧐 How to use?

### Extract Figma tokens schema

```node
figma-tokens api
```

### Generate tokens as variables

Generate tokens as all plattforms tokens variables with a figma schema.

**Supported format:** `CSS` / `SCSS` / `LESS` / `JS` / `JSON`

```node
figma-tokens build
```

## 🤝 Requeriments

### Duplicate figma design tokens file

Duplicate and use the figma file to work with the token structure.

[📄 Figma file template](https://www.figma.com/file/IGr2xoqcZX91CU7CDr4ZsI)

![image](https://user-images.githubusercontent.com/1427623/92307873-c4dbdf00-ef99-11ea-9ca4-eb9baecff1e5.png)

### Get your figma file id

![image](https://user-images.githubusercontent.com/1427623/92307876-c73e3900-ef99-11ea-8df4-c9d41eae0ac9.png)

### Get your figma API key

https://www.figma.com/developers/api

![image](https://user-images.githubusercontent.com/1427623/92307890-dde49000-ef99-11ea-9a03-fd5cc725d9ab.png)

Modify config with your figma API key and figma id in `config.figma.json`

### Create config

Create a `config.figma.json` file and added your credentials.

```json
{
  "FIGMA_APIKEY": "Your Figma API key",
  "FIGMA_ID": "Your Figma file id"
}
```

Working on an npm package, you can look at this repository meanwhile :)

https://github.com/klaufel/pattern-library-skeleton/tree/master/src/figma-tokens

## License

[MIT License](LICENSE.md) © [Juan Carlos Ruiz](https://github.com/klaufel)
