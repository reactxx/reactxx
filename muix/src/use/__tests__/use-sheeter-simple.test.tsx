import React from 'react'

import {
  platform, atomizeRuleset, toClassNamesWithQuery,
  $width, setActWidth, useWidths, $WidthsQuery
} from "reactxx-sheeter"

import { initPlatform, dump, mount } from "./init-platform"

const fnc = () => {
  let c = this
  c = null
}

fnc()

describe("UES SHEETER", () => {

    const doTest = (isWeb: boolean) => {
      beforeEach(() => initPlatform(isWeb))
    }

    describe("## NATIVE ##", () => doTest(false))
    describe("## WEB ##", () => doTest(true))
  
  })
  
    