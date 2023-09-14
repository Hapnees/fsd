import fs from 'fs'
import chalk from 'chalk'
import { getResolve } from './helpers/dirname.js'
import { compareAndFilter } from './helpers/array.js'
import readLine from 'readline-sync'

export const iniFSD = fsdPath => {
  const dirs = ['app', 'pages', 'widgets', 'features', 'entities', 'shared']
  const alreadyExistDirs = []
  let isNeedInit = 'n'

  const resolve = getResolve(fsdPath)

  let foundDirs = []
  try {
    foundDirs = fs.readdirSync(resolve(''))
  } catch (e) {
    try {
      isNeedInit = readLine.question(
        chalk.cyan('Initialize FSD architecture? (y/n): ')
      )
      if (isNeedInit === 'y') {
        fs.mkdirSync(fsdPath)
        iniFSD(resolve(''))
      } else {
        return false
      }
    } catch (e) {
      console.log(e)
      console.error(chalk.red("Can't create `${fsdPath}`"))
      return false
    }

    return true
  }

  if (foundDirs.length === dirs.length) {
    return true
  }

  if (foundDirs.length) {
    for (const _dir of foundDirs) {
      if (dirs.includes(_dir)) {
        alreadyExistDirs.push(_dir)
      }
    }
  }

  const dirsForCreate = compareAndFilter(dirs, alreadyExistDirs)
  for (const _dir of dirsForCreate) {
    try {
      fs.mkdirSync(resolve(_dir))
    } catch (e) {
      console.error(chalk.red(`Can't create ${_dir} dir`))
      return false
    }
  }

  console.log(chalk.green('FSD architecture initialized'))
  return true
}
