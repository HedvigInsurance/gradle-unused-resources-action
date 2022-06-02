import * as fs from 'fs-extra'

const APPLY_IMPORT = `
apply(from="unused.gradle.kts")
`

const UNUSED_FILE_CONTENTS = `
buildscript {
  repositories {
      gradlePluginPortal()
  }
  dependencies { classpath("gradle.plugin.com.github.konifar.gradle:plugin:0.3.3") }
}
apply<com.github.konifar.gradle.remover.UnusedResourcesRemoverPlugin>()
`

interface AppendPluginImportToBuildGradleFileResult {
  oldBuildGradleKtsContent: string
}

export const appendPluginImportToBuildGradleFile =
  async (): Promise<AppendPluginImportToBuildGradleFileResult> => {
    const oldBuildGradleKtsContent = (
      await fs.readFile('build.gradle.kts')
    ).toString()
    await fs.appendFile('build.gradle.kts', APPLY_IMPORT)
    await fs.writeFile('unused.gradle.kts', UNUSED_FILE_CONTENTS)

    return {
      oldBuildGradleKtsContent
    }
  }
