# React from Scratch

## Contents

- [React from Scratch](#react-from-scratch)

  - [Contents](#contents)

    - [Part 1: Basic React Setup](#part-1-basic-react-setup)

      - [Step 1: Use this template](#step-1-use-this-template)
        - [1. Initialise NPM](#1-initialise-npm)
        - [2. Install the eslint plugin](#2-install-the-eslint-plugin)
        - [3. Edit ESLint Configuration](#3-edit-eslint-configuration)
      - [Step 2: Install and Configure Babel](#step-2-install-and-configure-babel)
        - [1. Install Babel core and loader](#1-install-babel-core-and-loader)
        - [2. Install Babel presets](#2-install-babel-presets)
        - [2. Configure Babel](#2-configure-babel)
      - [Step 3: Install and Configure Webpack](#step-3-install-and-configure-webpack)
        - [1. Install Webpack](#1-install-webpack)
        - [2. Configure Webpack](#2-configure-webpack)
      - [Step 3: Set up React](#step-3-set-up-react)
        - [1. Install React](#1-install-react)
        - [2. Create React files](#2-create-react-files)
        - [3. Setup basic React](#3-setup-basic-react)
        - [4. Final React configurations](#4-final-react-configurations)
        - [5. Test the Basic React webpage](#5-test-the-basic-react-webpage)
        - [6. Further configurations](#6-further-configurations)
          - [6.1 Configure dev server settings](#6.1-configure-dev-server-settings)
          - [6.2 Configure Code-Splitting](#6.2-configure-code-splitting)
          - [6.3 Configure HTML](#6.3-configure-html)
          - [6.4 Configure ChunkHash](#6.4-configure-chunkHash)
          - [6.5 Configure Hot Module Replacement (HMR)](<#6.5-configure-hot-module-replacement-(hmr)>)

    - [Part 2: Configure Styling and Images](#part-2-configure-styling-and-images-1)
      - [Step 1. Set up CSS](#step-1-set-up-css)
        - [1. Setup CSS Loader](#1-setup-css-loader)
        - [2a. Configurations if using just CSS](#2a-configurations-if-using-just-css)
        - [2b. Configurations if using SASS](#2b-configurations-if-using-sass)
      - [Step 2: Basic Express Server Setup](#step-2-basic-express-server-setup)

  [Further Reading](#further-reading)

  - [Babel:](#babel)
  - [CSS:](#css)
  - [ECMAScript:](#ecmascript)
  - [Express:](#express)
  - [React:](#react)
  - [Webpack:](#webpack)

  [Version Reference](#version-reference)

<br/><br/><br/>

# Part 1: Basic React Setup

## Step 1: Use this template

<br/>

### 1. Initialise NPM

<br/>

```
npm init
```

Answer all questions, or use `npm init --y` to take all defaults

It has config files for Editor Config, ESLint and Prettier
<br/><br/>

### 2. Install the eslint and plugins

<br/>

```bash
npm install --save-dev acorn
npm install -–save-dev eslint eslint-plugin-react
npm install --save-dev eslint eslint-plugin-json
npm install --save-dev eslint-plugin-prettier
npm install --save-dev --save-exact prettier
```

where:

| Library              | Description / Link                      |
| -------------------- | --------------------------------------- |
| eslint:              | Linting                                 |
|                      | _[homepage](https://eslint.org/)_       |
| eslint-plugin-react: | React-specific linting rules for eslint |
|                      | _[link](eslint-plugin-react)_           |

<br/><br/>

### 3. Edit ESLint Configuration

- Add the following in the `.eslintrc.json` file:

<br/>

```json
{
  "extends": [
    "eslint: recommended", 
    "plugin:react/recommended",
    "plugin:json/recommended"
  ]
}
```

More details _[here](https://github.com/yannickcr/eslint-plugin-react#recommended)_.

<br/><br/>

## Step 2: Install and Configure Babel

<br/>

### 1. Install Babel core and loader

```
npm install --save-dev @babel/core@7.11.6 babel-loader@8.1.0 @babel/preset-env@7.15.8 @babel/preset-react@7.14.5
```

where:
| Library | Description / Link |
| ------------- | ------------ |
| @babel-core: | Babel core library (does nothing on its own) |
| | _[link](https://babeljs.io/docs/en/6.26.3/babel-core)_ |
| babel-loader: | Lets Webpack talk to Babel |
| | _[homepage](https://github.com/babel/babel-loader)_ |

<br/>

### 2. Install Babel presets

```
npm install --save-dev @babel/preset-env@7.11.5 @babel/preset-react@7.10.4
```

where:
| Library | Description / Link |
| -------------------- | ------------ |
| @babel-preset-env: | Babel preset for all ES6 plugins |
| | _[link](https://babeljs.io/docs/en/6.26.3/babel-preset-env)_ |
| @babel-preset-react: | Babel preset for React |
| | _[link](https://babeljs.io/docs/en/6.26.3/babel-preset-react)_ |

<br/><br/>

### 2. Configure Babel

- Create `.babelrc` file at project root.

- Add babel presets:

`.babelrc:`

```
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ]
}
```

- You should end up with the following folder structure:

```
<project_root>
|-- .babelrc
|-- .eslintrc.json
|-- package.json

```

<br/><br/>

## Step 3: Install and Configure Webpack

<br/>

### 1. Install Webpack

```
npm install --save-dev webpack@5.57.1 webpack-cli@4.8.0 webpack-dev-server@4.3.1 rimraf path
```

where:
| Library | Description / Link |
| ------------------- | ------------ |
| webpack: | Webpack core library |
| | _[homepage](https://webpack.js.org/)_ `|` _[npm](https://www.npmjs.com/package/webpack)_ |
| webpack-cli: | Webpack utility that a set of tools to improve the setup of custom webpack configuration |
| | _[home](https://webpack.js.org/api/cli/)_ `|` _[npm](https://webpack.js.org/api/cli/)_ |
| webpack-dev-server: | Development server for Webpack that provides live reloading and other utilities |
| | _[npm](https://www.npmjs.com/package/webpack-dev-server)_ |
|rimraf|A Node. js module that provides asynchronous deep- deletion of files and directories.|
|| _[github](https://github.com/isaacs/rimraf)_ `|` _[npm](https://www.npmjs.com/package/rimraf)_|

<br/><br/>

### 2. Configure Webpack

- Create `webpack.config.js` at project root.

- Specify the entry point and the output:

`webpack.config.js:`

```js
const path = require("path");

var config = {
  entry: {
    bundle: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
};

module.exports = config;
```

- Add Babel configuration:

`webpack.config.js:`

```js
  module: {
    rules: [
      {
      use: "babel-loader",
      test: /\.js$/,
      exclude: /node_modules/
      }
    ]
  }
}
```

- Make provisions for vendor libraries

`webpack.config.js:`

```js
const VENDOR_LIBS = [];

var config = {
  ...
  entry: {
    bundle: "./src/index.js",
    vendor: VENDOR_LIBS
  }
}
```

- You should end up with the following folder structure:

```
<project_root>
|-- .babelrc
|-- package.json
|-- webpack.config.js

```

## Step 3: Set up React

### 1. Install React

```
npm install --save react@17.0.2 react-dom@17.0.2
```

where:
| Library | Description / Link |
| ---------- | ------------ |
| react: | React library |
| | _[homepage](https://reactjs.org/)_ |
| react-dom: | Serves as the entry point to the DOM and server renderers for React |
| | _[link](https://www.npmjs.com/package/react-dom)_ |

<br/><br/>

### 2. Create React files

- In project root, create `src` directory, then create `index.js`, `app.js` inside that.
- Also in project root, create a directory named `public` and create `index.html` inside that.

Folder structure:

```
<project_root>
|-- .babelrc
|-- package.json
|-- webpack.config.js
|-- public
  |-- index.html
|-- src
  |-- app.js
  |-- index.js
```

### 3. Setup basic React

- Setup HTML file,...

`public/index.html:`

```html
<!DOCTYPE html>
  <head></head>
  <body>
    <div id="root"></div>
    <script src="../dist/bundle.js"></script>
  </body>
</html>
```

- ...the script,

`src/index.js:`

```js
import React from "react";
import ReactDOM from "react-dom";

import App from "./app";

ReactDOM.render(<App />, document.getElementById("root"));
```

- ...and a basic application script to display something

`src/app.js`

```js
import React from "react";

const greeting = (firstname, lastname) => {
  return (
    <p>
      My name is {firstname} {lastname}
    </p>
  );
};

function App() {
  return (
    <div className="App">
      <h2>Hello! World!</h2>
      {greeting("John", "Smith")}
    </div>
  );
}

export default App;
```

- Now add the libraries to the Webpack configuration file

`webpack.config.js:`

```js
const VENDOR_LIBS = ["react", "react-dom"];
  ...
entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS
  },
```

### 4. Final React configurations

- Configure NPM run scripts

`package.json:`

```json
...
"scripts" {
  "clean": "rimraf './dist/*'",
  "build": "npm run clean && webpack --mode production",
  "serve:dev": "webpack-dev-server"
}
```

### 5. Test the Basic React webpage

- Run a build

```bash
> npm run build
```

You should see a `dist` folder in the project root containing files.

<br/>

- Open `./src/index.html` in your web browser.

  You should be able to see "Greetings" and a name displayed

<br/>

### 6. Webpack Bundling Configurations

<br/>

#### 6.1 Configure dev server settings

`webpack.config.js`

```js
devServer: {
  publicPath: "/",
  port: 3000,
  },
```

<br/>

#### 6.2 Configure Code-Splitting

`webpack.config.js`

```js
optimization: {
  splitChunks: {
    chunks: "all",
  },
},
```

<br/>

#### 6.3 Configure HTML

Install `HTMLWebpackPlugin`

```bash
npm install --save-dev html-webpack-plugin
```

`webpack.config.js`

```js
const webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");

...

var config = {

...

plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
  ],

...

}
```

<br/>

#### 6.4 Configure ChunkHash

`webpack.config.js`

```js
output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "[name].[fullhash]-[id].js",
  },
```

<br/>

#### 6.5 Configure Hot Module Replacement (HMR)

Install `react-hot-loader`:

```bash
npm install --save react-hot-loader
```

where:
| Library | Description / Link |
| ---------- | ------------ |
| react-hot-loader: | Enables automatic reloading of React components without loss of state |
| | _[homepage](<[react-hot-loader](https://github.com/gaearon/react-hot-loader)>)_ |

Make changes to webpack configuration:

`package.json`

```json
"scripts": {
  "serve:dev": "webpack-dev-server --hot",
}
```

- Run the dev server

```bash
> npm run serve:dev
```

Browse to _[http://localhost:3000](http://localhost:3001)_

You should see "Hello World" displayed on your browser

Also, if you run `npm run build` and open `dist/index.html` directly in your browser, you will see the same webpage displayed

<br/><br/>

# Part 2: Configure Styling and Images
You can choose to use one of two common methods for loading css files:

- style-loader: Takes CSS you've imported in your JavaScript files, and injects them as `<style></style>` tags into the DOM.
<br/><br/>
- mini-css-extract-plugin: Generates a CSS file for each JS file that imports CSS.

<br/>


## Step 1. Set up CSS

_(optional. skip if creating backend APIs)_

### 1. Setup CSS Loader

```bash
npm install -–save-dev css-loader
```

where:
| Library | Description / Link |
| ----------- | ------------ |
| css-loader: | Enables Webpack to import and parse CSS files. <br/> Does not do anything with it. |
| | _[link](https://webpack.js.org/loaders/css-loader/)_ |

`webpack.config.js:`

```js
module: {
  rules: [
    {
      use: ["css-loader"],
      test: /\.css$/,
    },
  ];
}
```

Choose one from the two options:

### 2a. Pure CSS Configuration: style-loader

Install style-loader:

```bash
npm install --save-dev style-loader
```

where:
| Library | Description / Link |
| ------------ | ----------- |
| style-loader: | Injects CSS into the `<style>` tag of the HTML document |
| | _[link](https://webpack.js.org/loaders/style-loader/)_ |

<br/>

Webpack configuration:

`webpack.config.js:`

```js
module: {
  rules: [
    {
      use: ["style-loader", "css-loader"], //note the sequence!
      test: /\.css$/,
    },
  ],
}
```

### 2b. Pure CSS Configuration: mini-css-extract-plugin

Install mini-css-extract-plugin:

```bash
npm install --save-dev mini-css-extract-plugin
```

where:
| Library | Description / Link |
| ------------ | ----------- |
| mini-css-extract-plugin: | Extracts and creates a separate CSS file for each JS file. <br/> Supports CSS On-Demand-Loading and SourceMaps. <br/> Replaces [extract-text-webpack-plugin](https://www.npmjs.com/package/extract-text-webpack-plugin) |
| | _[link](https://webpack.js.org/plugins/mini-css-extract-plugin/)_ |

<br/>

Webpack configuration:

`webpack.config.js:`

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

...


  plugins: [new MiniCssExtractPlugin()],

...

  module: {
    rules: [
    {
      use: [
        MiniCssExtractPlugin.loader,
        "css-loader"
      ],
    test: /\.css$/
    },
    ],
  }.

```

### 3. Add styling to the Webpage

- Create root folder `styles` and `styles.css` inside that, then create some basic styling:

`styles/styles.css`

```css
body {
  color: ivory;
  background-color: darkslategray;
}
```

`src/app.js`

```js
import "../styles/styles.css";
```

Run the dev server or Rebuild the webpage. You should see a change in the text and background colour.

- To run the dev server

```bash
> npm run serve:dev
```
<br/>

- To run a build

```bash
> npm run build
```


## Step 2. Configuring SASS (optional)

```
npm install -–save-dev  node-sass sass-loader
```

where:
| Library | Description / Link |
| ------------ | ------------ |
| node-sass: | |
| | _[link](https://github.com/sass/node-sass)_ \| _[npm](https://www.npmjs.com/package/node-sass)_ |
| sass-loader: | |
| | _[link](https://github.com/webpack-contrib/sass-loader)_ \| _[npm](https://www.npmjs.com/package/sass-loader)_ |

<br/>

`webpack.config.js:`

```js
rules: [
  {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      'style-loader',
      // Translates CSS into CommonJS
      'css-loader',
      // Compiles Sass to CSS
      'sass-loader',
    ],
  },
],
```

3. Configure Images

```
npm install --save-dev image-webpack-loader url-loader
```

`webpack.config.js:`

```js
rules: [
  test: /\.(jpe?g|png|gif|svg)$/,
  use: [
  {
  'url-loader',
  options: { limit: 40000 }
  },
  'image-webpack-loader'
  ]
]
```

## Step 3. Configuring CSS Modules (optional)

<br/><br/>

# Configure Environment Variables for React

## Step 1. Create Environment Variables Files

We need separate `.env.*` files for different environments. The environment type is set in the `package.json` script. This determines which `.env` file is loaded.

At project root, create `.env`, `.env.production` and `.env.development`. Place your environment variables inside. Use the sample file as a guide.
<br/><br/>


## Step 2. Refactor `webpack.config.js`

Change from:

`webpack.config.js`

```js
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

...

var config = {
  entry: {
    ...
  },
  output: {
    ...
  }
};

module.exports = config;
```

...to:

`webpack.config.js`

```js
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = () => {

  const VENDOR_LIBS = ["react", "react-dom"];

  return {
      entry: {
    ...
  },
  output: {
    ...
  }
  };
};
```

## Step 3. Configure / Check your `package.json` scripts

`package.json`

```js
  ...
"scripts": {
    "clean": "rimraf dist",
    "build:prod": "NODE_ENV=production npm run clean && webpack -p",
    "build:dev": "NODE_ENV=development npm run clean && webpack -p",
    "start:dev": "NODE_ENV='' webpack-dev-server",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  ...
```

# Configure environmental variables loading

## Step 1. Install dotenv to read `.env` files

```bash
npm install --save dotenv
```

where:
| Library | Description / Link |
| ------------ | ------------ |
| dotenv: | Enables loading of environment variables from a `.env` file |
| | _[npm](https://www.npmjs.com/package/dotenv)_ |

## Step 2. Create `.env` files

At project root, create files `.env`, `.env.development` and `.env.production` and fill them with your variables. Example format below:

```txt
API_1_KEY=sNOs9823bvp098w4fGhNOLIinoi98hb
API_2_KEY=JOjuyfl0767yNB898gb0990987BL_JB
ENVIRONMENT_SETTING=development
```

## Step 3. Setup configuration to load the correct variable file

`webpack.config.js`

```js
const fs = require("fs");
const dotenv = require("dotenv");

module.exports = () => {
  const envPath = path.join(__dirname) + "/.env." + process.env.NODE_ENV;
  const envPathDefault = path.join(__dirname) + "/.env";
  const envPathFinal = fs.existsSync(envPath) ? envPath : envPathDefault;

  const env = dotenv.config({ path: envPathFinal }).parsed;

  return {
    ...
    new webpack.DefinePlugin({
      "process.API_1_KEY": JSON.stringify(process.env.API_1_KEY),
      "process.API_2_KEY": JSON.stringify(process.env.API_2_KEY),
      "process.env.ENVIRONMENT_SETTING": JSON.stringify(
          env.ENVIRONMENT_SETTING
        ),
    })
    ...
  }
};
```

# Setup Testing

## Step 1. Install testing libraries:

```bash
npm install --save-dev jest enzyme jest-enzyme enzyme-adapter-react-16
```

- plus alternately:

```bash
npm install --save-dev moxios
```

... or

```bash
npm install --save-dev fetch-mock

```

where:
| Library | Description / Link |
| ------------ | ------------ |
| jest: | A testing framework for JavaScript |
| | _[home](https://jestjs.io/)_ _[npm](https://www.npmjs.com/package/jest)_ _[github](https://github.com/facebook/jest)_ |
| enzyme | JavaScript testing utility for React that enables traversal of the DOM |
| | _[home](https://enzymejs.github.io/enzyme/)_ _[npm](https://www.npmjs.com/package/enzyme)_ |
| jest-enzyme | Allows Jest to talk to Enzyme |
| | _[home](https://formidable.com/open-source/jest-enzyme/)_ _[npm](https://www.npmjs.com/package/jest-enzyme)_ _[github](https://github.com/FormidableLabs/enzyme-matchers/blob/master/README.md)_ |
| enzyme-adapter-react-16 | Enzyme adapter for React v16 |
| | _[home](https://enzymejs.github.io/enzyme/docs/installation/react-16.html)_ _[npm](https://www.npmjs.com/package/enzyme-adapter-react-16)_ |
| moxios | Mocks axios requests for testing |
| | _[npm](https://www.npmjs.com/package/moxios)_ _[github](https://github.com/axios/moxios)_ |
| fetch-mock | Mocks fetch requests for testing |
| | _[npm](https://www.npmjs.com/package/fetch-mock)_ |

- Add test script to `package.json`

```json
"scripts": {
  ...
  "test": "jest --watch"
}
```

## Step 2. Install libraries to remove testing properties from production code

```bash
npm install --save-dev babel-plugin-react-remove-properties
```

where:
| Library | Description / Link |
| ------------ | ------------ |
| babel-plugin-react-remove-properties: | Removes test properties from production code |
| | _[npm](https://www.npmjs.com/package/babel-plugin-react-remove-properties)_ _[github](https://github.com/oliviertassinari/babel-plugin-react-remove-properties)_ |

Add the following to your `.babelrc` file:

```json
{
  ...
"env": {
    "production": {
      "plugins": [
        [
          "react-remove-properties",
          {
            "properties": [
              "data-test"
            ]
          }
        ]
      ]
    }
  }
}
```

## Step 3. Configure Jest to ignore some files

1. SASS / SCSS files

```bash
npm install --save-dev babel-jest
```

where:
| Library | Description / Link |
| ------------ | ------------ |
| babel-jest: | |
| | _[npm](https://www.npmjs.com/package/babel-jest)_ _[github](https://github.com/facebook/jest)_ |

`package.json`

```json
  "jest": {
    "moduleNameMapper": {
      "^.+\\.(css|less|scss)$": "babel-jest"
    }
  },

```

# Setup for Documentation

## Step 1: Configure JSDoc

1. Install JSDoc

```bash
npm install --save-dev jsdoc
```

where:
| Library | Description / Link |
| ------------ | ------------ |
| jsdoc: | API Document generator for JavaScript |
| | _[npm](https://www.npmjs.com/package/jsdoc)_ _[github](https://github.com/jsdoc/jsdoc)_ |

2. Configure VSCode for JSDoc

Configure VSCode for type checking.

<br/>
Option 1: Using VSCode settings

Open `.vscode/settings.json`, add the following:

```json
"javascript.implicitProjectConfig.checkJs": true,
```

<br/>
Option 2: using `jsconfig.json` at project root

```json
{
  "source": {
    "include": ["src"],
    "includePattern": ".js$",
    "excludePattern": "(node_modules/|docs)"
  },
  "plugins": ["plugins/markdown"],
  "templates": {
    "cleverLinks": true,
    "monospaceLinks": true
  },
  "opts": {
    "checkJs": true,
    "recurse": true,
    "destination": "./docs/",
    "template": "./custom-template",
    "tutorials": "./tutorials",
    "readme": "./readme/readme.md"
  }
}
```

notes:

If default JavaScript checking is configured (as above):

- To turn off type checking, put `// @ts-nocheck` at the top of the file.

If default JavaScript checking is not configured:

- You can configure a single file by placing `// @ts-check` at the top of the file.

To selectively leave out blocks of code, use `// @ts-ignore`

<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

## Step 2: Basic Express Server Setup

1. Install `Express:`

```
npm install --save express
```

2. Create files

Folder structure:

```
<project_root>
|-- .babelrc
|-- package.json
|-- webpack.config.js
|-- src
    |-- server.js
    |-- index.html
```

3. Setup `NPM` run scripts

`package.json:`

```json
"scripts":{
  "start": "node ./server.js"
}
```

4. Create basic Express server files

`server.js:`

```js
const path = require("path");
const express = require("express");

const app = express(),
  DIST_DIR = __dirname,
  HTML_FILE = path.join(DIST_DIR, "index.html");

app.get("*", (req, res) => {
  res.sendFile(HTML_FILE);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
  console.log("Press Ctrl+C to quit.");
});
```

`index.html:`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Express and Webpack Boilerplate</title>
    <link rel="shortcut icon" href="#" />
  </head>
  <body>
    <p class="description">Express and Webpack Boilerplate App</p>
  </body>
</html>
```

5. Test and run

```
npm start
```

Browse to `http://localhost:8080`

<br/><br/><br/>

## Further Reading

<br/>

### Babel:

- [How to use ES6 with Babel and webpack](https://blog.jakoblind.no/babel-webpack-es6/)
- [What is @babel/preset-env and why do I need it?](https://blog.jakoblind.no/babel-preset-env/)

<br/>

### CSS / SASS / CSS Modules:

- [Webpack Loaders, CSS and Style Loaders](https://medium.com/a-beginners-guide-for-webpack-2/webpack-loaders-css-and-sass-2cc0079b5b3a)
- [What is the difference between style-loader and mini-css-extract-plugin?](https://maxrozen.com/difference-between-style-loader-mini-css-extract-plugin/)
- [How to configure CSS and CSS modules in webpack](https://blog.jakoblind.no/css-modules-webpack/)

<br/>

### ECMAScript:

- [JavaScript brief history and ECMAScript(ES6,ES7,ES8,ES9) features](https://medium.com/@madasamy/javascript-brief-history-and-ecmascript-es6-es7-es8-features-673973394df4)
- [The Complete ECMAScript 2015-2019 Guide](https://flaviocopes.com/ecmascript/)
- [ES5, ES6, ES7, ES8, ES9: What’s new in each Version of JavaScript](https://www.greycampus.com/blog/programming/java-script-versions)

<br/>

### Express:

- [Creating a Node Express-Webpack App with Dev and Prod Builds](https://medium.com/@binyamin/creating-a-node-express-webpack-app-with-dev-and-prod-builds-a4962ce51334)

<br/>

### React:

- [Step-By-Step: Create a React Project from Scratch](https://www.codementor.io/@rajjeet/step-by-step-create-a-react-project-from-scratch-11s9skvnxv)

<br/>

### Webpack:

- [How to streamline your React.js development process using Webpack 4](https://medium.com/free-code-camp/how-to-develop-react-js-apps-fast-using-webpack-4-3d772db957e4)

## Version Reference

`package.json`:

```json
"devDependencies": {
    "@babel/core": "^7.11.6",
    "@babel/plugin-proposal-class-properties": "^7.10.4",
    "@babel/preset-env": "^7.11.5",
    "@babel/preset-react": "^7.10.4",
    "babel-loader": "^8.1.0",
    "css-loader": "^4.3.0",
    "dotenv": "^8.2.0",
    "eslint": "^7.8.1",
    "eslint-plugin-react": "^7.20.6",
    "html-webpack-plugin": "^4.4.1",
    "rimraf": "^3.0.2",
    "style-loader": "^1.2.1",
    "webpack": "^4.44.1",
    "webpack-cli": "^3.3.12",
    "webpack-dev-server": "^3.11.0"
  },
  "dependencies": {
    "@fortawesome/fontawesome-svg-core": "^1.2.30",
    "@fortawesome/free-solid-svg-icons": "^5.14.0",
    "@fortawesome/react-fontawesome": "^0.1.11",
    "axios": "^0.20.0",
    "react": "^16.13.1",
    "react-dom": "^16.13.1",
    "react-hot-loader": "^4.12.21",
    "uuid": "^8.3.0"
  }
```
