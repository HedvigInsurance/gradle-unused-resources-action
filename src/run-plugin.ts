import * as exec from '@actions/exec'

export const runPlugin = async (): Promise<void> => {
    exec.exec('./gradlew removeUnusedResources')
}