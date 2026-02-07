type PromiseState = "pending" | "fulfilled" | "failed";

class CustomPromise {
  state: PromiseState = "pending";

  executer;

  thenCallbacks: Function[] = [];
  errorCallbacks: Function[] = [];

  resolvedVlaue: any;
  rejectedReason: any;

  runLaterWhenResolved() {
    this.thenCallbacks.map((callback) => callback(this.resolvedVlaue));
  }

  constructor(
    expectedExecuter: (
      resolver: (value: unknown) => any,
      reject: (reason?: unknown) => void,
    ) => any,
  ) {
    this.executer = expectedExecuter(
      (data: any) => {
        this.resolvedVlaue = data;
        this.state = "fulfilled";
        this.runLaterWhenResolved();
      },
      (reason?: any) => {
        this.rejectedReason = reason;
        this.state = "failed";
      },
    );
  }

  then(successCallback: (data: any) => any) {
    this.thenCallbacks.push(successCallback);
    return this;
  }

  catch(errrorCallback: (reason?: any) => void) {
    this.errorCallbacks.push(errrorCallback);
    return this;
  }
}

function setTimeoutPromisified(ms: number) {
  return new CustomPromise((resolve) => resolve("Hare krishna"));
}

function callback(data: any) {
  console.log(data);
}

setTimeoutPromisified(1000).then(callback);
