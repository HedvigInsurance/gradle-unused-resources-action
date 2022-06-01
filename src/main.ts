import * as core from '@actions/core'
import { appendPluginImportToBuildGradleFile } from './append-plugin-import-to-build-gradle-file'

async function run(): Promise<void> {
  try {
    appendPluginImportToBuildGradleFile()
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
