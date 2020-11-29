let tickMethod, req;

export const initLoop = (method) => {
  tickMethod = method;
}

export const startLoop = () => {
  req = requestAnimationFrame(tickMethod);
}

export const tickLoop = () => {
  if (req) {
    req = requestAnimationFrame(tickMethod);
  }
}

export const stopLoop = () => {
  if (req) {
    cancelAnimationFrame(req);
    req = null;
  }
}