import React from 'react';
import Button from 'reactxx-muix/current/Button';
import Tooltip from 'reactxx-muix/current/Tooltip';

function DelayTooltips() {
  return (
    <Tooltip title="Add" enterDelay={500} leaveDelay={200}>
      <Button>[500ms, 200ms]</Button>
    </Tooltip>
  );
}

export default DelayTooltips;
