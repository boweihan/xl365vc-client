// @flow

import _ from 'lodash';

type ExcelContext = ?Object;

// this.worker - generator that pauses script execution in Excel.run
// this.ctx - stored excel context from open()
// this.next - function to be called next
class ExcelWrapper {
  ctx: ?ExcelContext = undefined;
  worker: ?Object = undefined;
  next: ?Function = undefined;
  /**
   *  Open an excel context
   *  @returns : promise that resolves when ExcelService is ready to recieve requests
   */
  open() {
    let completed = () => {};
    let status = new Promise(resolve => {
      completed = resolve;
    });
    this.initialize(completed);
    return status;
  }

  /**
   *  Open an excel event context -- this is only used for unregistering Excel event listeners
   *  @returns : promise that resolves when ExcelService is ready to recieve requests
   */
  openWithEventContext(eventCtx: ExcelContext) {
    let completed = () => {};
    let status = new Promise(resolve => {
      completed = resolve;
    });
    this.intializeWithEventContext(eventCtx, completed);
    return status;
  }

  /**
   *  Use an existing context and create a worker that doesn't need to be
   *  inside of an Excel.run
   */
  openWithContext(ctx: ExcelContext) {
    this.ctx = ctx;
    this.worker = this.createWorker();
  }

  /**
   *  Close an excel context by passing in a truthy value to the worker
   *  This stops Excel.run script execution and closes the context
   */
  close() {
    this.next = () => {};
    if (this.worker) {
      this.worker.next(true);
    }
    delete this.next;
    delete this.ctx;
  }

  /**
   * Runs the callable in a context
   */
  runner(ctx: ExcelContext, callable: Function): Promise<any> {
    this.openWithContext(ctx);
    callable(); // resolve open() promise
    return Promise.resolve(); // Excel.run() must return a promise
  }

  /**
   *  Wrapper for Excel.run
   *  @initializes : ctx - excel context
   *  @initializes : worker - a generator that runs until closed
   *  TODO: investigate removing this promise and have a generate inside Excel.run
   */
  initialize(callable: Function) {
    window.Excel && window.Excel.run(ctx => this.runner(ctx, callable));
  }

  /**
   * Used to initialize Excel context from a event context
   * For unregistering Excel event listeners
   * @param {Context} givenCtx
   * @param {Function} callable
   * @memberof ExcelWrapper
   */
  intializeWithEventContext(eventCtx: ExcelContext, callable: Function) {
    window.Excel &&
      window.Excel.run(eventCtx, ctx => this.runner(ctx, callable));
  }

  /**
   *  Creates a worker generator that can act as a coroutine
   *  Used to pause script execution in Excel.run
   */
  *createWorker(): any {
    let close = false;
    while (!close) {
      close = yield this.next && this.next();
    }
  }

  /**
   *  Executes a context-aware function
   *  @returns: the result of the function or an error, wrapped in a promise
   *            so that we can continue using .then if needed
   */
  run(callable: Function, errorMsg: string): Promise<any> {
    if (!this.ctx) {
      throw new Error('error running excel wrapper');
    }
    this.next = _.partial(callable, this.ctx);
    try {
      let returnValue = this.worker && this.worker.next(false).value;
      return Promise.resolve(returnValue);
    } catch (e) {
      return Promise.reject(e);
    }
  }
}

export default ExcelWrapper;
