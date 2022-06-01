import * as core from '@actions/core'
import { appendPluginImportToBuildGradleFile } from './append-plugin-import-to-build-gradle-file'
import { runPlugin } from './run-plugin'

async function run(): Promise<void> {
  try {
    await appendPluginImportToBuildGradleFile()
    await runPlugin()
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
