import { createDep, type Dep } from "./dep";

const targetMap = new WeakMap<object, Map<unknown, Dep>>();
export let activeEffect: ReactiveEffect | undefined;

export class ReactiveEffect<T = unknown> {
	constructor(public fn: () => T) {
		//
	}

	run() {
		const parent = activeEffect;
		activeEffect = this;
		const res = this.fn();
		activeEffect = parent;
		return res;
	}
}

export const track = (target: object, key: unknown) => {
	let depsMap = targetMap.get(target);
	if (!depsMap) {
		depsMap = new Map();
		targetMap.set(target, depsMap);
	}

	let dep = depsMap.get(key);
	if (!dep) {
		dep = createDep();
		depsMap.set(key, dep);
	}

	if (activeEffect) {
		dep.add(activeEffect);
	}
};

export const trigger = (target: object, key?: unknown) => {
	const depsMap = targetMap.get(target);
	if (!depsMap) return;

	const dep = depsMap.get(key);

	if (!dep) return;

	for (const effect of [...dep]) {
		effect.run();
	}
};
