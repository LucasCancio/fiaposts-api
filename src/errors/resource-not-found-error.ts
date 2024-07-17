export class ResourceNotFoundError extends Error {
  constructor(resource: string) {
    super(`Resource ${resource} not found`);
  }
}
