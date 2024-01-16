import type { RendererNode } from './renderer';

export const Text = Symbol();

export interface VNodeProps {
  [key: string]: unknown;
}

type VNodeChildAtom = VNode | string;
export type VNodeChild = VNodeChildAtom | VNodeArrayChildren;
export type VNodeArrayChildren = (VNodeArrayChildren | VNodeChildAtom)[];

export interface VNode<HostNode = RendererNode> {
  type: string | typeof Text;
  props: VNodeProps | null;
  children: string | VNodeArrayChildren;
  el: HostNode | undefined;
}

export function createVNode(
  type: VNode['type'],
  props: VNode['props'],
  children: VNode['children']
): VNode {
  return { type, props, children, el: undefined };
}

export function normalizeVNode(child: VNodeChild) {
  if (typeof child === 'object') {
    return { ...child } as VNode;
  }
  return createVNode(Text, null, String(child));
}
