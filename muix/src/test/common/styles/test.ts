declare namespace MuixButton2 {
  type Shape = Overwrite<Muix2.DefaultEmptyShape, {
    common: Muix2.ShapeTexts<'label'> & Muix2.ShapeViews<'root' | 'dense' | 'raised' | 'fab' | 'flat' | 'mini' | 'active' | 'disabled' | 'raisedPrimary' | 'raisedAccent' | 'raisedDisable' | 'raisedContrast' | 'flatPrimary' | 'flatAccent' | 'flatContrast'>
    native: Muix2.ShapeViews<'ripple'>
    web: 'colorInherit'
    props: Muix.ButtonProps
    propsNative: ReactN.TouchableOpacityProperties
  }>
}

declare namespace MuixText2 {
  type Shape = Overwrite<Muix2.DefaultEmptyShape, {
    common: Muix2.ShapeTexts<'root'>
  }>
}

declare namespace MuixIcon2 {
  type Shape = Overwrite<Muix2.DefaultEmptyShape, {
    common: Muix2.ShapeTexts<'root'>
  }>
}

declare namespace Muix2 {
  interface SheetsX {
    MuixButton?: Muix2.SheetXOrCreator<MuixButton2.Shape>
    MuixText?: Muix2.SheetXOrCreator<MuixText2.Shape>
    MuixIcon?: Muix2.SheetXOrCreator<MuixIcon2.Shape>
  }
}
let spacing, typo, palette, shadowsNew, fade

const muixTextIcon = (root:ReactN.TextStyle) => ({
  MuixText: { root },
  MuixIcon: { root },
} as Muix2.SheetsX)

const sheet2: Muix2.SheetX<MuixButton2.Shape> = {
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 88,
    minHeight: 36,
    paddingTop: spacing.unit,
    paddingBottom: spacing.unit,
    paddingLeft: spacing.unit * 2,
    paddingRight: spacing.unit * 2,
    borderRadius: 2,
    $childPatch: {
      MuixIcon: {
        root: { fontSize: 24, }
      }
    }
  },
  dense: {
    paddingTop: spacing.unit - 1,
    paddingBottom: spacing.unit - 1,
    paddingLeft: spacing.unit,
    paddingRight: spacing.unit,
    minWidth: 64,
    minHeight: 32,
    $childPatch: muixTextIcon({ fontSize: typo.fontSizeNormalizerNative(typo.fontSize - 1), })
  },

  disabled: {
    $childPatch: muixTextIcon({ color: palette.action.disabled, })
  },

  flat: {
    $patch: {
      ripple: { backgroundColor: palette.grey[500], opacity: 0.8 },
    }
  },
  flatPrimary: {
    $patch: {
      label: { color: palette.primary[500] },
      ripple: { backgroundColor: fade(palette.primary[500], 0.4), opacity: 0.8 },
    }
  },
  flatAccent: {
    $patch: {
      label: { color: palette.secondary.A200 },
      ripple: { backgroundColor: fade(palette.secondary.A200, 0.4), opacity: 0.8 },
    }
  },
  flatContrast: {
    $patch: {
      label: { color: palette.getContrastText(palette.primary[500]) },
      ripple: { backgroundColor: fade(palette.getContrastText(palette.primary[500]), 0.4), opacity: 0.8 },
    }
  },


  raised: {
    backgroundColor: palette.grey[300],
    ...shadowsNew[2],
    $patch: {
      '& $active': shadowsNew[8],
    }
  },

  raisedPrimary: {
    backgroundColor: palette.primary[500],
    $patch: {
      label: { color: palette.getContrastText(palette.primary[500]) },
    }
  },
  raisedAccent: {
    backgroundColor: palette.secondary.A200,
    $patch: {
      label: { color: palette.getContrastText(palette.secondary.A200), },
    }
  },
  raisedDisable: {
    ...shadowsNew[0],
    backgroundColor: palette.text.divider,
    $patch: {
      label: { color: palette.getContrastText(palette.primary[500]) },
    }
  },
  raisedContrast: {
    $patch: {
      label: { color: palette.getContrastText(palette.primary[500]), },
    }
  },

  fab: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    minWidth: 0,
    width: 56,
    height: 56,
    borderRadius: 56 / 2,
    ...shadowsNew[6],
    $patch: {
      '& $active': shadowsNew[12],
    }
  },
  active: {},

  mini: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
  },
  label: {
    ...typo.button,
    color: palette.text.primary,
  },
  ripple: {
    backgroundColor: palette.common.white, opacity: 0.35,
  },
  colorInherit: {
  }
}

