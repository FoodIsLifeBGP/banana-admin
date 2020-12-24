## Banana-admin

Banana App is an open-source, not-for-profit project of The Be Good Foundation. We can reduce hunger by simplifying food donation. We make it easy for grocery stores and restaurants to donate good food that would otherwise be disposed of. Users will be able to find active donations, view the business's food rating, and claim a portion. This project is the admin portal where applications of donors and clients are to be approved.

# Banana-Admin
  - [Installation](#installation)
  - [Commands](#commands)
  - [Development](#development)
  - [Building a Component](#build-component-skeleton)
  - [Creating a Pull Request](#creating-a-pull-request)
---

## Installation

First ensure you have [NodeJS](https://nodejs.org/en/) environment (recommended version is 12.18.2 LTS, which works well with our mobile app) on your computer, then run 

```bash
yarn install && yarn start
```

to run admin portal.

## Commands

Run project:

```bash
yarn start
```

Build project

```bash
yarn run build
```

Run storybook server

```bash
yarn run storybook
```

Run ESLint

```bash
yarn lint
```

## Development

For UI component, we recommend to develop and debug in [Storybook](https://storybook.js.org), which is a library for developing UI components in isolation. Below is an example of building `Button` component via Storybook.

### Build component skeleton

First, create an folder under `src/Components` called `Button`

```bash
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
```bash
  yarn lint
```
Please fill out the pull request template as thoroughly and thoughtfully as possible.

If your pull request is not quite ready to be merged, please add "`WIP:`" (work in progress) to the beginning of the title to ensure it does not get merged accidentally.
