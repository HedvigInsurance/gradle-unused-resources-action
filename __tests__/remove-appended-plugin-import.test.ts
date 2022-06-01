import * as fs from 'fs-extra'
import { vol } from 'memfs'
import { it, jest, expect, beforeEach } from '@jest/globals'
import { appendPluginImportToBuildGradleFile } from '../src/append-plugin-import-to-build-gradle-file'
import { removeAppendedPluginImport } from '../src/remove-appended-plugin-import'

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
    vol.mkdirSync(".", { recursive: true })
})

it('should leave file system as it previously was', async () => {
    await fs.writeFile("./build.gradle.kts", MOCK_BUILD_GRADLE_KTS)

    const { oldBuildGradleKtsContent } = await appendPluginImportToBuildGradleFile()
    await removeAppendedPluginImport(oldBuildGradleKtsContent)

    const buildGradleKts = (await fs.readFile('./build.gradle.kts')).toString()
    const unusedGradleKtsExists = await fs.pathExists('./unused.gradle.kts')

    expect(buildGradleKts).toEqual(MOCK_BUILD_GRADLE_KTS)
    expect(unusedGradleKtsExists).toBeFalsy()
})
