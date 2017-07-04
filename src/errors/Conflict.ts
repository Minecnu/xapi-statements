import BaseError from './BaseError';

export default class extends BaseError {
  constructor(public statementId: string) {
    super(`${statementId} is conflicting`);
  }
}
