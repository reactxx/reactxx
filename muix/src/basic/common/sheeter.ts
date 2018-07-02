//****************************
// sheet processing magic
//****************************

import warning from 'warning'

const DEV_MODE = process.env.NODE_ENV === 'development'

//****************************
// TYPINGS
//****************************

// consts
export const enum Consts {
  $addIns = '$addIns',
  $whenUsed = '$whenUsed',
  path = '#path',
  rulesetName = '#rulesetName',
  canModify = '#canModify',
  data = '#data',
}

//****************************
// SHEET HIEARCHY

export interface TSheetWithAddIns extends TSheet {
  [Consts.canModify]?
  $addIns: TAddIns
}
export type TAddIns = { [addInsName: string]: TSheets }
export type TSheets = { [rulesetName: string]: TSheet }
export type TSheet = { [rulesetName: string]: TRuleset }
export interface TRuleset extends TNode {
  [Consts.rulesetName]?: string
}
export type TNode = { [ruleName: string]: TNode | string | string[] | number | TSheets }

//****************************
// FILTERS

export type UsedRulesetNames = { [rulesetName: string]: boolean }
export interface AddInRulesetPar {
  usedRulesetNames?: UsedRulesetNames
  addInSheet: TSheet
}
export type AddInRulesetFilter = (par: AddInRulesetPar) => TRuleset[]
export type AddInRulesetFilters = { [addInName: string]: AddInRulesetFilter }

//****************************
// OTHER

// hook for custom addIn processing
export type TFinishAddIn = (addIns: TAddIns, addInName: string) => void
export type TFinishAddIns = { [addInName: string]: TFinishAddIn }

//****************************
// MAIN EXPORTS
//****************************

export const setCanModify = (root: TSheetWithAddIns) => root[Consts.canModify] = true

// transform sheet to mergable and patchable form. !!! root is mutated !!!
export const toPatchableAndMergeable = (root: TSheet) => {
  root = linearize(root) // in-place processing of $before, $web, $native and $after ruleset props
  const res = extractPatches(root, root as TSheetWithAddIns, []) as TSheetWithAddIns // extract addIn props of ruleset (starting with $, e.g. $whenUsed, $mediaq) etc.
  return res
}

// merging patchable and mergeable sheets
export const mergeSheets = (sheet: TSheetWithAddIns, modifiers: TSheetWithAddIns[], finishProcs: TFinishAddIns) => {
  const canModify = sheet[Consts.canModify]
  if (modifiers && modifiers.length > 1) sheet = canModify ? deepMerges(sheet, modifiers) : immutableMerge([sheet, ...modifiers])
  // finish addIns
  if (sheet.$addIns && finishProcs) {
    if (!canModify) { // clone
      sheet = { ...sheet, $addIns: { ...sheet.$addIns } }
      for (const p in sheet.$addIns) sheet.$addIns[p] = { ...sheet.$addIns[p] }
    }
    for (const addInName in sheet.$addIns) {
      const proc = finishProcs[addInName]
      if (proc) proc(sheet.$addIns, addInName)
    }
  }
  // name rulesets
  const ignore = { '$': true, '#': true }
  if (sheet.$addIns) {
    for (const p in sheet) if (!ignore[p.charAt(0)]) sheet[p][Consts.rulesetName] = p
  }
  return sheet
}

// merge rulesets in component code (apply addIn patches)
export const mergeRulesetsForCode = (sheet: TSheetWithAddIns, addInRulesetFilters: AddInRulesetFilters, rulesets: TRuleset[]) => {
  if (!rulesets || rulesets.length === 0) return null
  // get used ruleset's (for $whenUses processing)
  const addIns = sheet.$addIns
  const whenUsed = addIns && addIns.$whenUsed
  let usedRulesets: UsedRulesetNames = null
  if (whenUsed) rulesets.forEach(ruleset => {
    if (!ruleset) return
    if (ruleset[Consts.rulesetName]) (usedRulesets || (usedRulesets = {}))[ruleset[Consts.rulesetName]] = true
  })

  // patch rulesets
  let firstIsReadOnly = true
  let patchedRulesets = rulesets
  const patches = addIns && getPatches(addIns, addInRulesetFilters, usedRulesets) // compute actual patches (based on addIn filters and usedRulesets)
  if (patches) {
    patchedRulesets = []
    rulesets.forEach((ruleset, idx) => {
      if (!ruleset) return
      if (!ruleset[Consts.rulesetName]) { patchedRulesets.push(ruleset); return } // not named ruleset
      const myPatches = patches.filter(p => p.patchPath[0] === ruleset[Consts.rulesetName]) // filter patches for this ruleset
      if (myPatches.length === 0) { patchedRulesets.push(ruleset); return } // no patches
      ruleset = deepMerge({}, ruleset) // deep clone
      if (idx === 0) firstIsReadOnly = false // first ruleset is not readonly (=> can delete $rulesetName prop)
      myPatches.forEach(patch => {
        const patchPlace = findPath(ruleset, patch.patchPath, 1) // find sub-object of ruleset
        deepMerges(patchPlace, patch.rulesets) // path it
      })
      patchedRulesets.push(ruleset)
    })
  }

  if (patchedRulesets.length === 0) return null

  // merging of used rulesets
  let res: TRuleset = patchedRulesets.length === 1 ? patchedRulesets[0] : (firstIsReadOnly ? immutableMerge(patchedRulesets) : deepMerges(patchedRulesets[0], patchedRulesets.slice(1)))

  // remove $rulesetName from result
  if (res[Consts.rulesetName]) {
    if (res === patchedRulesets[0] && firstIsReadOnly) res = { ...res }
    delete res[Consts.rulesetName]
  }

  return res
}

