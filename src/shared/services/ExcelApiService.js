// @flow

import ExcelApiWrapper from 'shared/services/ExcelApiWrapper';
import _ from 'lodash';

type ExcelContext = Object;

class ExcelApiService extends ExcelApiWrapper {
  getSetting(key: string): Promise<string> {
    return this.run(
      _.partialRight(this._getSetting, key),
      'error getting setting' + key,
    );
  }

  setSetting(key: string, value: string) {
    return this.run(
      _.partialRight(this._setSetting, key, value),
      'error setting setting' + key,
    );
  }

  async _getSetting(ctx: ExcelContext, key: string): Promise<string> {
    let setting = ctx.workbook.settings.getItemOrNullObject(key);
    await this._sync(ctx);
    if (!setting.isNullObject) {
      setting.load('value');
      await this._sync(ctx);
      return setting.value;
    }
    return '';
  }

  async _setSetting(ctx: ExcelContext, key: string, value: string) {
    ctx.workbook.settings.add(key, value);
    await this._sync(ctx);
    // This solves an issue with workbook settings not persisting in the document
    // This can be removed when microsoft fixes their bug
    window.Office.context.document.settings.set(key, value);
    window.Office.context.document.settings.saveAsync(e => {
      if (e.status !== window.Office.AsyncResultStatus.Succeeded) {
        throw new Error('an error occured');
      }
    });
  }

  async _sync(ctx: ExcelContext) {
    if (!ctx) {
      throw new Error('no excel context');
    }
    try {
      await ctx.sync();
    } catch (err) {
      throw err;
    }
  }
}

export default ExcelApiService;
