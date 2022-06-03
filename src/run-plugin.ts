import * as exec from '@actions/exec'
import * as process from 'process'

export const runPlugin = async (): Promise<void> => {
  await exec.exec(
    `${process.platform !== 'win32' ? './' : ''}gradlew removeUnusedResources`
  )
}
