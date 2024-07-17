export class ForbiddenError extends Error {
  constructor() {
    super(`Access not authorized`);
  }
}
