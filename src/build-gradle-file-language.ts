export type BuildGradleFileLanguage = 'groovy' | 'kotlinscript'
export const buildGradleFileLanguage = (
  buildGradlePath: string
): BuildGradleFileLanguage => {
  if (buildGradlePath.endsWith('kts')) {
    return 'kotlinscript'
  }
  if (buildGradlePath.endsWith('gradle')) {
    return 'groovy'
  }

  throw new Error(
    `Unknown build.gradle-file language for file: ${buildGradlePath}`
  )
}
