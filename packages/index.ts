export interface Options {
  render: () => string
}

export interface App {
  mount: (selector: string) => void
}

export function createApp(options: Options): App {
  return {
    mount: (selector) => {
      const root = document.querySelector(selector)
      if (root) {
        root.innerHTML = options.render()
      }
    },
  }
}
