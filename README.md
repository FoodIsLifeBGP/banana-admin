## Banana-admin

Banana App is an open-source, not-for-profit project of The Be Good Foundation. We can reduce hunger by simplifying food donation. We make it easy for grocery stores and restaurants to donate good food that would otherwise be disposed of. Users will be able to find active donations, view the business's food rating, and claim a portion. This project is the admin portal where applications of donors and clients are to be approved.

# Banana-Admin
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Commands](#commands)
  - [Development](#development)
  - [Building a Component](#build-component-skeleton)
  - [Creating a Pull Request](#creating-a-pull-request)
---

## Installation

Step 0 is to [install the backend](https://github.com/FoodIsLifeBGP/banana-rails).  Follow those instructions to make sure you have everything needed to install this repo.

Then if you havent already done so, clone the repository to your desired project folder and install dependencies: `git clone https://github.com/FoodIsLifeBGP/banana-rn && cd banana-rn && npm i`

otherwise you can just navigate to your project's root folder in the terminal (e.g. `cd ~/Projects/banana-rn`)

# Installation (Mac/OSX)

First we install NVM and Node
- `npm i -g nvm` **OR** `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.1/install.sh | bash`

# Installation (Windows)

- Go to [this website](https://github.com/coreybutler/nvm-windows) and follow the instructions for installing Node Version Manager for Windows

- ***NOTE: This is necessary as the Banana app uses an older version of Node. This is also very convenient as it will let you switch between previous (or current) versions of Node depending on which project you're working on.***
#### **SETTING UP CODE ENVIRONMENT (OS AGNOSTIC)**

1) To confirm installation on either mac or windows, open up your Command Prompt and run `nvm --version` and it should return the version of your NVM and a list of its usage.

2) Once that's done, run `nvm use` (Banana App's config are compatible with Node version <= 14.17.0) and if you dont have the necessary version follow the prompt to install it (e.g. `nvm install 14.17.0`).
   - [NOTE: Run `nvm list` or `nvm ls` to see all of your saved versions of Node. You can use the same command `nvm use [version]` to switch].

3) Finally run `yarn install && yarn start`

## Environment Variables

Create a `.env` file in the root level of your project.

Set the app to either `development` or `production` by adding one of the following to your `.env` file:

```
APP_VARIANT=development

APP_VARIANT=production
```
This will then set the appropriate server endpoint in `environment.ts`

## Commands

Run project:

```
yarn start
```

Run storybook server

```
yarn run storybook
```

Run ESLint (you'll need to ensure you fix any linter errors and visually double-check your components in storybook before submitting/merging your PR so our build-checks pass)

```
yarn lint
```

...and infequently you may need to build the project:
```
yarn run build
```

navigate to `http://localhost:3004` (port set in `package.json`)

## Development

For UI component, we recommend to develop and debug in [Storybook](https://storybook.js.org), which is a library for developing UI components in isolation. Below is an example of building `Button` component via Storybook.

### Build component skeleton

First, create an folder under `src/Components` called `Button`

```
banana-admin $ cd src/Components
banana-admin/src/Components $ mkdir Button
banana-admin/src/Components $ cd Button
```

Create `index.js` and `style.module.css`

`index.js`

``` javascript
import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.css';

function Button(props) {

  return (
    <div>
       Btn
    </div>
  );
}


export default Button;
```

`style.module.css` is an empty file currently. Here we use css module to avoid class name conflict when the project become large ([Ref](https://css-tricks.com/css-modules-part-1-need/)).



In this end of this step, we already have a `<Button>` component that could be used somewhere else in this project.

### Create Story.js

Create `Button.stories.js`under `src/stories`

`Button.stories.js`

```javascript
import React from 'react';
import Button from '../Components/Button';

export default {
  title: 'Button',
  component: Button,
};

export const presentation = () => <Button/>;

```

Now run

`yarn run storybook` to open storybook server, you should see `Button` at component list at left bar, and by clicking it you could see the component.

![image-20200715000943318](https://tva1.sinaimg.cn/large/007S8ZIlgy1ggrobpixauj31k20u0aci.jpg)

### Adding style and props

Now you can add some style and props constraint to the files under `Button`,  any modifications of files of `<Button>` component would be loaded into storybook in real time. Here is the files and preview after adding small details.

`index.js`

```javascript
import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.css';

function Button(props) {
  const { text, style } = props;

  return (
    <div className={styles.buttonContainer} style={style}>
      {text}
    </div>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  style: PropTypes.object,
};

export default Button;

```

`style.module.css`

```javascript
@import "../../colors.module.css";
@import "../../fonts.module.css";


.buttonContainer{
  width: 150px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--BANANA_YELLOW);
  color: var(--NAVY_BLUE);
  border-radius: 8px;
  font-family: 'Open Sans', sans-serif;
}

```

`Button.stories.js`

```javascript
import React from 'react';
import Button from '../Components/Button';

export default {
  title: 'Button',
  component: Button,
};

export const presentation = () => <Button text="ButtonText" />;

```

![image-20200715001707871](https://tva1.sinaimg.cn/large/007S8ZIlgy1ggrojcd7ixj31rd0u00v4.jpg)

## Creating a Pull Request
Prior to creating a pull request, please correct any eslint errors presented upon running:
```
  yarn lint
```
Please fill out the pull request template as thoroughly and thoughtfully as possible.

If your pull request is not quite ready to be merged, please add "`WIP:`" (work in progress) to the beginning of the title to ensure it does not get merged accidentally.
