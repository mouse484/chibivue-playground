// biome-ignore lint/complexity/noBannedTypes: <explanation>
type EventValue = Function;

interface Invoker extends EventListener {
  value: EventValue;
}

export const addEventListener = (
  el: Element,
  event: string,
  handler: EventListener
) => {
  el.addEventListener(event, handler);
};

export const removeEventListener = (
  el: Element,
  event: string,
  handler: EventListener
) => {
  el.removeEventListener(event, handler);
};

const parseName = (rawName: string) => {
  return rawName.slice(2).toLocaleLowerCase();
};

const createInvoker = (initialValue: EventValue) => {
  const invoker: Invoker = (e: Event) => {
    invoker.value(e);
  };
  invoker.value = initialValue;
  return invoker;
};

export const patchEvent = (
  el: Element & { _vei?: Record<string, Invoker | undefined> },
  rawName: string,
  value: EventValue | null
) => {
  el._vei ||= {};
  const invokers = el._vei;

  const existingInvoker = invokers[rawName];

  if (value && existingInvoker) {
    existingInvoker.value = value;
  } else {
    const name = parseName(rawName);
    if (value) {
      const invoker = createInvoker(value);
      invokers[rawName] = invoker;
      addEventListener(el, name, invoker);
    } else if (existingInvoker) {
      removeEventListener(el, name, existingInvoker);
      invokers[rawName] = undefined;
    }
  }
};
