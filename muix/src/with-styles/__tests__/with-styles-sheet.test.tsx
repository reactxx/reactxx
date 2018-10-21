/** @jsx createElement */
import React from 'react'
import { createElement, toClassNamesWithQuery } from 'reactxx-sheeter'
import { TSheeter, TComponents } from 'reactxx-typings'

import { initPlatform, Shape, ts, shallow, mount } from "reactxx-tests";

export const createSheet = () =>
  (ts.sheet = {
    root: ts.view = {},
    label: ts.text = {},
    webOnly: ts.web = {},
    nativeOnly: ts.nativeText = {},
  });

describe("WITH STYLES", () => {
  it("WEB", () => {
    initPlatform(true);
    const comp = shallow(<div
      classNameX={toClassNamesWithQuery(null, { color: 'red' })}
      //styleX={{ margin: 10, padding: 20 }]}
    >
      Hallo world
    </div>);
    expect(comp).toMatchSnapshot();
    expect(comp.props().className).toMatchSnapshot()
  });
  const ctx = React.createContext(123)
  it("WEB", () => {
    initPlatform(true);
    let comp = mount(<ctx.Provider value={1}>
      <React.Fragment>
        <h1>Hallo</h1>
        <div>
          <ctx.Consumer>
            {num => <div id={num.toString()} />}
          </ctx.Consumer>
        </div>
      </React.Fragment>
    </ctx.Provider>)
    expect(comp).toMatchSnapshot();
    comp = mount(<React.Fragment>
      <h1>Hallo</h1>
      <div>
        <ctx.Consumer>
          {num => <div id={num.toString()} />}
        </ctx.Consumer>
      </div>
    </React.Fragment>
    )
    expect(comp).toMatchSnapshot();
  });
});
