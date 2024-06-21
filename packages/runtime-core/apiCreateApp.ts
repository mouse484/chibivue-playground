import type { Component } from './component'
import type { RootRenderFunction } from './renderer'

export interface App<HostElement = unknown> {
  mount: (rootContainer: HostElement) => void
}

export type CreateAppFunction<HostElement> = (
  rootComponent: Component,
) => App<HostElement>

export function createAppAPI<HostElement = string>(
  render: RootRenderFunction<HostElement>,
): CreateAppFunction<HostElement> {
  return function createApp(rootComponent: Component) {
    const app: App<HostElement> = {
      mount(rootContainer: HostElement) {
        const message = rootComponent.render!()
        render(message, rootContainer)
      },
    }

    return app
  }
}
