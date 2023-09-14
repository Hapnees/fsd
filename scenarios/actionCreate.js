import readLine from 'readline-sync'
import { createSharedComponentCute } from './createSharedComponent/createSharedComponentCute.js'
import { createSliceCute } from './createSlice/createSliceCute.js'

const createScenarios = {
  sharedComponent: fsdPath => createSharedComponentCute(fsdPath),
  slice: fsdPath => createSliceCute(fsdPath),
}

export const actionCreateScenario = fsdPath => {
  const value = readLine.question('Choose what u wanna create: ')

  const SCVariants = ['sc', 'shared component', 'shared']
  const SVariants = ['s', 'slice']

  if (SCVariants.includes(value.toLowerCase())) {
    createScenarios.sharedComponent(fsdPath)
  }

  if (SVariants.includes(value.toLowerCase())) {
    createScenarios.slice(fsdPath)
  }
}
