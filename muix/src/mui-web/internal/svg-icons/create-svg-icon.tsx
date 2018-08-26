import React from 'react';
import ReactN from 'react-native';
import SvgIcon, { PropsX, SvgIconClassKey, SvgIconProps, Shape } from '../../SvgIcon/SvgIcon';
import { Theme } from '../../styles/withStyles';
import { Types, TCommon, TAddIn, TCommonStyles } from 'reactxx-basic'


const createSvgIcon = (data: string, displayName: string, isMdi: boolean) => {
    const Icon: React.SFC<PropsX> = props => <SvgIcon {...props} >
        <path d={data} />
    </SvgIcon >

    (Icon as any).displayName = displayName;
    (Icon as any).muiName = 'SvgIcon';

    return Icon;
}

export default createSvgIcon;