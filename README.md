# videojs-logo

A video.js plugin to display a logo image on the player.

- Abundant customization options
- TypeScript support

![video-js-logo-sample](./img/videojs-logo-sample.png)

If you think it's good, give me a star! :star:

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [Usage](#usage)
  - [Script tag](#script-tag)
  - [ES Modules](#es-modules)
  - [CommonJS](#commonjs)
  - [TypeScript](#typescript)
- [Configuration](#configuration)
- [Methods](#methods)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
## Installation

Using npm:

```sh
npm install videojs-logo
```

Using yarn:

```sh
yarn add videojs-logo
```

Using jsDelivr CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/videojs-logo@latest/dist/videojs-logo.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/videojs-logo@latest/dist/videojs-logo.css">
```

Using unpkg CDN:

```html
<script src="https://unpkg.com/videojs-logo@latest/dist/videojs-logo.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/videojs-logo@latest/dist/videojs-logo.css">
```

## Usage

To include videojs-logo on your website or web application, use any of the following methods.

### Script tag

This is the simplest case. \
Get the script in whatever way you prefer and include the plugin _after_ you include [video.js][videojs], so that the `videojs` global is available.

```html
<!-- include stylesheets -->
<link href="//path/to/video-js.min.css" rel="stylesheet">
<link href="//path/to/videojs-logo.css" rel="stylesheet">

<!-- include scripts -->
<script src="//path/to/video.min.js"></script>
<script src="//path/to/videojs-logo.min.js"></script>

<!-- initialize videojs-logo -->
<script>
  var player = videojs('my-video');

  player.logo({
    image: 'my_logo.png'
  });
</script>
```

### ES Modules

Install videojs-logo via npm and `import` the plugin as you would any other module. \
You will also need to import the stylesheet in some way.

```js
import videojs from 'video.js';

// The actual plugin function is exported by this module, but it is also
// attached to the `Player.prototype`; so, there is no need to assign it
// to a variable.
import 'videojs-logo';
import 'videojs-logo/dist/videojs-logo.css';

const player = videojs('my-video');

player.logo({
  image: 'my_logo.png'
});
```

### CommonJS

Install videojs-logo via npm and `require` the plugin as you would any other module. \
You will also need to import the stylesheet in some way.

```js
var videojs = require('video.js');

// The actual plugin function is exported by this module, but it is also
// attached to the `Player.prototype`; so, there is no need to assign it
// to a variable.
require('videojs-logo');
require('videojs-logo/dist/videojs-logo.css);

var player = videojs('my-video');

player.logo({
  image: 'my_logo.png'
});
```

### TypeScript

When using with TypeScript, you can use the `VideoJsLogo` namespace.

```ts
import videojs, { VideoJsLogo } from 'video.js';
import 'videojs-logo';
import 'videojs-logo/dist/videojs-logo.css';

const player = videojs('my-video');

const options: VideoJsLogo.Options = {
  image: 'my_logo.png'
};
player.logo(options);
```

## Configuration

| Property    | Attributes   | Type         | Default value | Description                                                                                          |
| ----------- | ------------ | ------------ | ------------- | ---------------------------------------------------------------------------------------------------- |
| **image**   | **Required** | **String**   |               | **The URL to the logo image.**                                                                       |
| url         | Optional     | String       |               | A url to be linked to from the logo. If the user clicks the logo the link will open in a new window. |
| position    | Optional     | String       | "top-right"   | The location to place the logo (top-left, top-right, bottom-left, or bottom-right).                  |
| offsetH     | Optional     | Number       | 0             | Horizontal offset (px) from the edge of the video.                                                   |
| offsetV     | Optional     | Number       | 0             | Vertical offset (px) from the edge of the video.                                                     |
| width       | Optional     | Number       |               | The width of the logo image (px). If not specified, it will be the width of the original image.      |
| height      | Optional     | Number       |               | The height of the logo image (px). If not specified, it will be the height of the original image.    |
| padding     | Optional     | Number       | 5             | Padding around the logo image (px).                                                                  |
| fadeDelay   | Optional     | Number, Null | 5000          | Time until fade-out begins (msec). If `null` is specified, automatic fade-out is not performed.      |
| hideOnReady | Optional     | Boolean      | false         | Do not show the logo image when the player is ready.                                                 |
| opacity     | Optional     | Boolean      | 1             | The opacity of the logo (from `[0, 1]`). If not specified, it will default to 1.                     |

## Methods

You can also manually show / hide the logo image at any time.

```js
// To show the logo image on the player's play event:
player.on('play', () => {
  player.logo().show();
});
```

| Method | Description         |
| ------ | ------------------- |
| show() | Show the logo image |
| hide() | Hide the logo image |

## License

MIT. Copyright (c) tapioca24


[videojs]: http://videojs.com/
