import document from 'global/document';

import QUnit from 'qunit';
import sinon from 'sinon';
import videojs from 'video.js';

import plugin from '../src/plugin';
import * as helper from './helper';

const Player = videojs.getComponent('Player');

QUnit.test('the environment is sane', function(assert) {
  assert.strictEqual(typeof Array.isArray, 'function', 'es5 exists');
  assert.strictEqual(typeof sinon, 'object', 'sinon exists');
  assert.strictEqual(typeof videojs, 'function', 'videojs exists');
  assert.strictEqual(typeof plugin, 'function', 'plugin is a function');
});

QUnit.module('videojs-logo', {
  beforeEach() {
    // Mock the environment's timers because certain things - particularly
    // player readiness - are asynchronous in video.js 5. This MUST come
    // before any player is created; otherwise, timers could get created
    // with the actual timer methods!
    this.clock = sinon.useFakeTimers();

    this.fixture = document.getElementById('qunit-fixture');
    this.video = document.createElement('video');
    this.fixture.appendChild(this.video);
    this.player = videojs(this.video);
  },

  afterEach() {
    this.player.dispose();
    this.clock.restore();
  }
});

QUnit.test('registers itself with video.js', function(assert) {
  assert.expect(2);

  assert.strictEqual(
    typeof Player.prototype.logo,
    'function',
    'videojs-logo plugin was registered'
  );

  this.player.logo();

  // Tick the clock forward enough to trigger the player to be "ready".
  this.clock.tick(1);

  assert.ok(
    this.player.hasClass('vjs-logo'),
    'the plugin adds a class to the player'
  );
});

QUnit.test('if image property is not specified', function(assert) {
  this.player.logo();
  this.clock.tick(1);

  assert.strictEqual(
    this.player.contentEl().getElementsByClassName('vjs-logo-content').length,
    0,
    'the plugin does not add any content'
  );
});

QUnit.test('if image property is specified', function(assert) {
  const imageUrl = '/images/sample.png';

  this.player.logo({ image: imageUrl });
  this.clock.tick(1);

  const content = helper.getContent(this.player);
  const image = helper.getImage(content);

  assert.ok(
    content,
    'the plugin adds a content for logo image'
  );
  assert.ok(
    image,
    'the plugin adds an image'
  );
  assert.ok(
    image.src.endsWith(imageUrl),
    'the plugin set the image path correctly'
  );
});

QUnit.test('if url property is not specified', function(assert) {
  this.player.logo({ image: '/images/sample.png' });
  this.clock.tick(1);

  const content = helper.getContent(this.player);

  assert.strictEqual(
    content.getElementsByTagName('a').length,
    0,
    'the plugin does not add an anchor'
  );
});

QUnit.test('if url property is specified', function(assert) {
  const url = 'https://example.com/';

  this.player.logo({ image: '/images/sample.png', url });
  this.clock.tick(1);

  const content = helper.getContent(this.player);
  const anchor = helper.getAnchor(content);

  assert.ok(
    anchor,
    'the plugin adds an anchor'
  );

  assert.strictEqual(
    anchor.href,
    url,
    'the plugin set the url correctly'
  );
});

QUnit.test('if position property is not specified', function(assert) {
  this.player.logo({ image: '/images/sample.png' });
  this.clock.tick(1);

  const content = helper.getContent(this.player);

  assert.ok(
    helper.isTop(content) && helper.isRight(content),
    'the plugin places the logo in the upper right corner'
  );
});

QUnit.test('if the position property is specified as top-left', function(assert) {
  this.player.logo({ image: '/images/sample.png', position: 'top-left' });
  this.clock.tick(1);

  const content = helper.getContent(this.player);

  assert.ok(
    helper.isTop(content) && helper.isLeft(content),
    'the plugin places the logo in the upper left corner'
  );
});

QUnit.test('if the position property is specified as top-right', function(assert) {
  this.player.logo({ image: '/images/sample.png', position: 'top-right' });
  this.clock.tick(1);

  const content = helper.getContent(this.player);

  assert.ok(
    helper.isTop(content) && helper.isRight(content),
    'the plugin places the logo in the upper right corner'
  );
});

QUnit.test('if the position property is specified as bottom-left', function(assert) {
  this.player.logo({ image: '/images/sample.png', position: 'bottom-left' });
  this.clock.tick(1);

  const content = helper.getContent(this.player);

  assert.ok(
    helper.isBottom(content) && helper.isLeft(content),
    'the plugin places the logo in the lower left corner'
  );
});

