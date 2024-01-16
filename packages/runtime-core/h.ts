import { createVNode, type VNode } from './vnode';

export const h = (
  type: VNode['type'],
  props: VNode['props'],
  children: VNode['children']
): VNode => {
  return createVNode(type, props, children);
};
