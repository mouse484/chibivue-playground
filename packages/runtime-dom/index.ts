import type { CreateAppFunction } from '../runtime-core/apiCreateApp'
import { createAppAPI } from '../runtime-core/apiCreateApp'
import type { RendererOptions } from '../runtime-core/renderer'
import { createRenderer } from '../runtime-core/renderer'
import { nodeOps } from './nodeOps'
import { patchProp } from './patchProp'

type selector = string

const { render } = createRenderer(
  { ...nodeOps, patchProp } as unknown as RendererOptions<selector>,
)
const _createApp = createAppAPI<string>(render)

export const createApp = ((...args) => {
  const app = _createApp(...args)
  const { mount } = app as unknown as { mount: (element: Element) => void }
  app.mount = (selector: string) => {
    const container = document.querySelector(selector)
    if (!container) {
      return
    }
    mount(container)
  }
  return app
}) satisfies CreateAppFunction<selector>
