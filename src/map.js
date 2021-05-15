import { EVENTS, MAP, FLOOR_TYPES, TILE_TYPES } from './config';
import { toIndex } from './helpers';

const FLOOR_EVENTS = {
  1: EVENTS.EMPTY,
  2: EVENTS.WIN
};

const getFloor = (x, y, level) => {
  return TILE_TYPES[level[toIndex(x,y)]].FLOOR;
}

export const isTileAvailable = (x, y, level) => {
  if (x < 0 || x >= MAP.WIDTH || y < 0 || y >= MAP.HEIGHT) {
    return false;
  }
  const floor = getFloor(x, y, level);
  return floor !== FLOOR_TYPES.SOLID;
}

export const getTileEvent = (x, y, level) => {
  const floor = getFloor(x, y, level);
  return FLOOR_EVENTS[floor];
}