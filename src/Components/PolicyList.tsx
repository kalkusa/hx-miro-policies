import React, { useState, useCallback } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  styled,
  tableCellClasses,
  Box,
  TableSortLabel,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import Filter from "./Filter";

interface Policy {
  id: number;
  name: string;
  inceptionDate: string;
  createdDate: string;
  createdBy: string;
  modifiedBy: string;
  type: "open" | "closed" | "test";
}

const getRandomDate = (start: Date, end: Date) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

const users = [
  "Jon Doe",
  "Jane Smith",
  "Alice Johnson",
  "Bob Brown",
  "Monica Bellucci",
  "Clark Kent",
  "Bruce Wayne",
  "Diana Prince",
  "Peter Parker",
  "Tony Stark",
];

const policyNames = [
  "Space X launch insurance policy",
  "Monica Bellucci hair insurance",
  "Oceanic exploration liability policy",
  "Artificial intelligence malfunction insurance",
  "Celebrity endorsement insurance",
  "Film production completion insurance",
  "Natural disaster response policy",
  "Cybersecurity breach insurance",
  "Pandemic outbreak coverage",
  "Renewable energy project insurance",
];

const policies: Policy[] = Array.from({ length: 50 }, (_, id) => ({
  id,
  name: policyNames[id % policyNames.length],
  inceptionDate: getRandomDate(new Date(2020, 0, 1), new Date())
    .toISOString()
    .split("T")[0],
  createdDate: getRandomDate(new Date(2020, 0, 1), new Date())
    .toISOString()
    .split("T")[0],
  createdBy: users[Math.floor(Math.random() * users.length)],
  modifiedBy: users[Math.floor(Math.random() * users.length)],
  type: ["open", "closed", "test"][id % 3] as "open" | "closed" | "test",
}));

const StyledTableCell = styled(TableCell)<{ isSorted?: boolean }>(
  ({ theme, isSorted }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      fontWeight: isSorted ? "bold" : "normal",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  })
);

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

type Order = "asc" | "desc";

interface HeadCell {
  id: keyof Policy;
  label: string;
}

const headCells: HeadCell[] = [
  { id: "name", label: "Name" },
  { id: "inceptionDate", label: "Inception Date" },
  { id: "createdDate", label: "Created Date" },
  { id: "createdBy", label: "Created By" },
  { id: "modifiedBy", label: "Modified By" },
  { id: "type", label: "Type" },
];

const PolicyList: React.FC = () => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Policy>("name");
  const [searchName, setSearchName] = useState("");
  const [searchType, setSearchType] = useState("");

  const handleSearch = useCallback((name: string, type: string) => {
    setSearchName(name);
    setSearchType(type);
    setPage(0); // Reset to the first page
  }, []);

  const handleReset = useCallback(() => {
    setSearchName("");
    setSearchType("");
    setPage(0); // Reset to the first page
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Policy
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const filteredPolicies = policies.filter(
    (policy) =>
      policy.name.toLowerCase().includes(searchName.toLowerCase()) &&
      (searchType ? policy.type === searchType : true)
  );

  const sortedPolicies = [...filteredPolicies].sort((a, b) => {
    if (a[orderBy] < b[orderBy]) {
      return order === "asc" ? -1 : 1;
    }
    if (a[orderBy] > b[orderBy]) {
      return order === "asc" ? 1 : -1;
    }
    return 0;
  });

  return (
    <Container
      maxWidth={false}
      sx={{ height: "100svh", display: "flex", flexDirection: "column" }}
    >
      <Box sx={{ flex: "0 1 auto" }}>
        <h1>Policy List</h1>
        <Filter onSearch={handleSearch} onReset={handleReset} />
      </Box>
      <Box sx={{ flex: "1 1 auto", overflow: "auto" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                {headCells.map((headCell) => (
                  <StyledTableCell
                    key={headCell.id}
                    sortDirection={orderBy === headCell.id ? order : false}
                    isSorted={orderBy === headCell.id}
                  >
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : "asc"}
                      onClick={(event) => handleRequestSort(event, headCell.id)}
                      sx={{
                        color: "inherit",
                        "&.Mui-active": {
                          color: "inherit",
                        },
                        ".MuiTableSortLabel-icon": {
                          color: "inherit !important",
                        },
                      }}
                    >
                      {headCell.label}
                      {orderBy === headCell.id ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === "desc"
                            ? "sorted descending"
                            : "sorted ascending"}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedPolicies
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((policy) => (
                  <StyledTableRow key={policy.id}>
                    <StyledTableCell>{policy.name}</StyledTableCell>
                    <StyledTableCell>{policy.inceptionDate}</StyledTableCell>
                    <StyledTableCell>{policy.createdDate}</StyledTableCell>
                    <StyledTableCell>{policy.createdBy}</StyledTableCell>
                    <StyledTableCell>{policy.modifiedBy}</StyledTableCell>
                    <StyledTableCell>{policy.type}</StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{ flex: "0 1 auto", display: "flex", justifyContent: "center" }}>
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={filteredPolicies.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          style={{ display: "flex", justifyContent: "center" }}
        />
      </Box>
    </Container>
  );
};

export default PolicyList;
