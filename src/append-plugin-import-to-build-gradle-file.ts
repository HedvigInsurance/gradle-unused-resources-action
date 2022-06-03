import * as fs from 'fs-extra'
import {BuildGradleFileLanguage} from './build-gradle-file-language'

const applyImportKts = (path: string): string => `
apply(from="${path}")
`

const applyImportGroovy = (path: string): string => `
apply from: ${path}
`

const UNUSED_FILE_CONTENTS_KTS = `
buildscript {
  repositories {
      gradlePluginPortal()
  }
  dependencies { classpath("gradle.plugin.com.github.konifar.gradle:plugin:0.3.3") }
}
apply<com.github.konifar.gradle.remover.UnusedResourcesRemoverPlugin>()
`

const UNUSED_FILE_CONTENTS_GROOVY = `
buildscript {
  repositories {
      gradlePluginPortal()
  }
  dependencies { classpath "gradle.plugin.com.github.konifar.gradle:plugin:0.3.3" }
}
apply plugin: com.github.konifar.gradle.remover.UnusedResourcesRemoverPlugin
`

interface AppendPluginImportToBuildGradleFileResult {
  oldBuildGradleContent: string
}

export const appendPluginImportToBuildGradleFile = async (
  buildGradlePath: string,
  unusedPluginAppendPath: string,
  language: BuildGradleFileLanguage
): Promise<AppendPluginImportToBuildGradleFileResult> => {
  const oldBuildGradleContent = (await fs.readFile(buildGradlePath)).toString()
  await fs.appendFile(
    buildGradlePath,
    language === 'kotlinscript'
      ? applyImportKts(unusedPluginAppendPath)
      : applyImportGroovy(unusedPluginAppendPath)
  )
  await fs.writeFile(
    unusedPluginAppendPath,
    language === 'kotlinscript'
      ? UNUSED_FILE_CONTENTS_KTS
      : UNUSED_FILE_CONTENTS_GROOVY
  )

  return {
    oldBuildGradleContent
  }
}
