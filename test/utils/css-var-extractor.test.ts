import { describe } from 'vitest'

import { cssVariablesExtractor } from '@/utils/css-var-extractor'

describe('css variable extractor', (test) => {
  test('should extract css variables', ({ expect }) => {
    const code = Buffer.from(`
      :root {
        --primary-color: #333;
        --secondary-color: #444;
      }
    `)

    const vars = cssVariablesExtractor(code)
    expect(vars).toEqual(expect.arrayContaining(['--primary-color', '--secondary-color']))
  })

  test('should extract css variables with custom property', ({ expect }) => {
    const code = Buffer.from(`
      :root {
        --primary-color: #333;
        --secondary-color: #444;
      }
      .custom {
        --custom-color: #555;
        --color-red: rgb(var(--custom-color) / 50%);
      }
    `)

    const vars = cssVariablesExtractor(code)
    expect(vars).toEqual(
      expect.arrayContaining(['--primary-color', '--secondary-color', '--color-red', '--custom-color'])
    )
  })
})
