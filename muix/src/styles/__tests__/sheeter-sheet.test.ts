import { $W, $T, $V, $I, V, T, I, } from 'reactxx-typings'
import { getTypedEngine, atomizeSheet, mergeSheets } from 'reactxx-styles'

//import {  } from "reactxx-styles"
import { initPlatform, Shape as ShapeLow, theme } from "./init-platform.t"

interface Shape extends ShapeLow {
  sheetQuery: {color: string}  
}

const {
  THEMED, IF, WEB, NATIVE, STYLE, COMPILE
} = getTypedEngine<Shape>()

describe("SHEET", () => {
  const doTest = (isWeb: boolean) => {
    beforeEach(() => initPlatform(isWeb))
    let sheet

    it("01 null", () => {
      const sheet = atomizeSheet(null)
      expect(sheet).toMatchSnapshot()
    })
    it("02 {}", () => {
      const sheet = atomizeSheet({})
      expect(sheet).toMatchSnapshot()
    })
    it("03 backgroundColor: 'red'", () => {
      const sheet = atomizeSheet({
        root: { backgroundColor: 'red' }
      })
      expect(sheet).toMatchSnapshot()
    })
    it("04 merge", () => {
      const sheet = mergeSheets(null)
      expect(sheet).toMatchSnapshot()
    })
    it("05 merge", () => {
      const sheet = mergeSheets([])
      expect(sheet).toMatchSnapshot()
    })
    it("06 merge", () => {
      const sheet = mergeSheets([null, {}, undefined])
      expect(sheet).toMatchSnapshot()
    })
    it("07 merge", () => {
      const sheet = mergeSheets([
        null, {}, undefined,
        atomizeSheet({
          root: STYLE<V>({ backgroundColor: 'green' }),
          label: STYLE<T>({ color: 'green' }),
        }) as any,
      ])
      expect(sheet).toMatchSnapshot()
    })
    it("08 merge", () => {
      sheet = mergeSheets([
        atomizeSheet({
          root: STYLE<V>({ backgroundColor: 'red' }),
          label: STYLE<T>({ color: 'red' }),
        }),
        atomizeSheet({
          root: STYLE<V>({ backgroundColor: 'green' }),
          webOnly: STYLE<$W>({ color: 'green' }),
        }),
      ])
      expect(sheet).toMatchSnapshot()
    })
    it("09 merge", () => {
      sheet = mergeSheets([
        atomizeSheet({
          root: STYLE<V>({ backgroundColor: 'red' }),
        }),
        atomizeSheet({
          root: STYLE<V>(WEB({ color: 'green' })),
        }),
        atomizeSheet({
          root: STYLE<V>({ backgroundColor: 'blue' }),
        }),
      ])
      expect(sheet).toMatchSnapshot()
    })
    it("10 with theme", () => {
      sheet = atomizeSheet(
        THEMED(theme => ({
          root: STYLE<V>({
            backgroundColor: theme.primary.normal.backgroundColor
          }),
          label: STYLE<T>(
            theme.primary.normal,
            { margin: 10 },
            IF<V>(null)
          ),
          webOnly: STYLE<$W>(
            COMPILE<$W>(theme.secondary.disabled)
          )
        })), theme)
      expect(sheet).toMatchSnapshot()
    })
    it("11 sheet source mutated", () => {
      const sheetSource: any = {
        root: [
          { backgroundColor: 'red' },
          WEB({ color: 'green' })
        ]
      }
      expect(sheetSource).toMatchSnapshot()
      sheet = atomizeSheet(sheetSource)
      expect(sheetSource).toMatchSnapshot()
      expect(sheet).toMatchSnapshot()
      sheet = atomizeSheet(sheet)
      expect(sheet).toMatchSnapshot()
    })
    it("12 merge ERROR, sheets must be atomized first", () => {
      const fnc = () => mergeSheets([
        {
          root: STYLE<V>({ backgroundColor: 'red' }),
          label: STYLE<T>({ color: 'red' }),
        },
        atomizeSheet({
          root: STYLE<V>({ backgroundColor: 'green' }),
          webOnly: STYLE<$W>({ color: 'green' }),
        }),
      ])
      expect(fnc).toThrow(/.*/)
    })
  }

  describe("## NATIVE ##", () => doTest(false))
  describe("## WEB ##", () => doTest(true))

})
