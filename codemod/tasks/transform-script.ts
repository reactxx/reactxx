import * as Ast from '../utils/ast'
import { replaceAll } from '../utils/regexp'

export const processScript = (info: Ast.MUISourceInfo, code: string) => {
    const script = scripts[info.path]
    if (!script) return code
    if (script.ignore) return null
    if (script.addToCode) code += script.addToCode
    if (script.replace) Object.keys(script.replace).forEach(p => {
        if (!p || p === '') return
        code = code.replace(p, script.replace[p])
    })
    if (script.replaceAll) Object.keys(script.replaceAll).forEach(p => {
        if (!p || p === '') return
        code = replaceAll(code, p, script.replaceAll[p])
    })
    info.addToProps = script.addToProps
    info.componentFields = script.componentFields
    info.overrideReactIsValidElement = script.overrideReactIsValidElement
    return code
}

interface Script {
    replace?: Record<string, string>
    replaceAll?: Record<string, string>
    componentFields?: string
    addToProps?: string
    addToCode?: string
    overrideReactIsValidElement?: boolean
    ignore?:boolean
}

const scripts: Record<string, Script> = {
    "AppBar/AppBar": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "Avatar/Avatar": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "Backdrop/Backdrop": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "Badge/Badge": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "BottomNavigation/BottomNavigation": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "BottomNavigationAction/BottomNavigationAction": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "Button/Button": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "ButtonBase/ButtonBase": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "ButtonBase/createRippleHandler": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "ButtonBase/focusVisible": {
        replace: {
            'const internal = {': 'const internal: any = {'
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "ButtonBase/Ripple": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "ButtonBase/TouchRipple": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "Card/Card": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "CardActions/CardActions": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "CardContent/CardContent": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "CardHeader/CardHeader": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "CardMedia/CardMedia": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "Checkbox/Checkbox": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "Chip/Chip": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "CircularProgress/CircularProgress": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "ClickAwayListener/ClickAwayListener": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "Collapse/Collapse": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "colors/amber": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "colors/blue": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "colors/blueGrey": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "colors/brown": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "colors/common": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "colors/cyan": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "colors/deepOrange": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "colors/deepPurple": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "colors/green": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "colors/grey": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "colors/indigo": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "colors/lightBlue": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "colors/lightGreen": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "colors/lime": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "colors/orange": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "colors/pink": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "colors/purple": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "colors/red": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "colors/teal": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "colors/yellow": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "CssBaseline/CssBaseline": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "Dialog/Dialog": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "DialogActions/DialogActions": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "DialogContent/DialogContent": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "DialogContentText/DialogContentText": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "DialogTitle/DialogTitle": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "Divider/Divider": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "Drawer/Drawer": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "ExpansionPanel/ExpansionPanel": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "ExpansionPanelActions/ExpansionPanelActions": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "ExpansionPanelDetails/ExpansionPanelDetails": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "ExpansionPanelSummary/ExpansionPanelSummary": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "Fade/Fade": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "FormControl/FormControl": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "FormControlLabel/FormControlLabel": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "FormGroup/FormGroup": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "FormHelperText/FormHelperText": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "FormLabel/FormLabel": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "Grid/Grid": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "GridList/GridList": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "GridListTile/GridListTile": {
        replace: {
            "\nimport": `\nimport {fitPatch} from './GridListTilePatch';\nimport`,
            "fit = () => {": `  fit = fitPatch.bind(this)\n  fit_ = () => {`,
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "GridListTileBar/GridListTileBar": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "Grow/Grow": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "Hidden/Hidden": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "Hidden/HiddenCss": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "Hidden/HiddenJs": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "Icon/Icon": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "IconButton/IconButton": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "Input/Input": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "Input/Textarea": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "InputAdornment/InputAdornment": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "InputLabel/InputLabel": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "internal/animate": {
        replace: {
            'cb = ()': `cb: any = ()`
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "internal/SwitchBase": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "LinearProgress/LinearProgress": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "List/List": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "ListItem/ListItem": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "ListItemAvatar/ListItemAvatar": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "ListItemIcon/ListItemIcon": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "ListItemSecondaryAction/ListItemSecondaryAction": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "ListItemText/ListItemText": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "ListSubheader/ListSubheader": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "Menu/Menu": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "MenuItem/MenuItem": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "MenuList/MenuList": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "MobileStepper/MobileStepper": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "Modal/isOverflowing": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "Modal/manageAriaHidden": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "Modal/Modal": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "Modal/ModalManager": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "NativeSelect/NativeSelect": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "NativeSelect/NativeSelectInput": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "NoSsr/NoSsr": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "Paper/Paper": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "Popover/Popover": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "Popper/Popper": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "Portal/Portal": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "Radio/Radio": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "RadioGroup/RadioGroup": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "RootRef/RootRef": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "Select/Select": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "Select/SelectInput": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "Slide/Slide": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "Snackbar/Snackbar": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "SnackbarContent/SnackbarContent": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "Step/Step": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "StepButton/StepButton": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "StepConnector/StepConnector": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "StepContent/StepContent": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "StepIcon/StepIcon": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "StepLabel/StepLabel": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "Stepper/Stepper": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "styles/colorManipulator": {
    },
    "styles/createBreakpoints": {
    },
    "styles/createGenerateClassName": {
        replaceAll: {
            'global.__MUI_GENERATOR_COUNTER__': `global['__MUI_GENERATOR_COUNTER__']`
        },
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
        ignore: true
    },
    "styles/createTypography": {
    },
    "styles/getStylesCreator": {
        ignore: true
    },
    "styles/getThemeProps": {
    },
    "styles/jssPreset": {
        ignore: true
    },
    "styles/mergeClasses": {
    },
    "styles/MuiThemeProvider": {
        ignore: true
    },
    "styles/shadows": {
    },
    "styles/shape": {
    },
    "styles/spacing": {
    },
    "styles/themeListener": {
        ignore: true
    },
    "styles/transitions": {
    },
    "styles/withStyles": {
        ignore: true,
        replace: {
            'return WithStyles;': `return WithStyles as React.ComponentClass<any>;`,
            'extends React.Component {': `extends React.Component {\n cacheClasses`,
            'const stylesCreator = getStylesCreator': `const stylesCreator: any = getStylesCreator`,
        },
    },
    "styles/withTheme": {
        replace: {
            'return WithTheme;': 'return WithTheme as React.ComponentClass<any>;'
        },
    },
    "SvgIcon/SvgIcon": {
    },
    "SwipeableDrawer/SwipeableDrawer": {
        replace: {
            "": ""
        },
        replaceAll: {
            "": ""
        },
        componentFields: "",
        addToProps: ""
    },
    "SwipeableDrawer/SwipeArea": {
        addToCode: `\nexport interface SwipeAreaProps { anchor?; width? }\n`
    },
    "Switch/Switch": {
    },
    "Tab/Tab": {
        componentFields: '  labelRef',
        addToProps: 'indicator?;'
    },
    "Table/Table": {
        addToProps: 'padding?;'
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
        componentFields: '  scrollbarWidth\n  scrollbarHeight\n  nodeRef',
    },
    "Tabs/TabIndicator": {
    },
    "Tabs/Tabs": {
        replace: {
            'const conditionalElements = {};': `const conditionalElements: any = {};`
        },
        componentFields: "  tabsRef",
        overrideReactIsValidElement: true
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

