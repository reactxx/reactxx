// ({}, [':hover', ':active']) => {':hover': {':active': {}}}
export const wrapPseudoPrefixes = (rules: {}, pseudoPrefixes: string[]) => {
  if (pseudoPrefixes.length === 0) return rules
  let res = rules
  for (let i = pseudoPrefixes.length - 1; i >= 0; i--)
      res = { [pseudoPrefixes[i]]: res }
  return res
}