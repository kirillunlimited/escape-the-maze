import {MAP} from './config';

export function toIndex(x, y) {
  return ((y * MAP.WIDTH) + x);
}
