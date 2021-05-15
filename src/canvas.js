import { toIndex } from './helpers';
import {SCREEN, TILE, TILE_TYPES, COLORS } from './config';

export default class Canvas {
  constructor(viewport, player, level) {
    this.viewport = viewport;
    this.player = player;
    this.level = level;

    this.canvas = this.createCanvas(SCREEN.WIDTH, SCREEN.HEIGHT);
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
    this.context.fillStyle = COLORS.VOID;
    this.context.fillRect(0, 0, this.viewport.screen[0], this.viewport.screen[1]);
  }

  drawTiles() {
    for (let y = this.viewport.startTile[1]; y < this.viewport.endTile[1]; y++) {
      for (let x = this.viewport.startTile[0]; x < this.viewport.endTile[0]; x++) {
        this.context.fillStyle = TILE_TYPES[this.level[toIndex(x, y)]].COLOR;

        this.context.fillRect(this.viewport.offset[0] + x * TILE.WIDTH, this.viewport.offset[1] + y * TILE.HEIGHT, TILE.WIDTH, TILE.HEIGHT);
      }
    }
  }

  drawPlayer() {
    this.context.fillStyle = COLORS.PLAYER;
    this.context.fillRect(this.viewport.offset[0] + this.player.position[0], this.viewport.offset[1] + this.player.position[1], this.player.dimensions[0], this.player.dimensions[1]);
  }
}