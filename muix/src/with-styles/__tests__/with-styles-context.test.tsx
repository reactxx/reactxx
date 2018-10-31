/** @jsx platform.createElement */
import React from 'react'
import { platform } from 'reactxx-sheeter'

import { initPlatform, mount, ReactAny } from "reactxx-tests";

describe("WITH STYLES CONTEXT", () => {
  it("WEB, with provider", () => doTest(true, true));
  it("WEB, without provider", () => doTest(true, false));
  it("NATIVE, with provider", () => doTest(false, true));
  it("NATIVE, without provider", () => doTest(false, false));
});

const ctx = React.createContext(123)
const doTest = (isWeb: boolean, withProvider: boolean) => {
  const inner = <React.Fragment>
    <ReactAny>Hallo</ReactAny>
    <ReactAny>
      <ctx.Consumer>
        {num => <ReactAny id={num.toString()} />}
      </ctx.Consumer>
    </ReactAny>
  </React.Fragment>
  const comp = mount(withProvider ? <ctx.Provider value={1}>
    {inner}
  </ctx.Provider> : inner)
  expect(comp).toMatchSnapshot();
}
