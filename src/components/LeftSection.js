import React from "react";
import { Grid, Paper, List, ListItem, ListItemText, Typography } from '@mui/material';

const LeftSection = ({setSelectedField, jsonData }) => {

  const handleFieldClick = (field) => {
    setSelectedField(field.toString().split(' '));
  };

  const renderFields = () => {
    return jsonData.sections[0].children.map((child) => (
      <ListItem
        key={child.id}
        onClick={() => handleFieldClick(child.content?.value)}
        style={{cursor:"pointer"}}
      >
        <ListItemText primary={child.label} secondary={child.content?.value || 'N/A'} />
      </ListItem>
    ));
  };

  return (
    <Grid item xs={4}>
    <Paper elevation={3} style={{ padding: '20px' ,marginTop:"30px" }}>
      <Typography variant="h6" gutterBottom>
        Extracted Data
      </Typography>
      <List>{renderFields()}</List>
    </Paper>
  </Grid>
  );
};

export default LeftSection;
