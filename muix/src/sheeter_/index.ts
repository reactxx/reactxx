//****************************
// sheet processing magic
//****************************

import warning from 'warning';

export * from './animations/index';
export * from './mediaq';
export * from './when-used';

//****************************
// TYPINGS
//****************************

// consts
export const enum Consts {
  $system = '$system',
  $sheetSwitch = '$sheetSwitch',
  path = '#path',
  rulesetName = '#rulesetName',
  //canModify = '#canModify',
  data = '#data',
  dataObservedBits = 'observedBits',
}

//****************************
// SHEET HIEARCHY

export interface SheetWithAddIns extends Sheet {
  //[Consts.canModify]?
  $system: AddIns
}
export type AddIns = { [addInsName: string]: Sheets }
export type Sheets = { [sheetName: string]: Sheet }
export type Sheet = { [rulesetName: string]: Ruleset }
export interface Ruleset extends Node {
  [Consts.rulesetName]?: string
}
export type Node = { [ruleName: string]: Node | any }

//****************************
// FILTERS

export type UsedRulesetNames = { [rulesetName: string]: boolean }
export interface AddInRulesetPar {
  usedRulesetNames?: UsedRulesetNames
  addInSheet: Sheet
}
export type RulesetPatchGetter = (par: AddInRulesetPar) => Ruleset[]
export type RulesetPatchGetters = { [addInName: string]: RulesetPatchGetter }

export type PropsPatchGetter = (par: {}, patches: Array<{}>) => void
export type PropsPatchGetters = { [addInName: string]: PropsPatchGetter }
//****************************
// OTHER

// hook for custom addIn processing
export type FinishAddIn = (addInItem: {}) => void
export type FinishAddIns = { [addInName: string]: FinishAddIn }

//****************************
// EXPORTS FOR PROPS
//****************************

export const finishProps = (root: Sheet, onFinishAddInProps: FinishAddIns) => {
  root = linearize(root) // in-place processing of $before, $web, $native and $after ruleset props
  extractPropsPatches(root) as SheetWithAddIns // move props (starting with $, e.g. $mediaq) to root.$system
  // move $-props (for which onFinishAddInProps exists) to root.$system.addIns
  if (root.$system && onFinishAddInProps)
    for (const p in root.$system) {
      const finish = onFinishAddInProps[p]
      if (finish) {
        finish(root.$system[p])
        //const addIns = root.$system.addIns || (root.$system.addIns = {})
        //addIns[p] = finish(root.$system[p])
        //delete root.$system[p]
      }
    }
  return root
}

export const getPropsPatch = (addInsRoot: AddIns /*addInsRoot is not mutated*/, propsPatchGetters: PropsPatchGetters) => {
  if (!propsPatchGetters) return null
  const res = []
  for (const p in addInsRoot) {
    const addIn = addInsRoot[p], proc = propsPatchGetters[p]
    if (!addIn || !proc) continue
    proc(addIn, res)
  }
  return res.length === 0 ? null : res
}

//****************************
// EXPORTS FOR SHEET
//****************************

//export const setCanModify = (root: SheetWithAddIns) => root[Consts.canModify] = true

// transform sheet to mergable and patchable form. !!! root is mutated !!!
export const toPatchableAndMergeable = (root: Sheet) => {
  root = linearize(root) // in-place processing of $before, $web, $native and $after ruleset props
  const res = extractPatches(root, root as SheetWithAddIns, []) as SheetWithAddIns // extract addIn props of ruleset (starting with $, e.g. $mediaq) etc.
  return res
}

// merging patchable and mergeable sheets
export const mergeSheets = (sheet: SheetWithAddIns, modifiers: SheetWithAddIns[], canModify: boolean) => {
  // deep merge
  if (modifiers && modifiers.length >= 1) sheet = canModify ? deepMerges(sheet, modifiers) : immutableMerge([sheet, ...modifiers])
  return sheet
}
export const mergeSheetsAndFinish = (sheet: SheetWithAddIns, modifiers: SheetWithAddIns[], onFinishAddInClasses: FinishAddIns, canModify?: boolean) => {
  // deep merge
  sheet = mergeSheets(sheet, modifiers, canModify)
  sheet = finishAddInsClasses(sheet, onFinishAddInClasses, canModify)
  nameRulesets(sheet)
  return sheet
}

