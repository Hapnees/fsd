import fs from 'fs'
import chalk from 'chalk'
import { getResolve } from '../../helpers/dirname.js'
import { componentUITemplate } from '../templates/componentUI.js'
import { storyUITemplate } from '../templates/storyUI.js'

export const createSharedComponent = (fsdPath, componentName) => {
  const resolve = getResolve(fsdPath)
  const componentPath = resolve('shared', 'ui', componentName)

  try {
    fs.mkdirSync(componentPath, e => {
      if (e) {
        console.error(
          chalk.error(`Ошибка при создании папки компонента ${componentName}`)
        )
        return
      }
    })
  } catch (e) {
    console.error(chalk.red(`Компонент ${componentName} уже существует`))
    return
  }

  try {
    fs.writeFileSync(
      `${componentPath}/${componentName}.tsx`,
      componentUITemplate(componentName)
    )
  } catch (e) {
    console.error(chalk.red(`Ошибка при создании ${componentName}.tsx файла`))
    return
  }

  try {
    fs.writeFileSync(`${componentPath}/${componentName}.module.scss`, '')
  } catch (e) {
    console.error(
      chalk.red(`Ошибка при создании ${componentName}.module.scss файла`)
    )
    return
  }

  try {
    fs.writeFileSync(
      `${componentPath}/${componentName}.stories.tsx`,
      storyUITemplate(componentName)
    )
  } catch (e) {
    console.error(chalk.red('Ошибка при создании истории'))
    return
  }

  try {
    fs.writeFileSync(
      `${componentPath}/index.ts`,
      `export * from './${componentName}'
`
    )
  } catch (e) {
    console.error(
      chalk.red(
        `Ошибка при создании сборщика в папке компонента ${componentName}`
      )
    )
    return
  }

  const files = fs.readdirSync(resolve('shared', 'ui'))
  let isExistCollector = false
  for (const _file of files) {
    if (_file === 'index.ts') {
      isExistCollector = true
      break
    }
  }

  if (isExistCollector) {
    try {
      fs.appendFileSync(
        resolve('shared', 'ui', 'index.ts'),
        `export * from './${componentName}'
`
      )
    } catch (e) {
      console.error(chalk.red('Ошибка при записи в сборщик в папке ui'))
      return
    }
  } else {
    try {
      fs.writeFileSync(
        resolve('shared', 'ui', 'index.ts'),
        `export * from './${componentName}'
`
      )
    } catch (e) {
      console.error(chalk.red('Ошибка при создании сборщика в папке ui'))
      return
    }
  }

  console.log(chalk.green(`Компонент ${componentName} успешно создан!`))
}
