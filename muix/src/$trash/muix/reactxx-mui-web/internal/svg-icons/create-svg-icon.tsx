import React from 'react';
import ReactN from 'react-native';
import SvgIcon, { PropsX, SvgIconProps, Shape } from '../../SvgIcon/SvgIcon';
import { Types, TAddIn } from 'reactxx-basic'


const createSvgIcon = (data: string, displayName: string, isMdi: boolean) => {
    const Icon: React.SFC<PropsX> = props => <SvgIcon {...props} >
        <path d={data} />
    </SvgIcon >

    (Icon as any).displayName = displayName;
    (Icon as any).muiName = 'SvgIcon';

    return Icon;
}

export default createSvgIcon;