QUnit.test('if the position property is specified as bottom-right', function(assert) {
  this.player.logo({ image: '/images/sample.png', position: 'bottom-right' });
  this.clock.tick(1);

  const content = helper.getContent(this.player);

  assert.ok(
    helper.isBottom(content) && helper.isRight(content),
    'the plugin places the logo in the lower right corner'
  );
});

QUnit.test('if offsetH property is not specified', function(assert) {
  this.player.logo({ image: '/images/sample.png' });
  this.clock.tick(1);

  const content = helper.getContent(this.player);

  assert.strictEqual(
    content.style.right,
    '0px',
    'the plugin sets the horizontal offset to 0'
  );
});

QUnit.test('if offsetH property is specified as 10', function(assert) {
  this.player.logo({ image: '/images/sample.png', offsetH: 10 });
  this.clock.tick(1);

  const content = helper.getContent(this.player);

  assert.strictEqual(
    content.style.right,
    '10px',
    'the plugin sets the horizontal offset to 10'
  );
});

QUnit.test('if offsetV property is not specified', function(assert) {
  this.player.logo({ image: '/images/sample.png' });
  this.clock.tick(1);

  const content = helper.getContent(this.player);

  assert.strictEqual(
    content.style.top,
    '0px',
    'the plugin sets the vertical offset to 0'
  );
});

QUnit.test('if offsetV property is specified as 10', function(assert) {
  this.player.logo({ image: '/images/sample.png', offsetV: 10 });
  this.clock.tick(1);

  const content = helper.getContent(this.player);

  assert.strictEqual(
    content.style.top,
    '10px',
    'the plugin sets the vertical offset to 10'
  );
});

QUnit.test('if width property is not specified', function(assert) {
  this.player.logo({ image: '/images/sample.png' });
  this.clock.tick(1);

  const content = helper.getContent(this.player);
  const image = helper.getImage(content);

  assert.notOk(
    image.width,
    'the plugin does not set the width of the logo image'
  );
});

QUnit.test('if width property is specified as 100', function(assert) {
  this.player.logo({ image: '/images/sample.png', width: 100 });
  this.clock.tick(1);

  const content = helper.getContent(this.player);
  const image = helper.getImage(content);

  assert.strictEqual(
    image.width,
    100,
    'the plugin sets the width of the logo image to 100'
  );
});

QUnit.test('if height property is not specified', function(assert) {
  this.player.logo({ image: '/images/sample.png' });
  this.clock.tick(1);

  const content = helper.getContent(this.player);
  const image = helper.getImage(content);

  assert.notOk(
    image.height,
    'the plugin does not set the height of the logo image'
  );
});

QUnit.test('if height property is specified as 100', function(assert) {
  this.player.logo({ image: '/images/sample.png', height: 100 });
  this.clock.tick(1);

  const content = helper.getContent(this.player);
  const image = helper.getImage(content);

  assert.strictEqual(
    image.height,
    100,
    'the plugin sets the height of the logo image to 100'
  );
});

QUnit.test('if position property is not specified', function(assert) {
  this.player.logo({ image: '/images/sample.png' });
  this.clock.tick(1);

  const content = helper.getContent(this.player);

  assert.strictEqual(
    content.style.padding,
    '5px',
    'the plugin sets the padding of the logo image to 5'
  );
});

QUnit.test('if position property is specified as 10', function(assert) {
  this.player.logo({ image: '/images/sample.png', padding: 10 });
  this.clock.tick(1);

  const content = helper.getContent(this.player);

  assert.strictEqual(
    content.style.padding,
    '10px',
    'the plugin sets the padding of the logo image to 10'
  );
});

QUnit.test('if opacity property is not specified', function(assert) {
  this.player.logo({ image: '/images/sample.png' });
  this.clock.tick(1);

  const content = helper.getContent(this.player);
  const image = helper.getImage(content);

  assert.strictEqual(
    image.style.opacity,
    '1',
    'the plugin sets the opacity of the logo image to 1'
  );
});

