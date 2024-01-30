import React, { useState, useEffect } from "react";
import { Container, Grid, Paper, Typography } from "@mui/material";
import RightScreen from "./components/RightSection";
import LeftSection from "./components/LeftSection/LeftSection";
import sampleJsonData from "./constants/data.json";

const App = () => {
  const [jsonData, setJsonData] = useState(null);
  const [selectedField, setSelectedField] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Read JSON data from the file
    setJsonData(sampleJsonData.data);
  }, []);

  if (!jsonData) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Grid container spacing={3}>
        {/* Left side bar to show extracted data */}
        <LeftSection
          setSelectedField={setSelectedField}
          jsonData={jsonData}
          isLoading={isLoading}
          selectedField={selectedField}
        />

        <Grid item xs={8}>
          <Paper elevation={3} style={{ padding: "20px", marginTop: "30px" }}>
            <Typography variant="h6" gutterBottom>
              Image Viewer
            </Typography>
            {/* Your image component */}
            <RightScreen
              selectedField={selectedField}
              jsonData={jsonData}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
