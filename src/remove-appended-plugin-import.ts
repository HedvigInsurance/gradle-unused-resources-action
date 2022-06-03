import * as fs from 'fs-extra'

export const removeAppendedPluginImport = async (
  oldBuildGradleContent: string,
  buildGradlePath: string,
  unusedPluginAppendPath: string
): Promise<void> => {
  await fs.writeFile(buildGradlePath, oldBuildGradleContent)
  await fs.remove(unusedPluginAppendPath)
}
