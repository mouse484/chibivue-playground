import type { VNode } from './vnode';

export const h = (
  type: VNode['type'],
  props: VNode['props'],
  children: VNode['children']
): VNode => {
  return { type, props, children };
};
