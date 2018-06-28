import React from 'react'
import ReactN from 'react-native'
import warning from 'warning'

import { TCommonStyles } from '../typings/common-styles'
import { TCommon } from '../typings/common'
import { Types } from '../typings/types'


//****************************
// TYPING - SOURCE
//****************************
export type Ruleset = { [propName: string]: any }

export type Sheet = { [rulesetName: string]: Ruleset }

//****************************
// TYPING - TARGET
//****************************
export type Value = Fragment | string | number | boolean
export const enum FragmentType { other, ruleset, sheet }

export interface Fragment {
  $type?: FragmentType
  [propName: string]: Value
  //$web: Fragment
  //$native: Fragment
  //$before: Fragment
  //$after: Fragment
  //$media: SubSheetFragments
  //$whenUsed: SubSheetFragments
}
export type Fragments = Fragment[]

export interface RulesetFragments extends Fragment {
  $rulesetName?: string
}

//****************************
// LINEARIZE
//****************************
const sheetsToFragments = (sheets: Sheet[], named?: boolean) => {
  if (!sheets || sheets.length === 0) return null
  if (sheets.length === 1) {
    const rulesets = {}
    for (const p in rulesets) {
      const fragments = rulesetToFragments(sheets[0][p])
      rulesets[p] = named ? { rulesetName: p, fragments } as RulesetFragments : fragments
    }
    return rulesets
  } else {
    const rulesets: { [name: string]: {}[] } = {}
    sheets.forEach(sheet => {
      for (const p in sheet) {
        const rulesetsp = rulesets[p] || (rulesets[p] = []), ruleset = sheet[p]
        rulesetsp.push(ruleset)
      }
    })
    for (const p in rulesets) {
      const fragments = Array.prototype.concat.apply(rulesetToFragments(rulesets[p]))
      rulesets[p] = named ? { rulesetName: p, fragments } as RulesetFragments : fragments
    }
    return rulesets
  }
}

const propOrder = {
  'before': 1,
  'web': 3,
  'native': 4,
  'after': 6,
}
const addInOrder = 5
const otherOrder = 2


const rulesetToFragments = (ruleset: Ruleset) => {
  let hasSystem = false
  const keys = Object.keys(ruleset).map(key => {
    const res = { key, value: ruleset[key], order: propOrderValue(key) }
    if (res.order != otherOrder) hasSystem = true
    return res
  })
  switch (keys.length) {
    case 0: return null
    case 1: return null
    default: {
      const orderedKeys = keys.sort((a, b) => a.order - b.order)
      orderedKeys.forEach(propInfo => { })
    }
  }
}
const propOrderValue = (propName: string) => {
  const order = propOrder[propName]
  if (order) return order
  if (propName.charAt(0) === '$') return addInOrder
  return otherOrder
}
