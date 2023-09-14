import fs from 'fs'
import { getResolve } from '../../helpers/dirname.js'
import { componentUITemplate } from '../templates/componentUI.js'

export const createSliceUI = (path, componentName) => {
  const resolve = getResolve(path)

  try {
    fs.mkdirSync(resolve('ui', componentName))
  } catch (e) {}

  fs.writeFileSync(
    resolve('ui', componentName, `${componentName}.tsx`),
    componentUITemplate(componentName)
  )

  fs.writeFileSync(
    resolve('ui', componentName, `${componentName}.module.scss`),
    ''
  )
  fs.writeFileSync(
    resolve('ui', componentName, `index.ts`),
    `export * from './${componentName}';\n`
  )

  const filesInUI = fs.readdirSync(resolve('ui'))
  let isExistCollector = false
  for (const _file of filesInUI) {
    if (_file === 'index.ts') {
      isExistCollector = true
      break
    }
  }

  if (isExistCollector) {
    fs.appendFileSync(
      resolve('ui', 'index.ts'),
      `export * from './${componentName}';\n`
    )
  } else {
    fs.writeFileSync(
      resolve('ui', 'index.ts'),
      `export * from './${componentName}';\n`
    )
  }

  const files = fs.readdirSync(resolve(''))
  let isExistUICollector = false

  for (const _file of files) {
    if (_file === 'index.ts') {
      isExistUICollector = true
      break
    }
  }

  if (!isExistUICollector) {
    fs.writeFileSync(resolve('index.ts'), "export * from './ui';\n")
  }
}
