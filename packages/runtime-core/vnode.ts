export type VNodeProps = Record<string, unknown>

export interface VNode {
  type: string
  props: VNodeProps
  children: (VNode | string)[]
}
