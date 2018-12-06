import ReactN from 'react-native'
import React from 'react'
import { TTyped, V } from 'reactxx-typings'

interface Shape {
  root: {
    web: React.HTMLAttributes<Element>
    native: TTyped.TNativeProps
  }
  className: getRootClassName<this>
}

type getRoot<R extends Shape> = R['root']
type getRootWeb<R extends Shape> = getRoot<R>['web']
type getRootNative<R extends Shape> = getRoot<R>['native']

type getRootProps<R extends Shape> = { web: getRootWeb<R>; native: getRootNative<R> }
type getRootPropsWeb<R extends Shape> = getRootProps<R>['web']
type getRootPropsNative<R extends Shape> = getRootProps<R>['native']
type getRootClassName<R extends Shape> = TTyped.TNativePropsToStyle<getRootPropsNative<R>>
type getClassName<R extends Shape> = R['className']


interface Shape1 extends Shape {
  root: never
}

interface Shape2 extends Shape {
  root: getRootProps<Shape4>
  sheet: typeof sheet2
}

const RootStyle = (...pars: TTyped.Ruleset<getClassName<Shape2>>[]) => null as getClassName<Shape2>

const sheet2 = {
  root: RootStyle(
    { color: 'red' }
  ),
  label: {

  } as any as V
}

interface Shape3 extends Shape {
  root: getRootProps<Shape2>
}

interface Shape4 extends Shape {
  root: {
    web: React.AnchorHTMLAttributes<HTMLAnchorElement>
    native: ReactN.TextProperties
    //native: ReactN.ViewProperties // ERROR
  }
}

interface Shape5 extends Shape {
  root: getRootProps<Shape4>
}

interface Shape6 extends Shape {
  root: getRootProps<Shape5>
}

type S1 = getRootProps<Shape1>
type S2 = getRootProps<Shape2>
type S3 = getRootProps<Shape3>

type S4 = getRootProps<Shape4>
type S5 = getRootProps<Shape5>
type S6 = getRootProps<Shape6>

type R1 = getClassName<Shape1>
type R2 = getClassName<Shape2>
type R3 = getClassName<Shape3>

type R4 = getClassName<Shape4>
type R5 = getClassName<Shape5>
type R6 = getClassName<Shape6>

type r2 = getClassName<Shape2>

