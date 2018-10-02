import React from 'react'

import { parsePropDef } from '../utils'

const test_parsePropDef = () => {

    let res = JSON.stringify([
        parsePropDef('20-30', 1000),
        parsePropDef('-20', 1000),
        parsePropDef('30-', 1000),

        parsePropDef('250', 1000),
        parsePropDef(',100', 1000),
        parsePropDef('250,', 1000),
        parsePropDef('250,100', 1000),
    ], null, 2)

    res = JSON.stringify([
        parsePropDef('', 1000),

        parsePropDef('0-100', 1000),
        parsePropDef('-100', 1000),
        parsePropDef('0-', 1000),

        parsePropDef('1000', 1000),
        parsePropDef('1000,0', 1000),
        parsePropDef('1000,', 1000),
        parsePropDef(',0', 1000),
    ], null, 2)


    //ERRORS
    parsePropDef('30-20', 1000);
    parsePropDef('-101', 1000);
    parsePropDef('101-', 1000);
    parsePropDef('1001', 1000);
    parsePropDef('500,501', 1000);
    parsePropDef(',1001', 1000);
    parsePropDef('1001,', 1000);
}

// test_parsePropDef()

const App: React.SFC = () => null

export default App