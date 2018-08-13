// This file is shared across the demos.
import { classNamesStr, classNames } from 'reactxx-basic';
import React from 'react';
import ListItem from 'reactxx-muix/current/ListItem/ListItem';
import ListItemIcon from 'reactxx-muix/current/ListItemIcon/ListItemIcon';
import ListItemText from 'reactxx-muix/current/ListItemText/ListItemText';
import InboxIcon from 'reactxx-icons/MoveToInbox';
import DraftsIcon from 'reactxx-icons/Drafts';
import StarIcon from 'reactxx-icons/Star';
import SendIcon from 'reactxx-icons/Send';
import MailIcon from 'reactxx-icons/Mail';
import DeleteIcon from 'reactxx-icons/Delete';
import ReportIcon from 'reactxx-icons/Report';
export const mailFolderListItems = <div>
    <ListItem button>
      <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary="Inbox" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <StarIcon />
      </ListItemIcon>
      <ListItemText primary="Starred" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SendIcon />
      </ListItemIcon>
      <ListItemText primary="Send mail" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DraftsIcon />
      </ListItemIcon>
      <ListItemText primary="Drafts" />
    </ListItem>
  </div>;
export const otherMailFolderListItems = <div>
    <ListItem button>
      <ListItemIcon>
        <MailIcon />
      </ListItemIcon>
      <ListItemText primary="All mail" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DeleteIcon />
      </ListItemIcon>
      <ListItemText primary="Trash" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ReportIcon />
      </ListItemIcon>
      <ListItemText primary="Spam" />
    </ListItem>
  </div>;