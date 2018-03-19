import React from 'react'

import { Text } from 'reactxx'
import { TSheets, TComps } from 'reactxx-typings'

const typo = {
  H1: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 4,
  } as TSheets.TextRulesetX,
  H2: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  } as TSheets.TextRulesetX,
  H3: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 4,
    marginBottom: 4,
  } as TSheets.TextRulesetX,
  H4: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 4
  } as TSheets.TextRulesetX,
  H5: {
    fontSize: 14,
    marginTop: 4,
    marginBottom: 4
  } as TSheets.TextRulesetX,
  B: {
    fontWeight: 'bold'
  } as TSheets.TextRulesetX,
  I: {
    fontStyle: 'italic'
  } as TSheets.TextRulesetX,
  U: {
    textDecorationLine: 'underline'
  } as TSheets.TextRulesetX,
  A: {
    color: 'blue',
    $web: {
      ':hover': { textDecorationLine: 'underline' }
    }
  } as TSheets.TextRulesetX,
  P: {
    marginTop: 4,
  } as TSheets.TextRulesetX,
  Blocquote: {
    marginLeft: 30,
    marginTop: 4,
    marginBottom: 4,
  } as TSheets.TextRulesetX,
}

export const H1: TSheets.ComponentTypeX<TComps.TextShape> = props => <Text {...props} className={typo.H1} />
export const H2: TSheets.ComponentTypeX<TComps.TextShape> = props => <Text {...props} className={typo.H2} />
export const H3: TSheets.ComponentTypeX<TComps.TextShape> = props => <Text {...props} className={typo.H3} />
export const H4: TSheets.ComponentTypeX<TComps.TextShape> = props => <Text {...props} className={typo.H4} />
export const H5: TSheets.ComponentTypeX<TComps.TextShape> = props => <Text {...props} className={typo.H5} />
export const P: TSheets.ComponentTypeX<TComps.TextShape> = props => <Text {...props} className={typo.P} />
export const Blocquote: TSheets.ComponentTypeX<TComps.TextShape> = props => <Text {...props} className={typo.Blocquote} />

export const B: TSheets.ComponentTypeX<TComps.TextShape> = props => <Text {...props} className={typo.B} />
export const I: TSheets.ComponentTypeX<TComps.TextShape> = props => <Text {...props} className={typo.I} />
export const U: TSheets.ComponentTypeX<TComps.TextShape> = props => <Text {...props} className={typo.U} />
export const A: TSheets.ComponentTypeX<TComps.TextShape> = props => <Text {...props} className={typo.A} />

