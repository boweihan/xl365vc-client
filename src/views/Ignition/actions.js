// @flow

import ExcelApiService from 'shared/services/ExcelApiService';
import {
  GET_DOCUMENT_ID_PENDING,
  GET_DOCUMENT_ID_SUCCESS,
  GET_DOCUMENT_ID_FAILURE,
} from './types';

export const getOrCreateDocumentId = () => ({
  types: [
    GET_DOCUMENT_ID_PENDING,
    GET_DOCUMENT_ID_SUCCESS,
    GET_DOCUMENT_ID_FAILURE,
  ],
  promise: async () => {
    let excelService = new ExcelApiService();
    let documentId: string;
    try {
      await excelService.open();
      documentId = await excelService.getSetting('VB_DOCUMENT_ID');
      console.log('found document id' + documentId);
      if (!documentId) {
        documentId =
          '_' +
          Math.random()
            .toString(36)
            .substr(2, 16);
        await excelService.setSetting('VB_DOCUMENT_ID', documentId);
        console.log('created document id' + documentId);
      }
      return documentId;
    } finally {
      excelService.close();
    }
  },
});
