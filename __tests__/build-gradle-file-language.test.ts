import {expect, it} from '@jest/globals'
import {buildGradleFileLanguage} from '../src/build-gradle-file-language'

it('should identify kotlinscript-file', () => {
  expect(buildGradleFileLanguage('build.gradle.kts')).toEqual('kotlinscript')
})

it('should identify groovy-file', () => {
  expect(buildGradleFileLanguage('build.gradle')).toEqual('groovy')
})

it('should reject unknown file types', () => {
  expect(() => buildGradleFileLanguage('example.file')).toThrow()
})
