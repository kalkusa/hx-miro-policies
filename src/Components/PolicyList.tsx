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
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import dayjs, { Dayjs } from "dayjs";
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
  const [searchCreatedBy, setSearchCreatedBy] = useState("");
  const [searchModifiedBy, setSearchModifiedBy] = useState("");
  const [searchCreatedDateFrom, setSearchCreatedDateFrom] =
    useState<Dayjs | null>(null);
  const [searchCreatedDateTo, setSearchCreatedDateTo] = useState<Dayjs | null>(
    null
  );
  const [searchInceptionDateFrom, setSearchInceptionDateFrom] =
    useState<Dayjs | null>(null);
  const [searchInceptionDateTo, setSearchInceptionDateTo] =
    useState<Dayjs | null>(null);

  const handleSearch = useCallback(
    (
      name: string,
      type: string,
      createdBy: string,
      modifiedBy: string,
      createdDateFrom: Dayjs | null,
      createdDateTo: Dayjs | null,
      inceptionDateFrom: Dayjs | null,
      inceptionDateTo: Dayjs | null
    ) => {
      setSearchName(name);
      setSearchType(type);
      setSearchCreatedBy(createdBy);
      setSearchModifiedBy(modifiedBy);
      setSearchCreatedDateFrom(createdDateFrom);
      setSearchCreatedDateTo(createdDateTo);
      setSearchInceptionDateFrom(inceptionDateFrom);
      setSearchInceptionDateTo(inceptionDateTo);
      setPage(0); // Reset to the first page
    },
    []
  );

  const handleReset = useCallback(() => {
    setSearchName("");
    setSearchType("");
    setSearchCreatedBy("");
    setSearchModifiedBy("");
    setSearchCreatedDateFrom(null);
    setSearchCreatedDateTo(null);
    setSearchInceptionDateFrom(null);
    setSearchInceptionDateTo(null);
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

  const filteredPolicies = policies.filter((policy) => {
    const createdDate = dayjs(policy.createdDate);
    const inceptionDate = dayjs(policy.inceptionDate);

    return (
      policy.name.toLowerCase().includes(searchName.toLowerCase()) &&
      (searchType ? policy.type === searchType : true) &&
      (searchCreatedBy
        ? policy.createdBy.toLowerCase().includes(searchCreatedBy.toLowerCase())
        : true) &&
      (searchModifiedBy
        ? policy.modifiedBy
            .toLowerCase()
            .includes(searchModifiedBy.toLowerCase())
        : true) &&
      (searchCreatedDateFrom
        ? createdDate.isAfter(searchCreatedDateFrom) ||
          createdDate.isSame(searchCreatedDateFrom)
        : true) &&
      (searchCreatedDateTo
        ? createdDate.isBefore(searchCreatedDateTo) ||
          createdDate.isSame(searchCreatedDateTo)
        : true) &&
      (searchInceptionDateFrom
        ? inceptionDate.isAfter(searchInceptionDateFrom) ||
          inceptionDate.isSame(searchInceptionDateFrom)
        : true) &&
      (searchInceptionDateTo
        ? inceptionDate.isBefore(searchInceptionDateTo) ||
          inceptionDate.isSame(searchInceptionDateTo)
        : true)
    );
  });

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
