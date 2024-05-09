import React from "react";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import WarningIcon from "@material-ui/icons/Warning";

const ServiceInfoCard = ({ data }) => {
  if (!data || !data.status || !data.version) {
    return null; // or some fallback UI
  }

  return (
    <div>
      <h3>Service Info</h3>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h8">Current Version</Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                {data.status == "deployed" ? (
                  <CheckCircleOutlineIcon color="primary" />
                ) : (
                  <WarningIcon color="error" />
                )}
              </ListItemIcon>
              <ListItemText primary={data.status} />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h8">Desired Version</Typography>
          <List>
            <ListItem>
              <ListItemText primary={data.desiredVersion} />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </div>
  );
};

export default ServiceInfoCard;
