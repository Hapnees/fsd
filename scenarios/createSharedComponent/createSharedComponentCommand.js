import chalk from 'chalk'
import fs from 'fs'
import { __dirname, getResolve } from '../../helpers/dirname.js'
import { createSharedComponent } from './createSharedComponent.js'

export const createSharedComponentCommand = (fsdPath, componentName) => {
  const resolve = getResolve(fsdPath)
  let filesSharedDir = []

  try {
    filesSharedDir = fs.readdirSync(resolve('shared'))
  } catch (e) {
    console.error(chalk.red('Папка shared не найдена'))
    return
  }

  let isExistUIDir = false
  for (const _file of filesSharedDir) {
    if (_file === 'ui') {
      isExistUIDir = true
      break
    }
  }

  if (!isExistUIDir) {
    fs.mkdirSync(resolve('shared', 'ui'), e => {
      if (e) {
        console.error(chalk.red('Ошибка при создании папки ui'))
        return
      }
    })
  }

  createSharedComponent(fsdPath, componentName)
}
