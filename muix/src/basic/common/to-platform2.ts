import warning from 'warning'

//****************************
// TYPINGS
//****************************

//****************************
// SHEET HIEARCHY

export interface TSheetWithAddIns extends TSheet {
  $addIns: TAddIns
}
export type TAddIns = { [addInsName: string]: TSheets }
export type TSheets = { [rulesetName: string]: TSheet }
export type TSheet = { [rulesetName: string]: TRuleset }
export interface TRuleset extends TNode {
  $rulesetName?: string
}
export type TNode = { [ruleName: string]: TNode | string | string[] | number | TSheets }

//****************************
// FILTERS

export type UsedRulesetNames = { [rulesetName: string]: boolean }
export interface SheetItemFilterPar {
  usedRulesetNames?: UsedRulesetNames
  rulesetName: string
}
export type SheetItemFilter = (par: SheetItemFilterPar) => boolean
export type SheetItemFilters = { [addInName: string]: SheetItemFilter }

//****************************
// OTHER

// hook for custom addIn processing
export type TProcessAddIn = (value: TNode, name: string, act: TNode, root: TSheetWithAddIns, actPath: string[], processAddIn: TProcessAddIn) => void

// consts
export enum Consts {
  $addIns = '$addIns',
  $whenUsed = '$whenUsed',
  path = '#path',
}

//****************************
// MAIN EXPORTS
//****************************

// transform sheet to mergable and patchable form. !!! root is mutated !!!
export const toPatchableAndMergeable = (root: TSheet, options?: { processAddIn?: TProcessAddIn; isComponentSheet?: boolean }) => {
  root = linearize(root) // in-place processing of $before, $web, $native and $after ruleset props
  const res = extractPatches(root, root as TSheetWithAddIns, [], options && options.processAddIn || processAddIn) // extract addIn props of ruleset (starting with $, e.g. $whenUsed, $mediaq) etc.
  if (options && options.isComponentSheet) nameRulesets(res)
  return res
}

// merge rulesets in component code and apply addIn patches
export const mergeRulesets = (sheet: TSheetWithAddIns, filters: SheetItemFilters, ...rulesets: TRuleset[]) => {
  if (!rulesets || rulesets.length === 0) return null
  // get used ruleset's (for whenUses processing)
  const addIns = sheet.$addIns
  const whenUsed = addIns && addIns.$whenUsed
  let usedRulesets: UsedRulesetNames = null
  if (whenUsed) rulesets.forEach(ruleset => {
    if (!ruleset) return
    if (ruleset.$rulesetName) (usedRulesets || (usedRulesets = {}))[ruleset.$rulesetName as string] = true
  })

  let firstIsReadOnly = true
  let patchedRulesets: TRuleset[]
  if (!addIns)
    patchedRulesets = rulesets
  else {
    patchedRulesets = []
    const patches = getPatches(addIns, filters, usedRulesets) // compute actual patches (based on addIn filters and usedRulesets)
    rulesets.forEach((ruleset, idx) => {
      if (!ruleset) return
      if (!ruleset.$rulesetName) { patchedRulesets.push(ruleset); return } // not named ruleset
      const myPatches = patches.filter(p => p.path[0] === ruleset.$rulesetName) // patches for this named ruleset
      if (myPatches.length === 0) { patchedRulesets.push(ruleset); return } // no patches
      ruleset = deepMerge({}, ruleset) // deep clone
      if (idx === 0) firstIsReadOnly = false // first ruleset is not readonly (=> can delete $rulesetName prop)
      myPatches.forEach(patch => {
        const patchPlace = findPath(ruleset, patch.path, 1)
        deepMerges(patchPlace, patch.items)
      })
      patchedRulesets.push(ruleset)
    })
  }

  if (patchedRulesets.length === 0) return null

  // merging
  let res: TRuleset = patchedRulesets.length === 1 ? patchedRulesets[0] : (firstIsReadOnly ? immutableMerge(patchedRulesets) : deepMerges(patchedRulesets[0], patchedRulesets.slice(1)))

  // remove $rulesetName from result
  if (res.$rulesetName) {
    if (res === patchedRulesets[0] && firstIsReadOnly) res = { ...res }
    delete res.$rulesetName
  }

  return res
}

