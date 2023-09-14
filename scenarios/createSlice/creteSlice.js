import fs from 'fs'
import chalk from 'chalk'
import { getResolve } from '../../helpers/dirname.js'

export const createSlice = (fsdPath, layer, sliceName) => {
  const resolve = getResolve(`${fsdPath}/${layer}`)

  const files = fs.readdirSync(resolve(''))
  let isExistSlice = false
  for (const _file of files) {
    if (_file === sliceName) {
      isExistSlice = true
      break
    }
  }

  if (!isExistSlice) {
    try {
      fs.mkdirSync(resolve(sliceName))
    } catch (e) {
      console.error(chalk.red(`Can't create ${sliceName} slice`))
      return
    }

    try {
      fs.mkdirSync(resolve(sliceName, 'ui'))
    } catch (e) {
      console.error(chalk.red("Can't create ui dir"))
      return
    }

    try {
      fs.mkdirSync(resolve(sliceName, 'model'))
    } catch (e) {
      console.error(chalk.red("Can't create model dir"))
    }

    try {
      fs.mkdirSync(resolve(sliceName, 'model', 'types'))
    } catch (e) {
      console.error(chalk.red("Can't create types dir"))
    }

    try {
      fs.mkdirSync(resolve(sliceName, 'model', 'api'))
    } catch (e) {
      console.error(chalk.red("Can't create api dir"))
    }
  }
}
