/** @jsx Sheeter.createElement */
import React from 'react'

import * as Sheeter from 'reactxx-sheeter'
import * as WithStyle from 'reactxx-with-styles'
import { createElement, toClassNamesWithQuery } from 'reactxx-sheeter'
import { TSheeter, TComponents } from 'reactxx-typings'

import { initPlatform, Shape, ts, shallow, mount } from "reactxx-tests";


describe("WITH STYLES", () => {
  it("WEB", () => {
    initPlatform(true);
    const comp = mount(<Comp
    >
      Hallo world
    </Comp>);
    expect(comp).toMatchSnapshot();
  });
});

export const createSheet = () =>
  (ts.sheet = {
    root: ts.view = {
      backgroundColor: 'gray'
    },
    label: ts.text = {},
    webOnly: ts.web = {},
    nativeOnly: ts.nativeText = {},
  });


const comp: TComponents.SFCCode<Shape> = ({classes, classNameX, toClassNames}) => {
  const root = toClassNames([classes.root, classNameX])
  return <div classNameX={root}>
    Hallo world
  </div>
}

const Comp = WithStyle.withStylesCreator<Shape>(createSheet(), comp)()

