export const SCREEN = {
  WIDTH: 480,
  HEIGHT: 480
};
export const TILE = {
  WIDTH: 40,
  HEIGHT: 40
};
export const MAP = {
  WIDTH: 20,
  HEIGHT: 20,
}
export const DELAY_MOVE = 100;
export const FLOOR_TYPES = {
  SOLID: 0,
  PATH: 1,
  GOAL: 2
};
export const COLORS = {
  VOID: '#000',
  SOLID: '#999',
  PATH: '#eee',
  GOAL: '#00ff00',
  PLAYER: '#0000ff'
}
export const TILE_TYPES = {
  0: {
    COLOR: COLORS.SOLID,
    FLOOR: FLOOR_TYPES.SOLID
  },
  1: {
    COLOR: COLORS.PATH,
    FLOOR: FLOOR_TYPES.PATH
  },
  2: {
    COLOR: COLORS.GOAL,
    FLOOR: FLOOR_TYPES.GOAL
  }
};
export const EVENTS = {
  EMPTY: 'EMPTY',
  WIN: 'WIN'
};