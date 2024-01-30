import React, { useState } from "react";
import {
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import "./LeftSection.css";

const LeftSection = ({
  setSelectedField,
  jsonData,
  isLoading,
  selectedField,
}) => {
  const [isHoverEnabled, setHoverEnabled] = useState(true);

  const handleFieldHover = (field) => {
    if (isHoverEnabled && !isLoading) {
      debugger;
      setSelectedField(field ? field.toString().split(" ") : "");
    }
  };

  const renderFields = () => {
    return jsonData.sections[0].children.map((child, index) => {
      return (
        <ListItem
          key={child.id}
          className={`list-item ${
            isLoading &&
            selectedField.length > 1 &&
            selectedField?.join(" ") === child.content?.value
              ? "selected"
              : ""
          } ${
            isLoading &&
            selectedField.length > 1 &&
            selectedField?.join(" ") !== child.content?.value?.toString()
              ? "loading"
              : ""
          }`}
          onMouseEnter={() => handleFieldHover(child.content?.value)}
          onMouseLeave={() => setHoverEnabled(true)}
          style={{ cursor: isHoverEnabled ? "pointer" : "default" }}
        >
          <ListItemText
            primary={child.label}
            secondary={child.content?.value || "N/A"}
          />
        </ListItem>
      );
    });
  };

  return (
    <Grid item xs={4}>
      <Paper elevation={3} style={{ padding: "20px", marginTop: "30px" }}>
        <Typography variant="h6" gutterBottom>
          Extracted Data
        </Typography>
        <List>{renderFields()}</List>
      </Paper>
    </Grid>
  );
};

export default LeftSection;
