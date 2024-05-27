import React, { useState } from "react";
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
} from "@mui/material";

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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const PolicyList: React.FC = () => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <Container
      maxWidth={false}
      sx={{ height: "100svh", display: "flex", flexDirection: "column" }}
    >
      <Box sx={{ flex: "0 1 auto" }}>
        <h1>Policy List</h1>
      </Box>
      <Box sx={{ flex: "1 1 auto", overflow: "auto" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Inception Date</StyledTableCell>
                <StyledTableCell>Created Date</StyledTableCell>
                <StyledTableCell>Created By</StyledTableCell>
                <StyledTableCell>Modified By</StyledTableCell>
                <StyledTableCell>Type</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {policies
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
          count={policies.length}
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
