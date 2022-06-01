import * as fs from 'fs-extra'

export const removeAppendedPluginImport = async (
  oldBuildGradleKtsContent: string
): Promise<void> => {
  await fs.writeFile('./build.gradle.kts', oldBuildGradleKtsContent)
  await fs.remove('./unused.gradle.kts')
}
