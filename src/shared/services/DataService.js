// @flow

export default class DataService {
  static getFileData = () => {
    let resolve, reject;
    let promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    window.Office.context.document.getFileAsync(
      window.Office.FileType.Compressed,
      { sliceSize: 65536 /*64 KB*/ },
      result => {
        if (result.status === 'succeeded') {
          // If the getFileAsync call succeeded, then
          // result.value will return a valid File Object.
          let file = result.value;
          let nextSlice = 0;
          let sliceCount = file.sliceCount;
          let docdataSlices = [];
          let slicesReceived = 0;
          // Get the file slices.
          DataService.getSliceAsync(
            file,
            nextSlice,
            sliceCount,
            docdataSlices,
            slicesReceived,
          )
            .then(data => {
              resolve(data);
            })
            .catch(e => {
              reject(e);
            });
        } else {
          throw new Error('save data failed');
        }
      },
    );
    return promise;
  };

  static getSliceAsync = (
    file: any,
    nextSlice: number,
    sliceCount: number,
    docdataSlices: Array<any>,
    slicesReceived: number,
  ) => {
    let resolve, reject;
    let promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    file.getSliceAsync(nextSlice, sliceResult => {
      if (sliceResult.status === 'succeeded') {
        // Got one slice, store it in a temporary array.
        // (Or you can do something else, such as
        // send it to a third-party server.)
        docdataSlices[sliceResult.value.index] = sliceResult.value.data;
        if (++slicesReceived === sliceCount) {
          // All slices have been received.
          file.closeAsync();
          // catch exceptions so we can handle them
          resolve(DataService.onGotAllSlices(docdataSlices));
        } else {
          DataService.getSliceAsync(
            file,
            ++nextSlice,
            sliceCount,
            docdataSlices,
            slicesReceived,
          ).catch(e => {
            reject(e);
          });
        }
      } else {
        file.closeAsync();
        throw new Error('failed to get slice');
      }
    });
    return promise;
  };

  static onGotAllSlices = (docdataSlices: Array<any>) => {
    return DataService.createDocData(docdataSlices);
  };

  static createDocData = (docdataSlices: Array<any>) => {
    let docdata = [];
    for (let i = 0; i < docdataSlices.length; i++) {
      docdata = docdata.concat(docdataSlices[i]);
    }
    return docdata;
  };
}
