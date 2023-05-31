import React from "react";

import { SideBlock } from "./SideBlock";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
import { Link } from "react-router-dom";

export const CommentsBlock = ({ items, children, isLoading = true }) => {
  return (
    <SideBlock title="Комментарии">
      <List>
        {(isLoading ? [...Array(5)] : items).map((obj, index) => (
          obj?(
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                {isLoading ? (
                  <Skeleton variant="circular" width={40} height={40} />
                ) : (
                  <Avatar alt={obj.user?obj.user.fullName:"Мёртвый пользователь"} src={obj.user?`http://localhost:4444${obj.user.avatarUrl}`:`http://localhost:4444/uknownpage.png`} />
                )}
              </ListItemAvatar>
              {isLoading ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Skeleton variant="text" height={25} width={120} />
                  <Skeleton variant="text" height={18} width={230} />
                </div>
              ) : (
                <Link to={`/user/${obj.user._id}`}>
                <ListItemText
                primary={obj.user?obj.user.fullName:"Мёртвый пользователь"}
                secondary={obj.text}
              />
                </Link>
              )}
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
          ):<></>
        ))}
      </List>
      {children}
    </SideBlock>
  );
};