//****************************
// HELPER EXPORTS
//****************************

export const processAddIn: TProcessAddIn = (value, name, act, root, actPath, processAddIn) => {
  // adjust addIn, e.g. root.addIns.$whenUsed
  const addIns = root.$addIns || (root.$addIns = {})
  const addIn = addIns[name] || (addIns[name] = {})
  // path
  const actPathStr = actPath.join('/')
  const path = [Consts.$addIns, name, actPathStr]
  // create addIn value
  const oldValue = addIn[actPathStr]
  const newValue = extractPatches(value, root, path, processAddIn)
  const newNode = addIn[actPathStr] = oldValue ? deepMerge(oldValue, newValue) : newValue
  // extends with path
  newNode[Consts.path] = actPath
}

//https://stackoverflow.com/questions/1173549/how-to-determine-if-an-object-is-an-object-literal-in-javascript
export const isObject = obj => typeof obj === 'object' && Object.getPrototypeOf(obj) === Object.prototype

//****************************
// PRIVATE
//****************************

const whenUsedAddInFilter: SheetItemFilter = ({ rulesetName, usedRulesetNames }) => !usedRulesetNames || usedRulesetNames[rulesetName]

//****************************
// GET PATCHES

type Patch = { path: string[], items: TNode[] }

// compute actual patches (based on addIn filters and usedRulesets). addInsRoot cannot be mutated
const getPatches = (addInsRoot: TAddIns, filters: SheetItemFilters, usedRulesets: UsedRulesetNames) => {
  let res: Patch[]
  try {
    res = getPatchLow(addInsRoot, filters, usedRulesets, false) // optimistic: addIns are not recured => addInsRoot is not mutated
  } catch (error) {
    if (error != getPatchLowWithDeepClone) throw error
    res = getPatchLow(deepMerge({}, addInsRoot), filters, usedRulesets, true) // recursion occurred => make deep copy of addInsRoot a try again
  }
  return res
}

