export const compareAndFilter = (genArray, compareArray) => {
  const result = genArray.reduce((accum, item) => {
    if (!compareArray.includes(item)) {
      accum.push(item)
    }
    return accum
  }, [])

  return result
}
