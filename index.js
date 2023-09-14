import fs from 'fs'
import chalk from 'chalk'
import readLine from 'readline-sync'
import { cli } from './cli/cli.js'
import { scenarios } from './scenarios/index.js'
import { __dirname, getResolve } from './helpers/dirname.js'
import { iniFSD } from './initFSD.js'
import { createSharedComponentCommand } from './scenarios/createSharedComponent/createSharedComponentCommand.js'
import { createSlice } from './scenarios/createSlice/creteSlice.js'
import { createSliceUI } from './scenarios/createSlice/createSliceUI.js'

const resolve = getResolve(__dirname)
const action = process.argv[2]

const init = () => {
  let fsdPath = ''

  try {
    const config = fs.readFileSync(resolve('fsd.json'), { encoding: 'utf-8' })
    const parsedConfig = JSON.parse(config)

    if (!parsedConfig.path) {
      console.error(
        chalk.red('Set the path to FSD architecture "path": "fsd-path" ')
      )
      return
    }

    fsdPath = resolve(parsedConfig.path)
  } catch (e) {
    console.error(chalk.red('fsd.json file not found or empty'))
    return
  }

  console.log(chalk.green(' ==> FSD SCRIPT <== \n'))

  const isNeedContinue = iniFSD(fsdPath)
  if (!isNeedContinue) {
    return false
  }

  if (!action) {
    console.log(chalk.blue('Commands\n'))
    cli.genCommands()

    console.log('\n')
    const userAction = readLine.question('Choose an action: ')

    console.log('\n')
    scenarios(userAction, fsdPath)
  } else {
    if (action === 'create') {
      const actionCreate = process.argv[3]
      if (actionCreate === 'shared') {
        const componentName = process.argv[4]
        createSharedComponentCommand(fsdPath, componentName)
      } else if (actionCreate === 'slice') {
        const layer = process.argv[4]
        const sliceName = process.argv[5]
        createSlice(fsdPath, layer, sliceName)

        const componentName = process.argv[6]
        if (componentName) {
          createSliceUI(`${fsdPath}/${layer}/${sliceName}`, componentName)
        }
      }
    }
  }
}

init()
