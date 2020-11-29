import Character from './character';
import Controls from './controls';
import Viewport from './viewport';
import Canvas from './canvas';
import { initLoop, tickLoop } from './loop';

export default class Game {
  constructor() {
    this.controls = new Controls();

    this.player = new Character(1, 1);
    this.player.setControls(this.controls);

    this.viewport = new Viewport();
    this.viewport.watch(this.player);

    this.canvas = new Canvas(this.viewport, this.player);

    this.currentFrameTime = undefined;

    initLoop(this.frame.bind(this));
  }

  frame() {
    this.currentFrameTime = Date.now();

    this.player.render(this.currentFrameTime);
    this.viewport.update();
    this.canvas.draw();

    tickLoop();
  }

  run() {
    this.frame();
  }
}
