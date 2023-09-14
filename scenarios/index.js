import { actionCreateScenario } from './actionCreate.js'
import { cli } from '../cli/cli.js'

const scenarioList = {
  actionCreate: fsdPath => actionCreateScenario(fsdPath),
}

export const scenarios = (value, fsdPath) => {
  if (value === 'c' || value === 'Create') {
    cli.createCommands()
    scenarioList.actionCreate(fsdPath)
  }
}
