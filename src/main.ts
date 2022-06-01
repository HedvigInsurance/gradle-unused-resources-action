import * as core from '@actions/core'
import {appendPluginImportToBuildGradleFile} from './append-plugin-import-to-build-gradle-file'
import {removeAppendedPluginImport} from './remove-appended-plugin-import'
import {runPlugin} from './run-plugin'

async function run(): Promise<void> {
  try {
    const {oldBuildGradleKtsContent} =
      await appendPluginImportToBuildGradleFile()
    await runPlugin()
    await removeAppendedPluginImport(oldBuildGradleKtsContent)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
