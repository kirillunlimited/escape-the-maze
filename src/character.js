import { tileW, tileH, delayMove } from './config';
import { isTileAvailable } from './map';
import { stopLoop } from './loop';

export default class Character {
  constructor(col, row) {
    this.tileFrom = [col, row];
    this.tileTo = [col, row];
    this.timeMoved = 0;
    this.dimensions = [40,40];

    /** Init position */
    this.position = [this.tileFrom[0] * tileW, this.tileFrom[1] * tileH];
  }

  setControls(controls) {
    this.controls = controls;
  }

  render(time) {
    if (!this.processMovement(time)) {
      if (this.controls.up && this.canMoveUp()) {
        this.moveUp(time);
      } else if (this.controls.down && this.canMoveDown()) {
        this.moveDown(time);
      } else if (this.controls.left && this.canMoveLeft()) {
        this.moveLeft(time);
      } else if (this.controls.right && this.canMoveRight()) {
        this.moveRight(time);
      }
    }
  }

  placeAt(x,y) {
    this.tileFrom = [x,y];
    this.tileTo = [x,y];
    this.position = [
      ((tileW * x) + ((tileW - this.dimensions[0]) / 2)),
      ((tileH * y) + ((tileH - this.dimensions[1]) / 2))
    ];
  }

  processMovement(t) {
    if (this.tileFrom[0] === this.tileTo[0] && this.tileFrom[1] === this.tileTo[1]) {
      return false;
    }
    if ((t - this.timeMoved) >= delayMove) {
      this.placeAt(this.tileTo[0], this.tileTo[1]);
      stopLoop();
    } else {
      this.position[0] = (this.tileFrom[0] * tileW) + ((tileW - this.dimensions[0]) / 2);
      this.position[1] = (this.tileFrom[1] * tileH) + ((tileH - this.dimensions[1]) / 2);

      if (this.tileTo[0] !== this.tileFrom[0]) {
        const diff = (tileW / delayMove) * (t - this.timeMoved);
        this.position[0] += (this.tileTo[0] < this.tileFrom[0] ? 0 - diff : diff);
      }
      if (this.tileTo[1] !== this.tileFrom[1]) {
        const diff = (tileH / delayMove) * (t - this.timeMoved);
        this.position[1] += (this.tileTo[1] < this.tileFrom[1] ? 0 - diff : diff);
      }
      this.position[0] = Math.round(this.position[0]);
      this.position[1] = Math.round(this.position[1]);
    }
    return true;
  }

  canMoveTo(x, y) {
    if (isTileAvailable(x, y)) {
      return true;
    } else {
      stopLoop();
      return false;
    }
  }

  canMoveUp() {
    return this.canMoveTo(this.tileFrom[0], this.tileFrom[1] - 1);
  }
  canMoveDown() {
    return this.canMoveTo(this.tileFrom[0], this.tileFrom[1] + 1);
  }
  canMoveLeft() {
    return this.canMoveTo(this.tileFrom[0] - 1, this.tileFrom[1]);
  }
  canMoveRight() {
    return this.canMoveTo(this.tileFrom[0] + 1, this.tileFrom[1]);
  }

  moveUp(t) {
    this.tileTo[1] -= 1;
    this.timeMoved = t;
  }
  moveDown(t) {
    this.tileTo[1] += 1;
    this.timeMoved = t;
  }
  moveLeft(t) {
    this.tileTo[0] -= 1;
    this.timeMoved = t;
  }
  moveRight(t) {
    this.tileTo[0] += 1;
    this.timeMoved = t;
  }
}