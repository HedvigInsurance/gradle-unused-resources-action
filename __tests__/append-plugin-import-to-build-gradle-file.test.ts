import * as fs from 'fs-extra'
import {vol} from 'memfs'
import {expect, it, beforeEach, jest} from '@jest/globals'
import {appendPluginImportToBuildGradleFile} from '../src/append-plugin-import-to-build-gradle-file'

jest.mock('fs')

const MOCK_BUILD_GRADLE_KTS = `
buildscript {
  repositories {
    mavenCentral()
  }
}
`

beforeEach(() => {
  vol.reset()
  vol.mkdirSync('.', {recursive: true})
})

it('should append required module configuration correctly', async () => {
  await fs.writeFile('./build.gradle.kts', MOCK_BUILD_GRADLE_KTS)

  await appendPluginImportToBuildGradleFile()

  const buildGradleKts = (await fs.readFile('./build.gradle.kts')).toString()
  const unusedGradleKts = (await fs.readFile('./unused.gradle.kts')).toString()

  expect(buildGradleKts).toMatchSnapshot()
  expect(unusedGradleKts).toMatchSnapshot()
})
