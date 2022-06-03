import * as core from '@actions/core'
import {appendPluginImportToBuildGradleFile} from './append-plugin-import-to-build-gradle-file'
import {buildGradleFileLanguage} from './build-gradle-file-language'
import {removeAppendedPluginImport} from './remove-appended-plugin-import'
import {runPlugin} from './run-plugin'
import {v4 as uuidv4} from 'uuid'

async function run(): Promise<void> {
  try {
    const buildGradlePath = core.getInput('root-build-gradle-file')
    const language = buildGradleFileLanguage(buildGradlePath)
    const unusedPluginAppendPath = `unused-${uuidv4()}.gradle${
      language === 'kotlinscript' ? '.kts' : ''
    }`
    const {oldBuildGradleContent} = await appendPluginImportToBuildGradleFile(
      buildGradlePath,
      unusedPluginAppendPath,
      language
    )
    await runPlugin()
    await removeAppendedPluginImport(
      oldBuildGradleContent,
      buildGradlePath,
      unusedPluginAppendPath
    )
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
