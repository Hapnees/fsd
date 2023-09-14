import { commandPrint } from './commands/commands-print.js'
import { createCommands, generalCommands } from './commands/commands.js'

export const cli = {
  genCommands: () => commandPrint(generalCommands),
  createCommands: () => commandPrint(createCommands),
}
