import { $W, $T, $V, $I, V, T, I, } from 'reactxx-typings'
import { getEngine } from '../utils/get-engine'

//import {  } from "reactxx-sheeter"
import { initPlatform, Shape as ShapeLow, theme } from "./init-platform.t"

interface Shape extends ShapeLow {
  sheetQuery: {color: string}  
}

const {
  $themed, $if, $web, $native, $rules,
  $atomizeSheet, $mergeSheets, $atomizeRuleset
} = getEngine<Shape>()

describe("SHEET", () => {
  const doTest = (isWeb: boolean) => {
    beforeEach(() => initPlatform(isWeb))
    let sheet

    it("01 null", () => {
      const sheet = $atomizeSheet(null)
      expect(sheet).toMatchSnapshot()
    })
    it("02 {}", () => {
      const sheet = $atomizeSheet({})
      expect(sheet).toMatchSnapshot()
    })
    it("03 backgroundColor: 'red'", () => {
      const sheet = $atomizeSheet({
        root: $rules<V>({ backgroundColor: 'red' })
      })
      expect(sheet).toMatchSnapshot()
    })
    it("04 merge", () => {
      const sheet = $mergeSheets(null)
      expect(sheet).toMatchSnapshot()
    })
    it("05 merge", () => {
      const sheet = $mergeSheets([])
      expect(sheet).toMatchSnapshot()
    })
    it("06 merge", () => {
      const sheet = $mergeSheets([null, {}, undefined])
      expect(sheet).toMatchSnapshot()
    })
    it("07 merge", () => {
      const sheet = $mergeSheets([
        null, {}, undefined,
        $atomizeSheet({
          root: $rules<V>({ backgroundColor: 'green' }),
          label: $rules<T>({ color: 'green' }),
        }) as any,
      ])
      expect(sheet).toMatchSnapshot()
    })
    it("08 merge", () => {
      sheet = $mergeSheets([
        $atomizeSheet({
          root: $rules<V>({ backgroundColor: 'red' }),
          label: $rules<T>({ color: 'red' }),
        }),
        $atomizeSheet({
          root: $rules<V>({ backgroundColor: 'green' }),
          webOnly: $rules<$W>({ color: 'green' }),
        }),
      ])
      expect(sheet).toMatchSnapshot()
    })
    it("09 merge", () => {
      sheet = $mergeSheets([
        $atomizeSheet({
          root: $rules<V>({ backgroundColor: 'red' }),
        }),
        $atomizeSheet({
          root: $rules<V>($web<V>({ color: 'green' })),
        }),
        $atomizeSheet({
          root: $rules<V>({ backgroundColor: 'blue' }),
        }),
      ])
      expect(sheet).toMatchSnapshot()
    })
    it("10 with theme", () => {
      sheet = $atomizeSheet(
        $themed(theme => ({
          root: $rules<V>({
            backgroundColor: theme.primary.normal.backgroundColor
          }),
          label: $rules<T>(
            theme.primary.normal,
            { margin: 10 },
            $if<V>(null)
          ),
          webOnly: $rules<$W>(
            $atomizeRuleset<$W>([theme.secondary.disabled], null, 'theme.secondary.disabled')
          )
        })), theme)
      expect(sheet).toMatchSnapshot()
    })
    it("11 sheet source mutated", () => {
      const sheetSource: any = {
        root: {
          backgroundColor: 'red',
          $web: { color: 'green' }
        }
      }
      expect(sheetSource).toMatchSnapshot()
      sheet = $atomizeSheet(sheetSource)
      expect(sheetSource).toMatchSnapshot()
      expect(sheet).toMatchSnapshot()
      sheet = $atomizeSheet(sheet)
      expect(sheet).toMatchSnapshot()
    })
    it("12 merge ERROR, sheets must be atomized first", () => {
      const fnc = () => $mergeSheets([
        {
          root: $rules<V>({ backgroundColor: 'red' }),
          label: $rules<T>({ color: 'red' }),
        },
        $atomizeSheet({
          root: $rules<V>({ backgroundColor: 'green' }),
          webOnly: $rules<$W>({ color: 'green' }),
        }),
      ])
      expect(fnc).toThrow(/.*/)
    })
  }

  describe("## NATIVE ##", () => doTest(false))
  describe("## WEB ##", () => doTest(true))

})
