// @flow

import type { DialogCloseMessage } from 'shared/types';

export default class Dialog {
  route = '';
  width = 50;
  height = 50;

  constructor(route: string, width: ?number = 50, height: ?number = 50) {
    this.route = route;
    this.width = width;
    this.height = height;
  }

  async _actOn(message: DialogCloseMessage) {
    try {
      switch (message.action) {
        // case saveHistoryTypes.CREATE_SAVE_HISTORY_SHEET:
        //   await SheetCreationService.makeSaveHistorySheet(
        //     message.payload.selectedRange,
        //     message.payload.saveHistory,
        //   );
        //   break;
        default:
          break;
      }
    } catch (e) {
      // store.dispatch(setGlobalError(e));
    }
  }

  show() {
    return new Promise((resolve, reject) => {
      // turns out we need to pass state through query string to support excel for mac, which caches
      // dialog localstorage
      window.Office.context.ui.displayDialogAsync(
        window.location.href.split('?')[0] +
          '?isDialog=true&route=' +
          this.route,
        { height: this.height, width: this.width, displayInIframe: true },
        asyncResult => {
          // runs once the box opens, in the task pane
          if (
            asyncResult.status !== window.Office.AsyncResultStatus.Succeeded
          ) {
            reject(asyncResult.status);
          }
          // Get the dialog and register event handlers, events do not stack and are removed on .close()
          var dialog = asyncResult.value;
          this.addEventHandler(
            dialog,
            resolve,
            reject,
            window.Office.EventType.DialogMessageReceived,
          );
          this.addEventHandler(
            dialog,
            resolve,
            reject,
            window.Office.EventType.DialogEventReceived,
          );
        },
      );
    });
  }

  addEventHandler = (
    dialog: Object,
    resolve: Function,
    reject: Function,
    eventType: any,
  ) => {
    dialog.addEventHandler(eventType, asyncResult => {
      dialog.close();
      if (asyncResult.type !== eventType) {
        reject(asyncResult.error);
      }
      let message = asyncResult.message
        ? JSON.parse(asyncResult.message)
        : { action: '', payload: undefined };
      this._actOn(message);
      resolve(message);
    });
  };
}
