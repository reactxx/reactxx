import {
  atomizeSheet,
  atomizeRuleset,
  mergeSheets,
} from "reactxx-sheeter"
import { initPlatform, Shape, theme } from "reactxx-tests"

describe("SHEET", () => {
  const doTest = (isWeb: boolean) => {
    beforeEach(() => initPlatform(isWeb))
    let sheet
    it("01 null", () => {
      sheet = atomizeSheet(null)
      expect(sheet).toMatchSnapshot()
    })
    it("02 {}", () => {
      sheet = atomizeSheet({})
      expect(sheet).toMatchSnapshot()
    })
    it("03 backgroundColor: 'red'", () => {
      sheet = atomizeSheet<Shape>({root: {backgroundColor: 'red'}})
      expect(sheet).toMatchSnapshot()
    })
    it("04 merge", () => {
      sheet = mergeSheets(null)
      expect(sheet).toMatchSnapshot()
    })
    it("05 merge", () => {
      sheet = mergeSheets([])
      expect(sheet).toMatchSnapshot()
    })
    it("06 merge", () => {
      sheet = mergeSheets([null, {}, undefined])
      expect(sheet).toMatchSnapshot()
    })
    it("07 merge", () => {
      sheet = mergeSheets([
        null, {}, undefined,
        atomizeSheet<Shape>({
          root: {backgroundColor: 'green'},
          label: {color: 'green'},
        }),
      ])
      expect(sheet).toMatchSnapshot()
    })
    it("08 merge", () => {
      sheet = mergeSheets([
        atomizeSheet<Shape>({
          root: {backgroundColor: 'red'},
          label: {color: 'red'},
        }),
        atomizeSheet<Shape>({
          root: {backgroundColor: 'green'},
          webOnly: { $web: {color: 'green'}},
        }),
      ])
      expect(sheet).toMatchSnapshot()
    })
    it("09 merge", () => {
      sheet = mergeSheets([
        atomizeSheet<Shape>({
          root: {backgroundColor: 'red'},
        }),
        atomizeSheet<Shape>({
          root: { 
            $web: {color: 'green'},
          }
        }),
        atomizeSheet<Shape>({
          root: { 
            $native: {backgroundColor: 'blue'},
          }
        }),
      ])
      expect(sheet).toMatchSnapshot()
    })
    it("10 with theme", () => {
      sheet = atomizeSheet<Shape>(theme => ({
        root: {
          backgroundColor: theme.primary.normal.backgroundColor
        },
        label: [
          theme.primary.normal,
          {margin: 10}
        ],
        webOnly: {
          $web: atomizeRuleset<'Text', Shape>(theme.secondary.disabled, null, 'theme.secondary.disabled')
        }
      }), theme)
      expect(sheet).toMatchSnapshot()
    })
    it("11 sheet source mutated", () => {
      const sheetSource = {
        root: {
          backgroundColor: 'red',
          $web: { color: 'green' }
        }
      }
      expect(sheetSource).toMatchSnapshot()
      sheet = atomizeSheet<Shape>(sheetSource)
      expect(sheetSource).toMatchSnapshot()
      expect(sheet).toMatchSnapshot()
      sheet = atomizeSheet<Shape>(sheet)
      expect(sheet).toMatchSnapshot()
    })
    it("12 merge ERROR, sheets must be atomized first", () => {
      sheet = mergeSheets([
        {
          root: {backgroundColor: 'red'},
          label: {color: 'red'},
        },
        atomizeSheet<Shape>({
          root: {backgroundColor: 'green'},
          webOnly: { $web: {color: 'green'}},
        }),
      ])
      expect(sheet).toMatchSnapshot()
    })
  }

  describe("## NATIVE ##", () => doTest(false))
  describe("## WEB ##", () => doTest(true))

})
