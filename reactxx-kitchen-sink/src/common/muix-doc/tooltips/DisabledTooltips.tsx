import React from 'react';
import Button from 'reactxx-muix/current/Button';
import Tooltip from 'reactxx-muix/current/Tooltip';

function DisabledTooltips() {
  return (
    <Tooltip title="You don't have permission to do this">
      <span>
        <Button disabled>A Disabled Button</Button>
      </span>
    </Tooltip>
  );
}

export default DisabledTooltips;
