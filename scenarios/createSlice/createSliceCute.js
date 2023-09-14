import chalk from 'chalk'
import readLine from 'readline-sync'
import { createSlice } from './creteSlice.js'
import { createSliceUI } from './createSliceUI.js'

export const createSliceCute = fsdPath => {
  const avaliableLayers = ['features', 'entities', 'pages']
  const lockedLayers = ['app', 'shared']
  const layer = readLine.question('Enter the layer`s name: ')

  if (lockedLayers.includes(layer.toLowerCase())) {
    console.error(chalk.red(`${layer} layer does not contains slices`))
    return
  }

  if (!avaliableLayers.includes(layer.toLowerCase())) {
    console.error(chalk.red(`Unknown layer ${layer}`))
    return
  }

  const sliceName = readLine.question('Enter the slicename: ')
  createSlice(fsdPath, layer, sliceName)

  const componentName = readLine.question('Enter the component name: ')
  createSliceUI(`${fsdPath}/${layer}/${sliceName}`, componentName)
}