//****************************
// HELPER EXPORTS
//****************************

export const filterRulesetNames = (sheet: TSheet) => Object.keys(sheet).filter(k => k.charAt(0) != '#')

//see processAddIn

//https://stackoverflow.com/questions/1173549/how-to-determine-if-an-object-is-an-object-literal-in-javascript
export const isObject = obj => typeof obj === 'object' && Object.getPrototypeOf(obj) === Object.prototype

//****************************
// PRIVATE
//****************************

const whenUsedAddInFilter: AddInRulesetFilter = ({ addInSheet, usedRulesetNames }) => filterRulesetNames(addInSheet).filter(key => usedRulesetNames[key]).map(key => addInSheet[key])

//****************************
// GET PATCHES

type Patch = { patchPath: string[], rulesets: TNode[] }

// For mergeRulesets: compute actual patches (based on addIn filters and usedRulesets)
// addInsRoot is not mutated
const getPatches = (addInsRoot: TAddIns, addInRulesetFilters: AddInRulesetFilters, usedRulesets: UsedRulesetNames) => {
  let res: Patch[]
  try {
    res = getPatchLow(addInsRoot, addInRulesetFilters, usedRulesets, false) // optimistic: addIns are not recured => addInsRoot is not mutated
  } catch (error) {
    if (error != getPatchLowWithDeepClone) throw error
    res = getPatchLow(deepMerge({}, addInsRoot), addInRulesetFilters, usedRulesets, true) // recursion occurred => make deep copy of addInsRoot a try again
  }
  return res
}

const getPatchLow = (addInsRoot: TAddIns /*addInsRoot is not mutated*/, addInRulesetFilters: AddInRulesetFilters, usedRulesetNames: UsedRulesetNames, canModify: boolean) => {
  if (!addInsRoot || !addInRulesetFilters) return null
  let rootPatches: Patch[] = [] // patches of top level sheet rulesets
  let addInPatches: Patch[] = [] // pathes for inner addIns rulesets
  for (const addInName in addInsRoot) {
    const addInSheets = addInsRoot[addInName] // addInKey is e.g $whenUsed, $mediaq...
    // get addIn ruleset filter
    const filter = addInRulesetFilters[addInName]
    warning(filter, `Missing filter for ${addInName} addIn`)
    for (const sheetName in addInSheets) {
      // prepare patch for single patch, patchKey = e.g. "root/:active", "add-ins/$whenUsed/add-ins/$mediaq/root/:active/480-640/b/:hover", atc
      const addInSheet = addInSheets[sheetName]
      const patchPath = addInSheet[Consts.data].path as any as string[]
      const isAddIn = patchPath[0] === Consts.$addIns // path starts with addIns/...
      if (!canModify && isAddIn) throw getPatchLowWithDeepClone // cannot modify and patch of addIn occurred => try again with canModify=true (I think that aAddIn recursion will be rare)

      const rulesets = filter({ addInSheet, usedRulesetNames })
      if (!rulesets || rulesets.length === 0) continue

      //const items = { path: patchPath, items: [] }
      const patch: Patch = { patchPath, rulesets }
      const addPatches = isAddIn ? addInPatches : rootPatches
      addPatches.push(patch)
    }
  }
  if (rootPatches.length === 0) return null
  if (addInPatches.length === 0) return rootPatches
  // deep merge addInPatches
  addInPatches.sort((p1, p2) => p2.patchPath.length - p1.patchPath.length)
  addInPatches.forEach(p => {
    const patchPlace = findPath(addInsRoot, p.patchPath, 1)
    if (patchPlace) deepMerges(patchPlace, p.rulesets)
  })
  // for DUMP
  if (DEV_MODE) {
    const develop = {
      rootPatches,
      addInPatches
    }
  }
  // return root patches
  return rootPatches
}
const getPatchLowWithDeepClone = 'getPatchLowWithDeepClone'

