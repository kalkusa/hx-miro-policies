import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

interface FilterProps {
  onSearch: (name: string, type: string) => void;
  onReset: () => void;
}

const Filter: React.FC<FilterProps> = ({ onSearch, onReset }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  const handleSearch = () => {
    onSearch(name, type);
  };

  const handleReset = () => {
    setName("");
    setType("");
    onReset();
  };

  return (
    <Box sx={{ marginBottom: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          marginBottom: 2,
        }}
      >
        <TextField
          label="Policy Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          size="small"
          sx={{ flex: 1 }}
        />
        <FormControl sx={{ flex: 1 }} size="small">
          <InputLabel id="policy-type-label">Policy Type</InputLabel>
          <Select
            labelId="policy-type-label"
            value={type}
            label="Policy Type"
            onChange={(e) => setType(e.target.value as string)}
          >
            <MenuItem value="open">Open</MenuItem>
            <MenuItem value="closed">Closed</MenuItem>
            <MenuItem value="test">Test</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
        <Button variant="outlined" onClick={handleReset}>
          Reset Search Criteria
        </Button>
      </Box>
    </Box>
  );
};

export default Filter;
