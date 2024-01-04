import type { ReactiveEffect } from './effect';

export type Dep = ReturnType<typeof createDep>;

export const createDep = (effects?: ReactiveEffect[]) => {
	return new Set<ReactiveEffect>(effects);
};