// merge rulesets in component code (and apply addIn patches)
export const mergeRulesetsForCode = (sheet: SheetWithAddIns, rulesetPatchGetters: RulesetPatchGetters, rulesets: Ruleset[]) => {
  if (!rulesets || (rulesets = rulesets.filter(r => !!r)).length === 0) return null
  const addIns = sheet.$system

  // get used ruleset's (for $whenUses processing)
  const $sheetSwitch = addIns && addIns.$sheetSwitch
  let usedRulesets: UsedRulesetNames = null
  if ($sheetSwitch) rulesets.forEach(ruleset => {
    if (!ruleset || !ruleset[Consts.rulesetName]) return
    (usedRulesets || (usedRulesets = {}))[ruleset[Consts.rulesetName]] = true
  })

  // apply patch to rulesets
  let firstIsReadOnly = true
  let patchedRulesets = rulesets
  const patches = addIns && getPatches(addIns, rulesetPatchGetters, usedRulesets) // compute actual patches (based on addIn filters and usedRulesets)
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
  let res: Ruleset = patchedRulesets.length === 1 ? patchedRulesets[0] : (firstIsReadOnly ? immutableMerge(patchedRulesets) : deepMerges(patchedRulesets[0], patchedRulesets.slice(1)))

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

export const filterRulesetNames = (sheet: Sheet) => Object.keys(sheet).filter(k => k.charAt(0) != '#')

//see processAddIn

//https://stackoverflow.com/questions/1173549/how-to-determine-if-an-object-is-an-object-literal-in-javascript
export const isObject = obj => !!(obj && typeof obj === 'object' && !obj.$$typeof && Object.getPrototypeOf(obj) === Object.prototype)

//****************************
// PRIVATE
//****************************

const nameRulesets = (sheet: SheetWithAddIns) => {
  //if (!sheet.$system) return
  const ignore = { '$': true, '#': true }
  //if (sheet.$system)
  for (const p in sheet) if (!ignore[p.charAt(0)]) sheet[p][Consts.rulesetName] = p
}

const finishAddInsClasses = (sheet: SheetWithAddIns, onFinishAddInClasses: FinishAddIns, canModify: boolean) => {
  if (!sheet.$system || !onFinishAddInClasses) return sheet
  //const canModify = sheet[Consts.canModify]
  // clone when needed
  if (!canModify) sheet = { ...sheet, $system: { ...sheet.$system } }
  for (const addInName in sheet.$system) {
    const proc = onFinishAddInClasses[addInName]
    if (proc) {
      let addInItem = sheet.$system[addInName]
      if (!canModify) addInItem = sheet.$system[addInName] = { ...addInItem } // clone
      proc(addInItem)
    }
  }
  return sheet
}

//****************************
// GET PATCHES

type Patch = { patchPath: string[], rulesets: Node[] }

// For mergeRulesets: compute actual patches (based on addIn filters and usedRulesets)
// addInsRoot is not mutated
const getPatches = (addInsRoot: AddIns, addInRulesetFilters: RulesetPatchGetters, usedRulesets: UsedRulesetNames) => {
  let res: Patch[]
  try {
    res = getPatchLow(addInsRoot, addInRulesetFilters, usedRulesets, false) // optimistic: addIns are not recured => addInsRoot is not mutated
  } catch (error) {
    if (error != getPatchLowWithDeepClone) throw error
    res = getPatchLow(deepMerge({}, addInsRoot), addInRulesetFilters, usedRulesets, true) // recursion occurred => make deep copy of addInsRoot a try again
  }
  return res
}

const getPatchLow = (addInsRoot: AddIns /*addInsRoot is not mutated*/, rulesetPatchGetters: RulesetPatchGetters, usedRulesetNames: UsedRulesetNames, canModify: boolean) => {
  if (!addInsRoot || !rulesetPatchGetters) return null
  let rootPatches: Patch[] = [] // patches of top level sheet rulesets
  let addInPatches: Patch[] = [] // pathes for inner addIns rulesets
  for (const addInName in addInsRoot) {
    const addInSheets = addInsRoot[addInName] // addInKey is e.g $sheetSwitch, $mediaq...
    // get addIn ruleset filter
    const filter = rulesetPatchGetters[addInName]
    if (!filter) continue
    //warning(filter, `Missing filter for ${addInName} addIn`)
    for (const sheetName in addInSheets) {
      // prepare patch for single patch, patchKey = e.g. "root/:active", "add-ins/$sheetSwitch/add-ins/$mediaq/root/:active/480-640/b/:hover", atc
      const addInSheet = addInSheets[sheetName]
      const patchPath = addInSheet[Consts.data].path as any as string[]
      const isAddIn = patchPath[0] === Consts.$system // path starts with addIns/...
      if (!canModify && isAddIn) throw getPatchLowWithDeepClone // cannot modify and patch of addIn occurred => try again with canModify=true (I think that aAddIn recursion will be rare)

      //const rulesets = filter({ addInSheet: addInSheets as any, usedRulesetNames })
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
  if (window.__DEV__) {
    const develop = {
      rootPatches,
      addInPatches
    }
  }
  // return root patches
  return rootPatches
}
const getPatchLowWithDeepClone = 'getPatchLowWithDeepClone'

const findPath = (root: Node, path: string[], startIdx?: number) => {
  for (let i = startIdx || 0; i < path.length; i++) root = root[path[i]] as Node
  return root
}

//****************************
// LINEARIZE

const linearProps = ['$before', '$self', '$web', '$native', '$after']

// process $before, $web, $native and $after props. !!! root is mutated !!!
export const linearize = (root: Node) => {
  let single: Node = null, array: Node[] = null, self: Node = null
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
    if (isObject(value)) self[pp] = linearize(value as Node)
  }
  return array ? deepMerges(single, array) : single
}

//****************************
// EXTRACT PATCHES FROM SHEET TO ADD INS

const extractPropsPatches = (node: Node) => {
  const addIns = node.$system || (node.$system = {})
  for (const nodePropName in node) {
    if (nodePropName.charAt(0) !== '$' || nodePropName === '$system') continue
    addIns[nodePropName] = node[nodePropName]
    delete node[nodePropName]
  }
  return node
}

// extrach $??? addIn parts of ruleset and put them to root.addIns
const extractPatches = (node: Node, root: SheetWithAddIns, nodePath: string[]) => {
  for (const nodePropName in node) {
    if (nodePropName === '$system') continue
    const subNode = node[nodePropName]
    if (!isObject(subNode)) continue
    if (nodePropName.charAt(0) === '$') {
      delete node[nodePropName]
      if (nodePath.length === 0) {
        const addIns = root.$system || (root.$system = {})
        addIns[nodePropName] = subNode
      } else
        processAddIn(subNode as Node, nodePropName, node, root, nodePath)
    } else
      node[nodePropName] = extractPatches(subNode as Node, root, [...nodePath, nodePropName])
  }
  return node
}

const processAddIn = (addInNode, addInName, parentNode, root, addInNodePath) => {
  // adjust addIn, e.g. root.addIns.$sheetSwitch
  const addIns = root.$system || (root.$system = {})
  const addIn = addIns[addInName] || (addIns[addInName] = {})
  // path
  const actPathStr = addInNodePath.join('/')
  const path = [Consts.$system, addInName, actPathStr]
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
export const deepMerges = (target, sources: Node[]) => {
  if (!sources || sources.length === 0) return target
  sources.forEach(source => deepMerge(target, source))
  return target
}

//simple deep merge. !!! modify target !!!
export const deepMerge = (target, source) => {
  if (!source) return target
  for (const key in source) {
    const sourcep = source[key], targetp = target[key], sourceObj = isObject(sourcep), targetObj = isObject(targetp)
    warning(!targetp || sourceObj === targetObj, 'deepMerge: cannot merge object and non object')
    target[key] = sourceObj ? deepMerge(targetp || {}, sourcep) : sourcep
  }
  return target
}

// deep merge for case when first source (sources[0]) is large object (e.g. component sheet) and other sources are small patches of sources[0]
export const immutableMerge = (sources: Node[]) => {
  if (!sources) return null
  if (sources.length === 1) return sources[0]
  let count = 0
  let isToMerge = false
  let dest = null
  const objectsToMerge: { [propName: string]: Array<Node> } = {} // array of objects for object property
  sources.forEach(src => {
    if (!src) return
    count++
    switch (count) {
      case 1: dest = src; break // first
      case 2: dest = { ...dest } // !!! does not break thi case, continue with merging on flat clone
      default: // merge flat cloned dest with src
        for (const propName in src) {
          if (propName.charAt(0) === '#') continue
          const destp = dest[propName], srcp = src[propName] as Node
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
