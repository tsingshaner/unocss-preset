import { colorFactory, cssVar } from '@/utils/css-color-factory'
import { cssVariablesExtractor } from '@/utils/css-var-extractor'

const CSS_COLOR_ARG_TOKEN_REGEX = /^--(\w+)-\d+$/
const CSS_COLOR_FUNC_TOKEN_REGEX = /^--color-/

const cssColorArgsFilter = (v: string): boolean => Boolean(CSS_COLOR_ARG_TOKEN_REGEX.exec(v))
const cssColorFuncFilter = (v: string): boolean => Boolean(CSS_COLOR_FUNC_TOKEN_REGEX.exec(v))

/**
 * Extract Arco Design colors for unocss theme from CSS variables
 * @param code - The CSS source code
 * @returns unocss theme['colors']
 */
export const extraArcoDesignColors = (code: Uint8Array): Record<string, Record<string, string> | string> => {
  const vars = cssVariablesExtractor(code)
  const colorArgTokens = vars.filter(cssColorArgsFilter)
  const colorFunctions = vars.filter(cssColorFuncFilter)

  const color = colorFactory('rgb')

  return {
    ...Object.fromEntries(colorArgTokens.map((token) => [token.slice('--'.length), color(token)])),
    ...Object.fromEntries(colorFunctions.map((token) => [token.slice('--color-'.length), cssVar(token)]))
  }
}