QUnit.test('if opacity property is specified as 0.5', function(assert) {
  this.player.logo({ image: '/images/sample.png', opacity: 0.5 });
  this.clock.tick(1);

  const content = helper.getContent(this.player);
  const image = helper.getImage(content);

  assert.strictEqual(
    image.style.opacity,
    '0.5',
    'the plugin sets the opacity of the logo image to 0.5'
  );
});

QUnit.test('if hideOnReady property is not specified', function(assert) {
  this.player.logo({ image: '/images/sample.png' });
  this.clock.tick(1);

  const content = helper.getContent(this.player);

  assert.ok(
    helper.isShown(content),
    'the plugin displays the logo image'
  );
});

QUnit.test('if hideOnReady property is specified as true', function(assert) {
  this.player.logo({ image: '/images/sample.png', hideOnReady: true });
  this.clock.tick(1);

  const content = helper.getContent(this.player);

  assert.ok(
    !helper.isShown(content),
    'the plugin does not display the logo image'
  );
});

QUnit.test('if fadeDelay property is not specified', function(assert) {
  const fadeDelay = 5000;

  this.player.logo({ image: '/images/sample.png' });
  this.clock.tick(1);

  const content = helper.getContent(this.player);

  this.clock.tick(fadeDelay - 1);

  assert.ok(
    helper.isShown(content),
    'the plugin continues to display the logo image for 5 seconds'
  );

  this.clock.tick(1);

  assert.ok(
    !helper.isShown(content),
    'the plugin hides the logo image after 5 seconds'
  );
});

QUnit.test('if fadeDelay property is specified as 10000', function(assert) {
  const fadeDelay = 10000;

  this.player.logo({ image: '/images/sample.png', fadeDelay });
  this.clock.tick(1);

  const content = helper.getContent(this.player);

  this.clock.tick(fadeDelay - 1);

  assert.ok(
    helper.isShown(content),
    'the plugin continues to display the logo image for 10 seconds'
  );

  this.clock.tick(1);

  assert.ok(
    !helper.isShown(content),
    'the plugin hides the logo image after 10 seconds'
  );
});

QUnit.test('if fadeDelay property is specified as null', function(assert) {
  this.player.logo({ image: '/images/sample.png', fadeDelay: null });
  this.clock.tick(1);

  const content = helper.getContent(this.player);

  this.clock.tick(600000);

  assert.ok(
    helper.isShown(content),
    'the plugin continues to display the logo image'
  );
});

QUnit.test('call show method while the logo is hidden', function(assert) {
  const fadeDelay = 5000;

  this.player.logo({ image: '/images/sample.png', hideOnReady: true });
  this.clock.tick(1);

  const content = helper.getContent(this.player);

  this.player.logo().show();

  assert.ok(
    helper.isShown(content),
    'the plugin displays the logo image'
  );

  this.clock.tick(fadeDelay - 1);

  assert.ok(
    helper.isShown(content),
    'the plugin continues to display the logo image for 5 seconds'
  );

  this.clock.tick(1);

  assert.ok(
    !helper.isShown(content),
    'the plugin hides the logo image for 5 seconds'
  );
});

QUnit.test('call show method while the logo is shown', function(assert) {
  const fadeDelay = 5000;

  this.player.logo({ image: '/images/sample.png' });
  this.clock.tick(1);

  const content = helper.getContent(this.player);

  this.clock.tick(fadeDelay - 1000);

  this.player.logo().show();

  assert.ok(
    helper.isShown(content),
    'the plugin displays the logo image'
  );

  this.clock.tick(fadeDelay - 1);

  assert.ok(
    helper.isShown(content),
    'the plugin continues to display the logo image for 5 seconds'
  );

  this.clock.tick(1);

  assert.ok(
    !helper.isShown(content),
    'the plugin hides the logo image for 5 seconds'
  );
});

QUnit.test('call hide method while the logo is shown', function(assert) {
  this.player.logo({ image: '/images/sample.png' });
  this.clock.tick(1);

  const content = helper.getContent(this.player);

  this.player.logo().hide();

  assert.ok(
    !helper.isShown(content),
    'the plugin hides the logo image'
  );
});

QUnit.test('call hide method while the logo is hidden', function(assert) {
  this.player.logo({ image: '/images/sample.png', hideOnReady: true });
  this.clock.tick(1);

  const content = helper.getContent(this.player);

  this.player.logo().hide();

  assert.ok(
    !helper.isShown(content),
    'the plugin hides the logo image'
  );
});
