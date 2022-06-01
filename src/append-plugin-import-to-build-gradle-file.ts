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

export const appendPluginImportToBuildGradleFile = async (): Promise<void> => {
    await fs.appendFile('./build.gradle.kts', APPLY_IMPORT)
    await fs.writeFile('./unused.gradle.kts', UNUSED_FILE_CONTENTS)
}
