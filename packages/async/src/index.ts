export type Import<T> = T | {default: T};

export interface LoadProps<T> {
  id?(): string;
  load(): Promise<Import<T>>;
}

export enum DeferTiming {
  Mount,
  Idle,
}

export type RequestIdleCallbackHandle = any;

export interface RequestIdleCallbackOptions {
  timeout: number;
}

export type RequestIdleCallbackCallback = (
  deadline: RequestIdleCallbackDeadline,
) => void;

export interface RequestIdleCallbackDeadline {
  readonly didTimeout: boolean;
  timeRemaining: (() => number);
}

export interface WindowWithRequestIdleCallback {
  requestIdleCallback: ((
    callback: RequestIdleCallbackCallback,
    opts?: RequestIdleCallbackOptions,
  ) => RequestIdleCallbackHandle);
  cancelIdleCallback: ((handle: RequestIdleCallbackHandle) => void);
}
