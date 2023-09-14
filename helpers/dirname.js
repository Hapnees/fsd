export const __dirname = process.cwd().split('/').slice(0, -1).join('/')

export const resolve = (...dirs) => {
  const incomingPath = dirs.reduce((accum, item) => accum + '/' + item, '')
  return incomingPath
}

export const getResolve = rootPath => {
  return (...dirs) => resolve(rootPath, ...dirs)
}
