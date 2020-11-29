import { screenW, screenH, mapH, mapW, tileH, tileW } from './config';

export default class Viewport {
  constructor() {
    this.screen = [screenW, screenH];
    this.startTile = [0, 0];
    this.endTile = [0, 0];
    this.offset = [0, 0];
    this.player = null;
  }

  watch(player) {
    this.player = player;
  }

  update() {
    if (!this.player) {
      return;
    }

    const px = this.player.position[0] + (this.player.dimensions[0] / 2);
    const py = this.player.position[1] + (this.player.dimensions[1] / 2)

    this.offset[0] = Math.floor((this.screen[0] / 2) - px);
    this.offset[1] = Math.floor((this.screen[1] / 2) - py);

    const tile = [
      Math.floor(px/tileW),
      Math.floor(py/tileH)
    ];

    this.startTile[0] = tile[0] - 1 - Math.ceil((this.screen[0] / 2) / tileW);
    this.startTile[1] = tile[1] - 1 - Math.ceil((this.screen[1] / 2) / tileH);

    if (this.startTile[0] < 0) {
      this.startTile[0] = 0;
    }
    if (this.startTile[1] < 0) {
      this.startTile[1] = 0;
    }

    this.endTile[0] = tile[0] + 1 + Math.ceil((this.screen[0] / 2) / tileW);
    this.endTile[1] = tile[1] + 1 + Math.ceil((this.screen[1] / 2) / tileH);

    if (this.endTile[0] >= mapW + 1) {
      this.endTile[0] = mapW;
    }
    if (this.endTile[1] >= mapH + 1) {
      this.endTile[1] = mapH;
    }
  }
};