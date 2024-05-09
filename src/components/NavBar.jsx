import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AppsIcon from "@material-ui/icons/Apps";
import LinkIcon from "@material-ui/icons/Link";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SecurityIcon from "@mui/icons-material/Security";
import Applications from "./Applications";

const useStyles = makeStyles({
  list: {
    width: 250,
    backgroundColor: "purple",
    height: "100%",
    color: "white",
  },
  listItem: {
    "&.Mui-selected": {
      backgroundColor: "#6a1b9a",
    },
  },
  drawerPaper: {
    width: 250,
    backgroundColor: "purple",
    height: "100%",
    color: "white",
  },
});

export default function NavBar() {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const navItems = ["Applications", "Connections", "Cost", "Security"];

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const list = () => (
    <div className={classes.list}>
      <List>
        {navItems.map((text, index) => (
          <ListItem
            button
            key={text}
            selected={selectedIndex === index}
            onClick={(event) => handleListItemClick(event, index)}
            className={classes.listItem}
          >
            <ListItemIcon>
              {(() => {
                switch (index) {
                  case 0:
                    return <AppsIcon />;
                  case 1:
                    return <LinkIcon />;
                  case 2:
                    return <AttachMoneyIcon />;
                  case 3:
                    return <SecurityIcon />;
                  default:
                    return null;
                }
              })()}
            </ListItemIcon>

            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const renderComponent = (index) => {
    switch (index) {
      case 0:
        return <Applications />;
      //   case 1:
      //     return <Placeholder1 />;
      //   case 2:
      //     return <Placeholder2 />;
      //   case 3:
      //     return <Placeholder3 />;
      default:
        return null;
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <React.Fragment>
        <div style={{ width: 250, flexShrink: 0 }}>
          <Drawer
            variant="permanent"
            anchor={"left"}
            open={true}
            classes={{ paper: classes.drawerPaper }}
          >
            {list()}
          </Drawer>
        </div>
        <div style={{ flex: 1 }}>{renderComponent(selectedIndex)}</div>
      </React.Fragment>
    </div>
  );
}
