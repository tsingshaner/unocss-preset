type PredefinedRGB = 'a98-rgb' | 'display-p3' | 'prophoto-rgb' | 'rec2020' | 'srgb-linear' | 'srgb'
type XYZSpace = 'xyz-d50' | 'xyz-d65' | 'xyz'

/**
 * A color space for css color func, e.g. 'srgb' => `color(srgb var(--my-color))`
 * @link https://drafts.csswg.org/css-color/#color-function
 */
interface ColorSpace {
  /** @link https://drafts.csswg.org/css-color/#typedef-colorspace-params */
  space: PredefinedRGB | XYZSpace
}

/** @link https://drafts.csswg.org/css-color/#color-functions */
type ColorFunc = 'hsl' | 'hwb' | 'lab' | 'lch' | 'oklab' | 'oklch' | 'rgb'

export type ColorFactoryParams = ColorFunc | ColorSpace
export const cssVar = (token: string): `var(${string})` => `var(${token})`

type CSSColorSyntax<T extends ColorFactoryParams> = T extends ColorFunc
  ? `${T}(var(${string}))`
  : `color(${T extends ColorSpace ? T['space'] : never} var(${string}))`

/**
 * A factory function for creating color tokens
 * @param cssColorFn - The CSS color function to use
 * @returns A function that takes a CSS variable and returns a CSS color function, e.g. `hsl(var(--my-color))`
 */
export const colorFactory = <T extends ColorFactoryParams>(params: T): ((token: string) => CSSColorSyntax<T>) =>
  typeof params === 'string'
    ? (token): CSSColorSyntax<T> => `${params}(${cssVar(token)})` as CSSColorSyntax<T>
    : (token): CSSColorSyntax<T> => `color(${params.space} ${cssVar(token)})` as CSSColorSyntax<T>
