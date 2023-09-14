import chalk from 'chalk'

export const commandPrint = commands => {
  const isArray = Array.isArray(commands)
  if (isArray) {
    for (let i = 0; i < commands.length; i++) {
      const command = commands[i]
      console.log(
        chalk.cyan(`${i + 1}.${command.title} (${command.alias})`),
        '\t',
        chalk.magenta(command.desc)
      )
    }
  }
}
