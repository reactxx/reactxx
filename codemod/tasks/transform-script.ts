import { Flags, Script } from './transform-code'

import { replaceAll } from '../utils/regexp'

export const scripts: Record<string, Script> = {
    "AppBar/AppBar": {
    },
    "Avatar/Avatar": {
        replace: {
            "childrenProp.props.className": "(childrenProp.props as any).className",
            "React.cloneElement(childrenProp": "React.cloneElement(childrenProp as any"
        },
    },
    "Backdrop/Backdrop": {
    },
    "Badge/Badge": {
    },
    "BottomNavigation/BottomNavigation": {
        replace: {
            "React.Children.map(childrenProp, (child": "React.Children.map(childrenProp, (child: any"
        },
        flags: Flags.isValidElementOverride
    },
    "BottomNavigationAction/BottomNavigationAction": {
    },
    "Button/Button": {
    },
    "ButtonBase/ButtonBase": {
        replace: {
            "const buttonProps = {}": "const buttonProps: any = {}"
        },
    },
    "ButtonBase/createRippleHandler": {
        replace: {
            "function createRippleHandler(instance, eventName, action, cb) {": "function createRippleHandler(instance, eventName, action, cb?) {"
        },
    },
    "ButtonBase/focusVisible": {
        replace: {
            'const internal = {': 'const internal: any = {'
        },
    },
    "ButtonBase/Ripple": {
        flags: Flags.addEmptyPropsDef,
    },
    "ButtonBase/TouchRipple": {
        replace: {
            "start = (event = {}, options = {}, cb) => {": "start = (event: any = {}, options: any = {}, cb?) => {",
            "const element = fakeElement": "const element: any = fakeElement",
            "class TouchRipple extends React.PureComponent {": "class TouchRipple extends React.PureComponent<CodeProps,any> {\n  static defaultProps: CodeProps",
            "<Ripple\n": "<Ripple\n {...{$system: (this.props as any).$system}}",
        },
        addFields: "",
    },
    "Card/Card": {
    },
    "CardActions/CardActions": {
    },
    "CardContent/CardContent": {
    },
    "CardHeader/CardHeader": {
        replace: {
            "let title = titleProp": "let title: any = titleProp",
            "let subheader = subheaderProp": "let subheader: any = subheaderProp"
        },
    },
    "CardMedia/CardMedia": {
        replace: {
            "MEDIA_COMPONENTS.indexOf(Component)": "MEDIA_COMPONENTS.indexOf(Component as any)"
        },
    },
    "Checkbox/Checkbox": {
    },
    "Chip/Chip": {
        replace: {
            "React.cloneElement(deleteIconProp, {": "React.cloneElement(deleteIconProp as any, {",
            "deleteIconProp.props.className": "(deleteIconProp.props as any).className",
            "React.cloneElement(avatarProp": "React.cloneElement(avatarProp as any",
        },
        transform: code => replaceAll(code, "avatarProp.props", "(avatarProp.props as any)"),
    },
    "CircularProgress/CircularProgress": {
        replace: {
            "const circleStyle = {}": "const circleStyle: any = {}",
            "const rootStyle = {}":"const rootStyle: any = {}",
            "const rootProps = {}":"const rootProps: any = {}",
            "":"",
        },
    },
    "ClickAwayListener/ClickAwayListener": {
    },
    "Collapse/Collapse": {
        replace: {
            "this.props.onEntering(node)": "this.props.onEntering(node, false)",
            "this.props.onEntered(node)":"this.props.onEntered(node, false)",
            "this.props.onEnter(node)":"this.props.onEnter(node, false)",
        },
        addFields: "  wrapperRef\n  static muiSupportAuto",
        adjustThemeProperties: ['handleEntering', 'handleExiting'],
    },
    "CssBaseline/CssBaseline": {
        replace: {
            "import { withStyles } from '../styles'": "",
        },
    },
    "Dialog/Dialog": {
    },
    "DialogActions/DialogActions": {
    },
    "DialogContent/DialogContent": {
    },
    "DialogContentText/DialogContentText": {
    },
    "DialogTitle/DialogTitle": {
    },
    "Divider/Divider": {
    },
    "Drawer/Drawer": {
        replace: {
            "...ModalProps } = {}": "...ModalProps } = {} as any"
        },
    },
    "ExpansionPanel/ExpansionPanel": {
        replace: {
            "React.cloneElement(child": "React.cloneElement(child as any"
        },
    },
    "ExpansionPanelActions/ExpansionPanelActions": {
    },
    "ExpansionPanelDetails/ExpansionPanelDetails": {
    },
    "ExpansionPanelSummary/ExpansionPanelSummary": {
    },
    "Fade/Fade": {
        replace: {
            "this.props.onEnter(node)": "this.props.onEnter(node, false)",
            "children.props.style":"(children as any).props.style",
            "React.cloneElement(children":"React.cloneElement(children as any"
        },
    },
    "FormControl/FormControl": {
    },
    "FormControlLabel/FormControlLabel": {
    },
    "FormGroup/FormGroup": {
    },
    "FormHelperText/FormHelperText": {
    },
    "FormLabel/FormLabel": {
    },
    "Grid/Grid": {
        replace: {
            "(size / 12)": "((size as number) / 12)"
        },
        transform: code => code.split('const StyledGrid = withStyles')[0]
    },
    "GridList/GridList": {
        flags: Flags.isValidElementOverride
    },
    "GridListTile/GridListTile": {
        replace: {
            "\nimport": `\nimport {fitPatch} from './GridListTilePatch';\nimport`,
            "fit = () => {": `  fit = fitPatch.bind(this)\n  fit_ = () => {`,
            "React.cloneElement(child":"React.cloneElement(child as any",
        },
    },
    "GridListTileBar/GridListTileBar": {
    },
    "Grow/Grow": {
        replace: {
            "this.props.onEnter(node)": "this.props.onEnter(node, false)",
            "children.props.style":"(children.props as any).style",
            "React.cloneElement(children":"React.cloneElement(children as any",
        },
        addFields: '  static muiSupportAuto'
    },
    "Hidden/Hidden": {
        addFields: "  inputRef",
    },
    "Hidden/HiddenCss": {
    },
    "Hidden/HiddenJs": {
        replace: {
            "return children": "return children as any",
            "from '../withWidth';":"from '../withWidth/withWidth';",
        },
        addProps: "width?",
    },
    "Icon/Icon": {
    },
    "IconButton/IconButton": {
    },
    "Input/Input": {
        replace: {
            "...inputPropsProp } = {}": "...inputPropsProp } = {} as any",
            "let InputComponent =":"let InputComponent: any =",
            "let inputProps = {":"let inputProps: any = {",
        },
        addFields: "  inputRef",
        addProps: "  onFilled?; onEmpty?"
    },
    "Input/Textarea": {
        replace: {
            "textareaRef.current = ref": "(textareaRef as any).current = ref",
            'rows="1"':"rows={1}",
            "rows={rows}":"rows={rows as any}"
        },
    },
    "InputAdornment/InputAdornment": {
    },
    "InputLabel/InputLabel": {
        addProps: "margin"
    },
    "internal/animate": {
        replace: {
            "function animate(prop, element, to, options = {}, cb = () => {}) {": "function animate(prop, element, to, options: any = {}, cb: any = () => {}) {"
        },
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
            "const inlineStyles = {":"const inlineStyles: any = {"
        }
    },
    "List/List": {
    },
    "ListItem/ListItem": {
        replace: {
            "...ContainerProps } = {}": "...ContainerProps } = {} as any",
            "const componentProps = {":"const componentProps: any = {",
        },
    },
    "ListItemAvatar/ListItemAvatar": {
        replace: {
            "React.cloneElement(children": "React.cloneElement(children as any",
            "return props.children":"return props.children as any",
            "ListItemAvatar.muiName = 'ListItemAvatar'":"ListItemAvatar['muiName'] = 'ListItemAvatar'"
        },
        transform: code => replaceAll(code,"children.props.","(children as any).props.")
    },
    "ListItemIcon/ListItemIcon": {
    },
    "ListItemSecondaryAction/ListItemSecondaryAction": {
    },
    "ListItemText/ListItemText": {
        replace: {
            "let secondary = secondaryProp": "let secondary:any = secondaryProp",
            "primary.type !== Typography": "(primary as any).type !== Typography"
        },
    },
    "ListSubheader/ListSubheader": {
    },
    "Menu/Menu": {
        replace: {
            "const menuList = ReactDOM.findDOMNode": "const menuList: any = ReactDOM.findDOMNode",
            "ReactDOM.findDOMNode(this.menuListRef.selectedItemRef).focus()": "(ReactDOM.findDOMNode(this.menuListRef.selectedItemRef) as any).focus()",
            "this.props.onEnter(element)": "this.props.onEnter(element, false)",
            "this.props.onKeyDown": "(this.props.onKeyDown as any)"
        },
        transform: code => replaceAll(code, "const menuList = ReactDOM.findDOMNode", "const menuList: any = ReactDOM.findDOMNode"),
        adjustThemeProperties: ['handleEnter']
    },
    "MenuItem/MenuItem": {
    },
    "MenuList/MenuList": {
        replace: {
            "React.Children.map(children, (child": "React.Children.map(children, (child: any",
            "this.props.onKeyDown(event": "(this.props as any).onKeyDown(event"
        },
        flags: Flags.isValidElementOverride,
    },
    "MobileStepper/MobileStepper": {
    },
    "Modal/isOverflowing": {
    },
    "Modal/manageAriaHidden": {
    },
    "Modal/Modal": {
        replace: {
            "import { StandardProps, ModalManager": "import { StandardProps",
            "React.cloneElement(children": "React.cloneElement(children as any",
            "const childProps = {}": "const childProps: any = {}",

        },
        transform: code => {
            code = replaceAll(code, 'props.children.props.', '(props.children as any).props.')
            code = replaceAll(code, 'children.props.', '(children as any).props.')
            code = replaceAll(code, "this.props.onClose", "(this.props.onClose as any)")
            return code
        },
        addFields: '  lastFocus'
    },
    "Modal/ModalManager": {
        replace: {
            "class ModalManager {": "class ModalManager {\n  hideSiblingNodes\n  containers\n  data\n  modals\n handleContainerOverflow",
            "const style = {": "const style: any = {"
        },
    },
    "NativeSelect/NativeSelect": {
        replace: {
            "React.cloneElement(input": "React.cloneElement(input as any",
            "...(input ? input.props.inputProps": "...(input ? (input as any).props.inputProps"
        },
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
            "this.props.onEnter(element)": "this.props.onEnter(element, false)"
        },
    },
    "Popper/Popper": {
        replace: {
            "const childProps = {": "const childProps: any = {",
            "const popperNode = ReactDOM.findDOMNode": "const popperNode: any = ReactDOM.findDOMNode",
            "popperOptions = {}": "popperOptions = {} as any"
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

