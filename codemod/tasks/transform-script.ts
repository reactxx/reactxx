import { Flags, Script } from './transform-code'

import { replaceAll } from '../utils/regexp'

export const scripts: Record<string, Script> = {
    "AppBar/AppBar": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "Avatar/Avatar": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "Backdrop/Backdrop": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "Badge/Badge": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "BottomNavigation/BottomNavigation": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "BottomNavigationAction/BottomNavigationAction": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "Button/Button": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "ButtonBase/ButtonBase": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "ButtonBase/createRippleHandler": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "ButtonBase/focusVisible": {
        replace: {
            'const internal = {': 'const internal: any = {'
        },
        addFields: "",
        addProps: ""
    },
    "ButtonBase/Ripple": {
        replace: {
            "": ""
        },
        flags: Flags.addEmptyPropsDef,
        addFields: "",
        addProps: ""
    },
    "ButtonBase/TouchRipple": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "Card/Card": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "CardActions/CardActions": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "CardContent/CardContent": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "CardHeader/CardHeader": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "CardMedia/CardMedia": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "Checkbox/Checkbox": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "Chip/Chip": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "CircularProgress/CircularProgress": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "ClickAwayListener/ClickAwayListener": {
        replace: {
            "": ""
        },
        flags: Flags.addEmptyPropsDef,
        addFields: "",
        addProps: ""
    },
    "Collapse/Collapse": {
        replace: {
            "": ""
        },
        addFields: "",
        adjustThemeProperties: ['handleEntering', 'handleExiting'],
        addProps: ""
    },
    "colors/amber": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "colors/blue": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "colors/blueGrey": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "colors/brown": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "colors/common": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "colors/cyan": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "colors/deepOrange": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "colors/deepPurple": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "colors/green": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "colors/grey": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "colors/indigo": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "colors/lightBlue": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "colors/lightGreen": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "colors/lime": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "colors/orange": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "colors/pink": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "colors/purple": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "colors/red": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "colors/teal": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "colors/yellow": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "CssBaseline/CssBaseline": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "Dialog/Dialog": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "DialogActions/DialogActions": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "DialogContent/DialogContent": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "DialogContentText/DialogContentText": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "DialogTitle/DialogTitle": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "Divider/Divider": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "Drawer/Drawer": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "ExpansionPanel/ExpansionPanel": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "ExpansionPanelActions/ExpansionPanelActions": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "ExpansionPanelDetails/ExpansionPanelDetails": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "ExpansionPanelSummary/ExpansionPanelSummary": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "Fade/Fade": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "FormControl/FormControl": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "FormControlLabel/FormControlLabel": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "FormGroup/FormGroup": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "FormHelperText/FormHelperText": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "FormLabel/FormLabel": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "Grid/Grid": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "GridList/GridList": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "GridListTile/GridListTile": {
        replace: {
            "\nimport": `\nimport {fitPatch} from './GridListTilePatch';\nimport`,
            "fit = () => {": `  fit = fitPatch.bind(this)\n  fit_ = () => {`,
        },
        addFields: "",
        addProps: ""
    },
    "GridListTileBar/GridListTileBar": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "Grow/Grow": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "Hidden/Hidden": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: "",

    },
    "Hidden/HiddenCss": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "Hidden/HiddenJs": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "Icon/Icon": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "IconButton/IconButton": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "Input/Input": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "Input/Textarea": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "InputAdornment/InputAdornment": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "InputLabel/InputLabel": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "internal/animate": {
        replace: {
            'cb = ()': `cb: any = ()`
        },
        addFields: "",
        addProps: ""
    },
    "internal/SwitchBase": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "LinearProgress/LinearProgress": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "List/List": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "ListItem/ListItem": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "ListItemAvatar/ListItemAvatar": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "ListItemIcon/ListItemIcon": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "ListItemSecondaryAction/ListItemSecondaryAction": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "ListItemText/ListItemText": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "ListSubheader/ListSubheader": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "Menu/Menu": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "MenuItem/MenuItem": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "MenuList/MenuList": {
        replace: {
            "": ""
        },
        flags: Flags.addEmptyPropsDef,
        addFields: "",
        addProps: ""
    },
    "MobileStepper/MobileStepper": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "Modal/isOverflowing": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "Modal/manageAriaHidden": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "Modal/Modal": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "Modal/ModalManager": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: ""
    },
    "NativeSelect/NativeSelect": {
        replace: {
            "React.cloneElement(input": "React.cloneElement(input as any",
            "...(input ? input.props.inputProps": "...(input ? (input as any).props.inputProps"
        },
        addFields: "",
        addProps: ""
    },
    "NativeSelect/NativeSelectInput": {
        replace: {
            "": ""
        },
        addFields: "",
        addProps: "classes?; className?;",

    },
    "NoSsr/NoSsr": {
        addFields: "  mounted",
        addProps: "defer?"
    },
    "Paper/Paper": {
    },
    "Popover/Popover": {
        replace: {
            "!TransitionComponent.muiSupportAuto": "!(TransitionComponent as any).muiSupportAuto",
            "this.props.onEnter(element)":"this.props.onEnter(element, false)"
        },
    },
    "Popper/Popper": {
        replace: {
            "const childProps = {": "const childProps: any = {",
            "const popperNode = ReactDOM.findDOMNode": "const popperNode: any = ReactDOM.findDOMNode",
            "popperOptions = {}":"popperOptions = {} as any"
        },
        adjustThemeProperties: ['handleOpen'],
    },
    "Portal/Portal": {
        addFields: " mountNode\n",
    },
    "Radio/Radio": {
    },
    "RadioGroup/RadioGroup": {
        replace: {
            //"React.cloneElement(child": "React.cloneElement(child as any    "
        },
        flags: Flags.isValidElementOverride,
        addProps: "onChange?"
    },
    "RootRef/RootRef": {
        flags: Flags.addEmptyPropsDef,
    },
    "Select/Select": {
        replace: {
            "input.props.inputProps": "(input as any).props.inputProps",
            "React.cloneElement(input": "React.cloneElement(input as any",
            "import { styles as nativeSelectStyles }": "import { NativeSelectStyles as nativeSelectStyles }"
        },
    },
    "Select/SelectInput": {
        replace: {
            "delete other[": "delete (other as any)[",
            "inputRef.current = nodeProxy": "(inputRef as any).current = nodeProxy"
        },
        addProps: "classes?; className?; displayEmpty?; required?; type?;",
        flags: Flags.isValidElementOverride,
    },
    "Slide/Slide": {
        replace: {
            "children.props.style": "(children as any).props.style",
            "let style = {}": "let style: any = {}",
            "this.props.onEnter(node)": "this.props.onEnter(node, false)",
            "this.props.onEntering(node)": "this.props.onEntering(node, false)"
        },
        addFields: "  transitionRef",
    },
    "Snackbar/Snackbar": {
        replace: {
            "setAutoHideTimer(autoHideDuration)": "setAutoHideTimer(autoHideDuration?)"
        },
    },
    "SnackbarContent/SnackbarContent": {
    },
    "Step/Step": {
        replace: {
            "React.cloneElement(child": "React.cloneElement(child as any"
        },
    },
    "StepButton/StepButton": {
        replace: {
            "React.cloneElement(children": "React.cloneElement(children as any"
        },
    },
    "StepConnector/StepConnector": {
    },
    "StepContent/StepContent": {
        replace: {
            "!TransitionComponent.muiSupportAuto": "!(TransitionComponent as any).muiSupportAuto"
        },
    },
    "StepIcon/StepIcon": {
        replace: {
            "return icon": "return icon as any"
        },
    },
    "StepLabel/StepLabel": {
    },
    "Stepper/Stepper": {
        replace: {
            "childrenArray.map((step": "childrenArray.map((step: any",
            "React.cloneElement(connectorProp": "React.cloneElement(connectorProp as any"
        },
    },
    "styles/colorManipulator": {
    },
    "styles/createBreakpoints": {
    },
    "styles/createGenerateClassName": {
        transform: code => replaceAll(code, 'global.__MUI_GENERATOR_COUNTER__', `global['__MUI_GENERATOR_COUNTER__']`)
    },
    "styles/createMixins": {
    },
    "styles/createMuiTheme": {
    },
    "styles/createPalette": {
        replace: {
            'mainShade = 500': `mainShade: any = 500`,
            'lightShade = 300': `lightShade: any = 300`,
            'darkShade = 700': `darkShade: any = 700`
        },
    },
    "styles/createStyles": {
        flags: Flags.ignore
    },
    "styles/createTypography": {
    },
    "styles/getStylesCreator": {
        flags: Flags.ignore
    },
    "styles/getThemeProps": {
    },
    "styles/jssPreset": {
        flags: Flags.ignore
    },
    "styles/mergeClasses": {
    },
    "styles/MuiThemeProvider": {
        flags: Flags.ignore
    },
    "styles/shadows": {
    },
    "styles/shape": {
    },
    "styles/spacing": {
    },
    "styles/themeListener": {
        flags: Flags.ignore
    },
    "styles/transitions": {
    },
    "styles/withStyles": {
        flags: Flags.ignore,
        replace: {
            'return WithStyles;': `return WithStyles as React.ComponentClass<any>;`,
            'extends React.Component {': `extends React.Component {\n cacheClasses`,
            'const stylesCreator = getStylesCreator': `const stylesCreator: any = getStylesCreator`,
        },
    },
    "styles/withTheme": {
        flags: Flags.ignore,
        replace: {
            'return WithTheme;': 'return WithTheme as React.ComponentClass<any>;'
        },
        addProps: '  static Naked\n  static displayName\n  static contextTypes\n  static propTypes'
    },
    "styles/index": {
        flags: Flags.ignore,
    },
    "SvgIcon/SvgIcon": {
    },
    "SwipeableDrawer/SwipeableDrawer": {
        replace: {
            '...ModalPropsProp } = {}': '...ModalPropsProp } = {} as any',
            'this.props.onClose()': 'this.props.onClose(null)',
            'this.props.onOpen()': 'this.props.onOpen(null)',
            "removeEventListener('touchmove', this.handleBodyTouchMove, { passive: false }": `removeEventListener('touchmove', this.handleBodyTouchMove`
        },
        addProps: "ModalProps?",
    },
    "SwipeableDrawer/SwipeArea": {
        transform: code => code += `\nexport interface SwipeAreaProps { anchor?; width? }\n`
    },
    "Switch/Switch": {
    },
    "Tab/Tab": {
        addFields: '  labelRef',
        addProps: 'indicator?;'
    },
    "Table/Table": {
        addProps: 'padding?;'
    },
    "TableBody/TableBody": {
    },
    "TableCell/TableCell": {
    },
    "TableFooter/TableFooter": {
    },
    "TableHead/TableHead": {
    },
    "TablePagination/TablePagination": {
    },
    "TablePaginationActions/TablePaginationActions": {
    },
    "TableRow/TableRow": {
    },
    "TableSortLabel/TableSortLabel": {
    },
    "Tabs/ScrollbarSize": {
        replace: {
            'style={styles}': 'style={styles as any}'
        },
        addFields: '  scrollbarWidth\n  scrollbarHeight\n  nodeRef',
        flags: Flags.addEmptyPropsDef,
    },
    "Tabs/TabIndicator": {
    },
    "Tabs/Tabs": {
        replace: {
            'const conditionalElements = {};': `const conditionalElements: any = {};`
        },
        addFields: "  tabsRef",
        flags: Flags.isValidElementOverride,
        adjustThemeProperties: ['moveTabsScroll', 'scrollSelectedIntoView', 'getConditionalElements', 'updateScrollButtonState'],
        adjustThemeMethods: ['updateIndicatorState']
    },
    "Tabs/TabScrollButton": {
    },
    "TextField/TextField": {
        replace: {
            'defaultValue={defaultValue}': `defaultValue={defaultValue as any}`,
        },

    },
    "Toolbar/Toolbar": {
    },
    "Tooltip/Tooltip": {
        replace: {
            "=== 'button'": `=== 'button' as any`,
            "this.state.open = false": `(this.state.open as any) = false`,
            "const childrenProps = {": `const childrenProps: any = {`,
            "this.props.theme": `this.props.$system.theme`,
            "className={classes.popper}": `className={classes.popper as any}`,
            "rootRef={this.onRootRef}": `{...{rootRef:this.onRootRef}}`,
        },
    },
    "Typography/Typography": {
    },
    "withMobileDialog/withMobileDialog": {
        replace: {
            "from '../withWidth';": `from '../withWidth/withWidth';`
        },
    },
    "withWidth/withWidth": {
        replace: {
            'const more = {};': `const more: any = {};`
        },
    },
    "Zoom/Zoom": {
        replace: {
            'children.props.style': `(children.props as any).style`,
            'React.cloneElement(children': `React.cloneElement(children as any`,
            'this.props.onEnter(node)': `(this.props as any).onEnter(node)`,
            // Error in C:\reactxx\codemod\patch-original\transitions\transition.d.ts
            'onExit={this.handleExit}': `onExit={this.handleExit}\ntimeout = {null}`,
        },
    },

}

