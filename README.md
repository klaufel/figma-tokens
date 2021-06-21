# figma-tokens

Working on an npm package, you can look at this repository meanwhile :)

[https://github.com/klaufel/pattern-library-skeleton/tree/master/src/figma-tokens](https://github.com/klaufel/pattern-library-skeleton/tree/master/src/figma-tokens)

## 🤝 Requeriments

### Duplicate figma design tokens file

Figma file: [https://www.figma.com/file/IGr2xoqcZX91CU7CDr4ZsI](https://www.figma.com/file/IGr2xoqcZX91CU7CDr4ZsI)

![image](https://user-images.githubusercontent.com/1427623/92307873-c4dbdf00-ef99-11ea-9ca4-eb9baecff1e5.png)

### Get your figma file id

![image](https://user-images.githubusercontent.com/1427623/92307876-c73e3900-ef99-11ea-8df4-c9d41eae0ac9.png)

### Get your figma API key

[https://www.figma.com/developers/api](https://www.figma.com/developers/api)

![image](https://user-images.githubusercontent.com/1427623/92307890-dde49000-ef99-11ea-9a03-fd5cc725d9ab.png)

Install dependencies

```sh
 npm install --save-dev figma-tokens
```

Modify config with your figma API key and figma id \$ figma.config.json

Create config

![image](https://user-images.githubusercontent.com/1427623/92307902-f3f25080-ef99-11ea-94e4-69a06c0ad35a.png)

### Generate design tokens as variables

#### Add scripts

```json
{
  "figma-tokens": "npm run figma-tokens:api && npm run figma-tokens:build",
  "figma-tokens:api": "./node_modules/figma-tokens/bin/figma-tokens-api",
  "figma-tokens:build": "./node_modules/figma-tokens/bin/figma-tokens-build"
}
```

```sh
npm run figma-tokens
```

#### Generate tokens data base (only figma)

```sh
npm run figma-tokens:api 
```

#### Generate all plattforms tokens vars with a figma data base

```sh
npm run figma-tokens:build
```

## **😊 Enjoy!**
