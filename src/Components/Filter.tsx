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
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface FilterProps {
  onSearch: (
    name: string,
    type: string,
    createdBy: string,
    modifiedBy: string,
    createdDateFrom: Dayjs | null,
    createdDateTo: Dayjs | null,
    inceptionDateFrom: Dayjs | null,
    inceptionDateTo: Dayjs | null
  ) => void;
  onReset: () => void;
}

const Filter: React.FC<FilterProps> = ({ onSearch, onReset }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [modifiedBy, setModifiedBy] = useState("");
  const [createdDateFrom, setCreatedDateFrom] = useState<Dayjs | null>(null);
  const [createdDateTo, setCreatedDateTo] = useState<Dayjs | null>(null);
  const [inceptionDateFrom, setInceptionDateFrom] = useState<Dayjs | null>(
    null
  );
  const [inceptionDateTo, setInceptionDateTo] = useState<Dayjs | null>(null);

  const handleSearch = () => {
    onSearch(
      name,
      type,
      createdBy,
      modifiedBy,
      createdDateFrom,
      createdDateTo,
      inceptionDateFrom,
      inceptionDateTo
    );
  };

  const handleReset = () => {
    setName("");
    setType("");
    setCreatedBy("");
    setModifiedBy("");
    setCreatedDateFrom(null);
    setCreatedDateTo(null);
    setInceptionDateFrom(null);
    setInceptionDateTo(null);
    onReset();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ marginBottom: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            marginBottom: 2,
          }}
        >
          <Box
            sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
          >
            <TextField
              label="Policy Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              size="small"
              sx={{ flex: 1 }}
            />
            <TextField
              label="Created By"
              variant="outlined"
              value={createdBy}
              onChange={(e) => setCreatedBy(e.target.value)}
              size="small"
              sx={{ flex: 1 }}
            />
            <TextField
              label="Modified By"
              variant="outlined"
              value={modifiedBy}
              onChange={(e) => setModifiedBy(e.target.value)}
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
            <DatePicker
              label="Created Date From"
              value={createdDateFrom}
              onChange={(newValue) => setCreatedDateFrom(newValue)}
              slotProps={{ textField: { size: "small" } }}
            />
            <DatePicker
              label="Created Date To"
              value={createdDateTo}
              onChange={(newValue) => setCreatedDateTo(newValue)}
              slotProps={{ textField: { size: "small" } }}
            />
            <DatePicker
              label="Inception Date From"
              value={inceptionDateFrom}
              onChange={(newValue) => setInceptionDateFrom(newValue)}
              slotProps={{ textField: { size: "small" } }}
            />
            <DatePicker
              label="Inception Date To"
              value={inceptionDateTo}
              onChange={(newValue) => setInceptionDateTo(newValue)}
              slotProps={{ textField: { size: "small" } }}
            />
          </Box>
          {/* <Box
            sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
          >
            <DatePicker
              label="Created Date From"
              value={createdDateFrom}
              onChange={(newValue) => setCreatedDateFrom(newValue)}
              slotProps={{ textField: { size: "small" } }}
            />
            <DatePicker
              label="Created Date To"
              value={createdDateTo}
              onChange={(newValue) => setCreatedDateTo(newValue)}
              slotProps={{ textField: { size: "small" } }}
            />
            <DatePicker
              label="Inception Date From"
              value={inceptionDateFrom}
              onChange={(newValue) => setInceptionDateFrom(newValue)}
              slotProps={{ textField: { size: "small" } }}
            />
            <DatePicker
              label="Inception Date To"
              value={inceptionDateTo}
              onChange={(newValue) => setInceptionDateTo(newValue)}
              slotProps={{ textField: { size: "small" } }}
            />
          </Box> */}
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
    </LocalizationProvider>
  );
};

export default Filter;
