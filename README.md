# gradle-unused-resources-action

Remove unused resources with Github Actions.

Powered by https://github.com/konifar/gradle-unused-resources-remover-plugin

## Prerequisites

Your repository must be checked out, Java must be set up, and you must have the gradle wrapper present in your project.

## Inputs

- `root-build-gradle-file`
  Path to your root build.gradle-file.
  Defaults to `build.gradle.kts`.

## Example usage

```yml
name: Example unused resource action

on:
  schedule:
    - cron: "30 9 * * 0-5" # Run at 9:30 Monday-Friday

jobs:
  unused_resources:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-java@v3.3.0
        with:
          java-version: 11
          distribution: zulu
      # ...
      - uses: hedviginsurance/gradle-unused-resources-action@v0.1.3
      - uses: peter-evans/create-pull-request@v4 # Create a PR if there were any unused resources
```