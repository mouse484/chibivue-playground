import { track, trigger } from './effect';
import { reactive } from './reactive';

const hasChanged = (value: unknown, oldValue: unknown): boolean =>
  !Object.is(value, oldValue);

export const mutableHandlers = {
  get(target, key, receiver: object) {
    track(target, key);

    const res = Reflect.get(target, key, receiver);

    if (res !== null && typeof res === 'object') {
      return reactive(res);
    }
    return res;
  },
  set(target: Record<string | symbol, unknown>, key, value, receiver: object) {
    const oldValue = target[key];
    Reflect.set(target, key, value, receiver);

    if (hasChanged(value, oldValue)) {
      trigger(target, key);
    }

    return true;
  },
} satisfies ProxyHandler<object>;
