import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';

const OnlineBadge = ({ isOnline, name }) => {
  return (
    <Badge
      color="secondary"
      overlap="circle"
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      variant="dot"
      className={`badge ${isOnline ? 'badge--online' : 'badge--offline'}`}
    >
      <Avatar>{name}</Avatar>
    </Badge>
  );
};

export default OnlineBadge;
