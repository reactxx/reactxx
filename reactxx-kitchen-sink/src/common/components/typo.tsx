import React from 'react'

import { Types, Text } from 'reactxx'
import { TComps } from 'reactxx-primitives'


const typo = {
  H1: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 26,
    marginBottom: 10,
  } as Types.TextRulesetX,
  H2: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 22,
    marginBottom: 8,
  } as Types.TextRulesetX,
  H3: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 18,
    marginBottom: 7,
  } as Types.TextRulesetX,
  H4: {
    fontSize: 18,
    marginTop: 14,
    marginBottom: 6
  } as Types.TextRulesetX,
  H5: {
    fontSize: 14,
    marginTop: 12,
    marginBottom: 5
  } as Types.TextRulesetX,
  B: {
    fontWeight: 'bold'
  } as Types.TextRulesetX,
  I: {
    fontStyle: 'italic'
  } as Types.TextRulesetX,
  U: {
    textDecorationLine: 'underline'
  } as Types.TextRulesetX,
  A: {
    color: 'blue',
    $web: {
      ':hover': { textDecorationLine: 'underline' }
    }
  } as Types.TextRulesetX,
  P: {
    marginTop: 6,
    marginBottom: 4,
  } as Types.TextRulesetX,
  Blocquote: {
    marginLeft: 30,
    marginTop: 4,
    marginBottom: 4,
  } as Types.TextRulesetX,
}

export const H1: Types.ComponentTypeX<TComps.TextShape> = props => <Text {...props} className={typo.H1} />
export const H2: Types.ComponentTypeX<TComps.TextShape> = props => <Text {...props} className={typo.H2} />
export const H3: Types.ComponentTypeX<TComps.TextShape> = props => <Text {...props} className={typo.H3} />
export const H4: Types.ComponentTypeX<TComps.TextShape> = props => <Text {...props} className={typo.H4} />
export const H5: Types.ComponentTypeX<TComps.TextShape> = props => <Text {...props} className={typo.H5} />
export const P: Types.ComponentTypeX<TComps.TextShape> = props => <Text {...props} className={typo.P} />
export const Blocquote: Types.ComponentTypeX<TComps.TextShape> = props => <Text {...props} className={typo.Blocquote} />

export const B: Types.ComponentTypeX<TComps.TextShape> = props => <Text {...props} className={typo.B} />
export const I: Types.ComponentTypeX<TComps.TextShape> = props => <Text {...props} className={typo.I} />
export const U: Types.ComponentTypeX<TComps.TextShape> = props => <Text {...props} className={typo.U} />
export const A: Types.ComponentTypeX<TComps.TextShape> = props => <Text {...props} className={typo.A} />

