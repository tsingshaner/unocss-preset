import { transform } from 'lightningcss'

/**
 * Extra css variables from css file
 * @returns css variable names
 */
export const cssVariablesExtractor = (code: Uint8Array): `--${string}`[] => {
  const variables = new Set<`--${string}`>()

  transform({
    code: code,
    filename: '.css',
    visitor: {
      // biome-ignore lint/style/useNamingConvention: internal api
      Declaration({ property, value }): void {
        if (property === 'custom') {
          variables.add(value.name as `--${string}`)
        }
      }
    }
  })

  return [...variables.values()]
}
