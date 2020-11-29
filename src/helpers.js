import {mapW} from './config';

export function toIndex(x, y) {
  return ((y * mapW) + x);
}