const getPatchLow = (addInsRoot: TAddIns, filters: SheetItemFilters, usedRulesets: UsedRulesetNames, canModify: boolean) => {
  if (!addInsRoot || !filters) return null
  let rootPatches: Patch[] = [] // patches of top level sheet rulesets
  let addInPatches: Patch[] = [] // pathes for inner addIns rulesets
  for (const addInKey in addInsRoot) {
    const addIn = addInsRoot[addInKey] // addInKey is e.g $whenUsed, $mediaq...
    // get addIn ruleset filter
    const filter = addInKey === Consts.$whenUsed ? whenUsedAddInFilter : filters[addInKey]
    warning(filter, `Missing filter for ${addInKey} addIn`)
    for (const patchKey in addIn) {
      // prepare patch for single patch, patchKey = e.g. "root/:active", "add-ins/$whenUsed/add-ins/$mediaq/root/:active/480-640/b/:hover", atc
      const patch = addIn[patchKey]
      const patchPath = patch[Consts.path] as any as string[]
      const items = { path: patchPath, items: [] }
      const isAddIn = patchPath[0] === Consts.$addIns // path starts with addIns/...
      if (!canModify && isAddIn) throw getPatchLowWithDeepClone // addIn patch occurred => try again with canModify=true
      const addPatches = isAddIn ? addInPatches : rootPatches
      addPatches.push(items)
      // put filtered items to patch
      for (const pathItemKey in patch) {
        // pathItemKey is e.g. "480-600" for $mediaq, "disabled" for $whenUsed...
        if (pathItemKey === Consts.path || !filter({ rulesetName: pathItemKey, usedRulesetNames: usedRulesets })) continue
        const patchItem = patch[pathItemKey]
        if (!isObject(patchItem)) continue
        items.items.push(patchItem)
      }
    }
  }
  if (rootPatches.length === 0) return null
  if (addInPatches.length === 0) return rootPatches
  // deep merge addInPatches
  addInPatches.sort((p1, p2) => p2.path.length - p1.path.length)
  addInPatches.forEach(p => {
    const patchPlace = findPath(addInsRoot, p.path, 1)
    deepMerges(patchPlace, p.items)
  })
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
// EXTRACT PATCHES

// extrach $??? addIn parts of ruleset and put them to root.addIns
const extractPatches = (act: TNode, root: TSheetWithAddIns, actPath: string[], processAddIn: TProcessAddIn) => {
  for (const p in act) {
    const value = act[p]
    if (!isObject(value)) continue
    if (p.charAt(0) === '$') {
      delete act[p]
      processAddIn(value as TNode, p, act, root, actPath, processAddIn)
    } else
      act[p] = extractPatches(value as TNode, root, [...actPath, p], processAddIn)
  }
  return act as TSheetWithAddIns
}

// for component sheet only: assign name to ruleset. Roleset of other sheet (inner sheets, classes prop etc.) are not named
const nameRulesets = (root: TSheetWithAddIns) => {
  const addIns = root.$addIns; if (!addIns) return
  for (const p in root) if (p.charAt(0) != '$') root[p].$rulesetName = p
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

//************************************************************************************************************************************************************************
//************************************************************************************************************************************************************************
// TEST
//************************************************************************************************************************************************************************
//************************************************************************************************************************************************************************

//****************************
// CODE

export const test = () => {
  const res = toPatchableAndMergeable(root, { isComponentSheet: true })
  debugger
  const merged = mergeRulesets(res, {
    '$mediaq': ({ rulesetName, usedRulesetNames }) => {
      return true
    }
  }, res.root, false as any, res.b, null as any)
  //const patches = getPatches(res.$addIns, { '$mediaq': path => true, '$whenUsed': path => true })
  return res
}

//****************************
// INPUT DATA

const root: TSheet = {
  root: {
    a0: 1,
    $web: {
      a1: 1,
      ":active": {
        a2: 1,
        $before: {
          $mediaq: {
            //a3: 1, => error
            '100-200': {
              a3: 1,
              $whenUsed: {
                b: {
                  a4: 1,
                  $after: {
                    $web: {
                      a5: 1,
                      ":hover": {
                        a6: 1,
                        $mediaq: {
                          '200-300': {
                            a7: 1,
                          }
                        } as TSheet
                      },
                    },
                    ":hover": {
                      $mediaq: {
                        '300-400': {
                          a8: 1,
                        }
                      } as TSheet
                    }
                  },
                },
              } as TSheet,
            },
          } as TSheet,
        },
      },
    },
  },
  b: {}
}

//window['isWeb'] = true

//****************************
// 

const _toPatchableAndMergeable = {
  "root": {
    "a0": 1,
    "a1": 1,
    ":active": {
      "a2": 1
    }
  },
  "b": {},
  "$addIns": {
    "$mediaq": {
      "$addIns/$whenUsed/$addIns/$mediaq/root/:active/100-200/b/:hover": {
        "300-400": {
          "a8": 1
        },
        "200-300": {
          "a7": 1
        },
        "#path": [
          "$addIns",
          "$whenUsed",
          "$addIns/$mediaq/root/:active/100-200",
          "b",
          ":hover"
        ]
      },
      "root/:active": {
        "100-200": {
          "a3": 1
        },
        "#path": [
          "root",
          ":active"
        ]
      }
    },
    "$whenUsed": {
      "$addIns/$mediaq/root/:active/100-200": {
        "b": {
          "a4": 1,
          ":hover": {
            "a6": 1
          },
          "a5": 1
        },
        "#path": [
          "$addIns",
          "$mediaq",
          "root/:active",
          "100-200"
        ]
      }
    }
  }
}


const patches = [
  {
    "path": [
      "$addIns",
      "$whenUsed",
      "$addIns/$mediaq/root/:active/100-200",
      "b",
      ":hover"
    ],
    "items": [
      {
        "a8": 1
      },
      {
        "a7": 1
      }
    ]
  },
  {
    "path": [
      "root",
      ":active"
    ],
    "items": [
      {
        "a3": 1
      }
    ]
  },
  {
    "path": [
      "$addIns",
      "$mediaq",
      "root/:active",
      "100-200"
    ],
    "items": [
      {
        "a4": 1,
        ":hover": {
          "a6": 1
        },
        "a5": 1
      }
    ]
  }
]

const result = {
  "a0": 1,
  "a1": 1,
  ":active": {
    "a2": 1,
    "a3": 1,
    "a4": 1,
    ":hover": {
      "a6": 1,
      "a8": 1,
      "a7": 1
    },
    "a5": 1
  }
}