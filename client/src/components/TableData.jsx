import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const theme = createTheme({
  components: {
    MuiTablePagination: {
      styleOverrides: {
        root: { color: "lightgray" },
        selectIcon: { color: "lightgray" },
        toolbar: {
          "& .MuiTablePagination-caption, & .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows, & .MuiTablePagination-select, & .MuiTablePagination-actions button":
            {
              color: "lightgray",
            },
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
        },
        cell: {
          color: "lightgray",
        },
      },
    },
  },
});

export default function TableData() {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 8,
  });
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3310/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData);
        throw new Error(errorData.message || "Failed to fetch...");
      }

      const fetchedData = await response.json();
      console.info("Fetched users data:", fetchedData);

      if (Array.isArray(fetchedData.data)) {
        setData(fetchedData.data);
      } else {
        setData([]);
        console.error("Fetched data is not an array:", fetchedData);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors(error.message || "Failed to fetch. Please try again.");
      setData([]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    console.info("Current data state:", data);
  }, [data]);

  const rows = data.map((user, index) => ({
    id: index + 1,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    gender: user.gender,
    role: user.role,
  }));

  const columns = [
    {
      field: "id",
      width: 80,
      headerName: "ID",
      renderCell: (params) => (
        <div
          style={{
            color: "lightgray",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "firstName",
      headerName: "First Name",
      width: 150,
      renderCell: (params) => (
        <div style={{ color: "lightgray" }}>{params.value}</div>
      ),
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 150,
      renderCell: (params) => (
        <div style={{ color: "lightgray" }}>{params.value}</div>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
      headerAlign: "center",
      renderCell: (params) => (
        <div style={{ color: "lightgray" }}>{params.value}</div>
      ),
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 100,
      renderCell: (params) => (
        <div style={{ color: "lightgray" }}>{params.value}</div>
      ),
    },
    {
      field: "role",
      headerName: "Role",
      width: 100,
      renderCell: (params) => (
        <div style={{ color: "lightgray" }}>{params.value}</div>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      headerAlign: "center",
      renderCell: () => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <FaEdit style={{ cursor: "pointer", color: "orange" }} />
          <FaTrash style={{ cursor: "pointer", color: "red" }} />
        </div>
      ),
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          pagination
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          hideFooterSelectedRowCount
          componentsProps={{
            pagination: {
              sx: {
                "& .MuiTablePagination-root, & .MuiTablePagination-toolbar, & .MuiTablePagination-caption, & .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows, & .MuiTablePagination-select, & .MuiTablePagination-actions button":
                  {
                    color: "lightgray",
                  },
              },
            },
          }}
        />
      </div>
    </ThemeProvider>
  );
}
