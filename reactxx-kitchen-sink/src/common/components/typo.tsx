import React from 'react'

import { TBasic, TComps, Text } from 'reactxx'

const typo = {
  H1: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 26,
    marginBottom: 10,
  } as TBasic.TextRulesetX,
  H2: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 22,
    marginBottom: 8,
  } as TBasic.TextRulesetX,
  H3: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 18,
    marginBottom: 7,
  } as TBasic.TextRulesetX,
  H4: {
    fontSize: 18,
    marginTop: 14,
    marginBottom: 6
  } as TBasic.TextRulesetX,
  H5: {
    fontSize: 14,
    marginTop: 12,
    marginBottom: 5
  } as TBasic.TextRulesetX,
  B: {
    fontWeight: 'bold'
  } as TBasic.TextRulesetX,
  I: {
    fontStyle: 'italic'
  } as TBasic.TextRulesetX,
  U: {
    textDecorationLine: 'underline'
  } as TBasic.TextRulesetX,
  A: {
    color: 'blue',
    $web: {
      ':hover': { textDecorationLine: 'underline' }
    }
  } as TBasic.TextRulesetX,
  P: {
    marginTop: 6,
    marginBottom: 4,
  } as TBasic.TextRulesetX,
  Blocquote: {
    marginLeft: 30,
    marginTop: 4,
    marginBottom: 4,
  } as TBasic.TextRulesetX,
}

export const H1: TBasic.ComponentTypeX<TComps.TextShape> = props => <Text {...props} className={typo.H1} />
export const H2: TBasic.ComponentTypeX<TComps.TextShape> = props => <Text {...props} className={typo.H2} />
export const H3: TBasic.ComponentTypeX<TComps.TextShape> = props => <Text {...props} className={typo.H3} />
export const H4: TBasic.ComponentTypeX<TComps.TextShape> = props => <Text {...props} className={typo.H4} />
export const H5: TBasic.ComponentTypeX<TComps.TextShape> = props => <Text {...props} className={typo.H5} />
export const P: TBasic.ComponentTypeX<TComps.TextShape> = props => <Text {...props} className={typo.P} />
export const Blocquote: TBasic.ComponentTypeX<TComps.TextShape> = props => <Text {...props} className={typo.Blocquote} />

export const B: TBasic.ComponentTypeX<TComps.TextShape> = props => <Text {...props} className={typo.B} />
export const I: TBasic.ComponentTypeX<TComps.TextShape> = props => <Text {...props} className={typo.I} />
export const U: TBasic.ComponentTypeX<TComps.TextShape> = props => <Text {...props} className={typo.U} />
export const A: TBasic.ComponentTypeX<TComps.TextShape> = props => <Text {...props} className={typo.A} />