const findPath = (root: TNode, path: string[], startIdx?: number) => {
  for (let i = startIdx || 0; i < path.length; i++) root = root[path[i]] as TNode
  return root
}

//****************************
// LINEARIZE

const linearProps = ['$before', '$self', '$web', '$native', '$after']

// process $before, $web, $native and $after props. !!! root is mutated !!!
const linearize = (root: TNode) => {
  let single: TNode = null, array: TNode[] = null, self: TNode = null
  linearProps.forEach((p, idx) => {
    // ignore wrong platform 
    if (window.isWeb && p === '$native' || !window.isWeb && p === '$web') { delete root[p]; return }
    // get value
    let value
    if (p === '$self')
      self = value = root
    else {
      value = root[p]; if (!value) return
      delete root[p]
      warning(isObject(value), 'Object expected for $before, $web, $native or $after props')
      value = linearize(value)
    }
    // use value
    if (!single) single = value // first
    else if (!array) array = [value] //second
    else array.push(value) // third and more
  })
  for (const pp in self) {
    const value = self[pp]
    if (isObject(value)) self[pp] = linearize(value as TNode)
  }
  return array ? deepMerges(single, array) : single
}

//****************************
// EXTRACT PATCHES FROM SHEET TO ADD INS

// extrach $??? addIn parts of ruleset and put them to root.addIns
const extractPatches = (node: TNode, root: TSheetWithAddIns, nodePath: string[]) => {
  for (const nodePropName in node) {
    const subNode = node[nodePropName]
    if (!isObject(subNode)) continue
    if (nodePropName.charAt(0) === '$') {
      delete node[nodePropName]
      processAddIn(subNode as TNode, nodePropName, node, root, nodePath)
    } else
      node[nodePropName] = extractPatches(subNode as TNode, root, [...nodePath, nodePropName])
  }
  return node
}

const processAddIn = (addInNode, addInName, parentNode, root, addInNodePath) => {
  // adjust addIn, e.g. root.addIns.$whenUsed
  const addIns = root.$addIns || (root.$addIns = {})
  const addIn = addIns[addInName] || (addIns[addInName] = {})
  // path
  const actPathStr = addInNodePath.join('/')
  const path = [Consts.$addIns, addInName, actPathStr]
  // create addIn value
  const oldValue = addIn[actPathStr]
  const newValue = extractPatches(addInNode, root, path)
  const newNode = addIn[actPathStr] = oldValue ? deepMerge(oldValue, newValue) : newValue
  // extends with path
  newNode[Consts.data] = { path: addInNodePath }
}

//****************************
// DEEP MERGES

// !!! modify target !!!
const deepMerges = (target, sources: TNode[]) => {
  if (!sources || sources.length === 0) return target
  sources.forEach(source => deepMerge(target, source))
  return target
}

//simple deep merge. !!! modify target !!!
const deepMerge = (target, source) => {
  if (!source) return target
  for (const key in source) {
    const sourcep = source[key], targetp = target[key], sourceObj = isObject(sourcep), targetObj = isObject(targetp)
    warning(!targetp || sourceObj === targetObj, 'deepMerge: cannot merge object and non object')
    target[key] = sourceObj ? deepMerge(targetp || {}, sourcep) : sourcep
  }
  return target
}

// deep merge for case when first source (sources[0]) is large object (e.g. component sheet) and other sources are small patches of sources[0]
const immutableMerge = (sources: TNode[]) => {
  if (!sources) return null
  if (sources.length === 1) return sources[0]
  let count = 0
  let isToMerge = false
  let dest = null
  const objectsToMerge: { [propName: string]: Array<TNode> } = {} // array of objects for object property
  sources.forEach(src => {
    if (!src) return
    count++
    switch (count) {
      case 1: dest = src; break // first
      case 2: dest = { ...dest } // !!! does not break thi case, continue with merging on flat clone
      default: // merge flat cloned dest with src
        for (const propName in src) {
          const destp = dest[propName], srcp = src[propName] as TNode
          if (!destp) { dest[propName] = srcp; continue } // set first scalar or object
          const isDestpObj = isObject(destp), isSrcpObj = isObject(srcp)
          warning(isSrcpObj === isDestpObj, 'Cannot merge object with non-object')
          if (!isSrcpObj) { dest[propName] = srcp; continue } // override scalar
          // two or more objects for 'propName' property
          isToMerge = true
          let canModifyp = objectsToMerge[propName]
          if (!canModifyp) canModifyp = objectsToMerge[propName] = [dest[propName]] // second object => put first (which is in dest[propName])
          canModifyp.push(srcp) // push second or more
        }
    }
  })
  if (isToMerge) // some prop has at least two object for merging => recursion
    for (const p in objectsToMerge) dest[p] = immutableMerge(objectsToMerge[p])
  return dest
}
