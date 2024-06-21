import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  stylistic: true,
  typescript: true,
  files: [
    '*/**.*',
  ],
})
