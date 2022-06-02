import * as exec from '@actions/exec'

export const runPlugin = async (): Promise<void> => {
  await exec.exec('./gradlew removeUnusedResources')
}
