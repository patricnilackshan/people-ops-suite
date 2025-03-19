// Copyright (c) 2024, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
//
// This software is the property of WSO2 LLC. and its suppliers, if any.
// Dissemination of any information or reproduction of any material contained
// herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
// You may not alter or remove any copyright or other notice from copies of this content.

import React from "react";
import { Theme, alpha } from "@mui/material/styles";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { NavLink as RouterLink, LinkProps as RouterLinkProps } from "react-router-dom";
import { Typography } from "@mui/material";

const Link = React.forwardRef<HTMLAnchorElement, RouterLinkProps>(function Link(itemProps, ref) {
  return (
    <RouterLink
      ref={ref}
      {...itemProps}
      role={undefined}
      style={({ isActive }) => (isActive ? { background: alpha("#FFFFF", 0.05), color: "#FF7300" } : {})}
    />
  );
});

const ListItemLink = (props: ListItemLinkProps) => {
  const { icon, primary, to, open, theme, isActive } = props;

  return (
    <ListItem
      component={Link}
      to={to}
      sx={{
        borderRadius: 2,
        mb: 1.5,
        "&:hover": {
          background: alpha(theme.palette.common.white, 0.4),
          ...(!open && {
            "& .menu-tooltip": {
              opacity: 1,
              marginLeft: -2,
              visibility: "visible",
              color: (theme) => theme.palette.common.white,
            },
          }),
        },
        ...(isActive && {
          background: alpha(theme.palette.common.white, 0.7),
        }),
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }}
    >
      {icon && (
        <ListItemIcon
          sx={{
            color: (theme) => theme.palette.common.white,
            ...(isActive && {
              color: (theme) => theme.palette.primary.main,
            }),
          }}
        >
          {icon}
        </ListItemIcon>
      )}
      <ListItemText
        sx={{
          ml: -2,
          fontSize: 18,
          "& .MuiListItemText-primary": {
            color: (theme) => theme.palette.common.white,
            ...(isActive && {
              color: (theme) => theme.palette.primary.main,
            }),
          },
        }}
        primary={primary}
      />

      <span className="menu-tooltip">
        <Typography variant="body2">{primary}</Typography>
      </span>
    </ListItem>
  );
};

export default ListItemLink;

interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
  open: boolean;
  isActive: boolean;
  theme: Theme;
}
