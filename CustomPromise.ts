class CustomPromise {
  thenCallback: any;
  errorCallback: any;

  constructor(
    expectedExecuter: (
      resolver: (value: unknown) => any,
      reject: (reason?: unknown) => void,
    ) => any,
  ) {
    expectedExecuter(
      (data: any) => {
        this.thenCallback(data);
      },
      (reason?: any) => {
        this.errorCallback(reason);
      },
    );
  }

  then(successCallback: (data: any) => any) {
    this.thenCallback = successCallback;
  }

  catch(errrorCallback: (reason?: any) => void) {
    this.errorCallback = errrorCallback;
  }
}

function setTimeoutPromisified(ms: number) {
  return new CustomPromise((resolve) =>
    setTimeout(() => {
      resolve("Hello world");
    }, ms),
  );
}

function callback(data: any) {
  console.log(data);
}

setTimeoutPromisified(3000).then(callback);
