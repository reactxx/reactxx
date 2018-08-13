import React from 'react';
import { classNamesStr, classNames } from 'reactxx-basic';
import Button from 'reactxx-muix/current/Button/Button';
import Tooltip from 'reactxx-muix/current/Tooltip/Tooltip';

function DisabledTooltips() {
  return <Tooltip title="You don't have permission to do this">
      <span>
        <Button disabled>A Disabled Button</Button>
      </span>
    </Tooltip>;
}

export default DisabledTooltips;