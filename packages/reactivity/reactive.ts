import { mutableHandlers } from "./baseHandler";

export const reactive = <T extends object>(target: T): T => {
	const proxy = new Proxy(target, mutableHandlers);
	return proxy as T;
};
