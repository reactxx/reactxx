import React from 'react';
import SvgIcon from '../../SvgIcon/SvgIcon';

const createSvgIcon = (data: string, displayName: string, isMdi:boolean) => {
    const Icon: React.SFC = props => <SvgIcon {...props} >
        <path d={data} />
    </SvgIcon >

    const res: any = Icon
    res.displayName = displayName;
    res.muiName = 'SvgIcon';

    return res;
}

export default createSvgIcon;