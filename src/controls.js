import { startLoop } from './loop';

export default class Controls {
  constructor() {
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;

    this.keyMap = new Map([
      [37, 'left'],
      [38, 'up'],
      [39, 'right'],
      [40, 'down']
    ])

    document.addEventListener('keydown', event => this.toggle(event, true));
    document.addEventListener('keyup', event => this.toggle(event, false));
  }

  toggle(event, value) {
    if (this.keyMap.has(event.keyCode)) {
      event.preventDefault();
      event.stopPropagation();

      /** Run game loop on key press */
      if (value) {
        startLoop();
      }

      this[this.keyMap.get(event.keyCode)] = value;
    }
  }
}