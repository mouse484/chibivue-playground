import type { Component } from './component';
import type { RootRenderFunction } from './renderer';

export interface App<HostElement> {
  mount(container: HostElement | string): void;
}

export type CreateAppFunction<HostElement> = (
  rootComponent: Component
) => App<HostElement>;

export const createAppAPI =
  <HostElement>(
    render: RootRenderFunction<HostElement>
  ): CreateAppFunction<HostElement> =>
  (rootComponent) => {
    const app = {
      mount(container: HostElement) {
        const message = rootComponent.render?.();
        render(message, container);
      },
    } satisfies App<HostElement>;
    return app;
  };
