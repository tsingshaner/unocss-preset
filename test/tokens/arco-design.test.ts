import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import { describe } from 'vitest'

import { extraArcoDesignColors } from '@/tokens/arco-design'

describe('arco desiasync gn tokens', (test) => {
  test('snapshot', async ({ expect }) => {
    const css = await readFile(resolve(import.meta.dirname, 'fixtures/arco-design.css'), 'utf-8')
    const code = new TextEncoder().encode(css)
    const arcoTokens = extraArcoDesignColors(code)

    expect(Object.entries(arcoTokens).sort((a, b) => a[0].localeCompare(b[0]))).toMatchSnapshot()
  })
})
