import { gameMap, tileTypes } from './map';
import { toIndex } from './helpers';
import { screenW, screenH, tileH, tileW } from './config';

export default class Canvas {
  constructor(viewport, player) {
    this.viewport = viewport;
    this.player = player;

    this.canvas = this.createCanvas(screenW, screenH);
    this.context = this.canvas.getContext('2d');

    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }

  createCanvas(width, height) {
    const elements = document.getElementsByTagName('canvas');
    const canvas = elements[0] || document.createElement('canvas');
    if (!elements.length) {
      document.body.appendChild(canvas);
    }
    canvas.width = width;
    canvas.height = height;
    return canvas;
  }

  draw() {
    this.drawViewport();
    this.drawTiles();
    this.drawPlayer();
  }

  drawViewport() {
    this.context.fillStyle = '#000';
    this.context.fillRect(0, 0, this.viewport.screen[0], this.viewport.screen[1]);
  }

  drawTiles() {
    for (let y = this.viewport.startTile[1]; y < this.viewport.endTile[1]; y++) {
      for (let x = this.viewport.startTile[0]; x < this.viewport.endTile[0]; x++) {
        this.context.fillStyle = tileTypes[gameMap[toIndex(x, y)]].color;

        this.context.fillRect(this.viewport.offset[0] + x * tileW, this.viewport.offset[1] + y * tileH, tileW, tileH);
      }
    }
  }

  drawPlayer() {
    this.context.fillStyle = '#0000ff';
    this.context.fillRect(this.viewport.offset[0] + this.player.position[0], this.viewport.offset[1] + this.player.position[1], this.player.dimensions[0], this.player.dimensions[1]);
  }
}