import React from 'react';
import { mergeRulesets as classNamesStr } from 'reactxx-primitives';
import Button from 'reactxx-muix/current/Button/Button';
import Tooltip from 'reactxx-muix/current/Tooltip/Tooltip';
import Fade from 'reactxx-muix/current/Fade/Fade';
import Zoom from 'reactxx-muix/current/Zoom/Zoom';

function TransitionsTooltips() {
  return <div>
      <Tooltip title="Add">
        <Button>Grow</Button>
      </Tooltip>
      <Tooltip TransitionComponent={Fade} TransitionProps={{
      timeout: 600
    }} title="Add">
        <Button>Fade</Button>
      </Tooltip>
      <Tooltip TransitionComponent={Zoom} title="Add">
        <Button>Zoom</Button>
      </Tooltip>
    </div>;
}

export default TransitionsTooltips;