import { useOutletContext } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const theme = createTheme({
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#2d3748",
            color: "lightgray",
            "&:hover": {
              backgroundColor: "#2d3748",
            },
          },
          "& .MuiDataGrid-cell": {
            color: "lightgray",
          },
          "& .MuiDataGrid-row": {
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          },
          "& .MuiDataGrid-sortIcon": {
            color: "lightgray",
          },
          "& .MuiDataGrid-filterIcon": {
            color: "lightgray",
          },
          "& .MuiDataGrid-columnSeparator": {
            color: "lightgray",
          },
          "& .MuiDataGrid-toolbarContainer": {
            color: "lightgray",
          },
          "& .MuiDataGrid-footerCell": {
            color: "lightgray",
          },
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          color: "lightgray",
        },
        selectIcon: {
          color: "lightgray",
        },
        toolbar: {
          "& .MuiTablePagination-caption, & .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows, & .MuiTablePagination-select, & .MuiTablePagination-actions button":
            {
              color: "lightgray",
            },
        },
      },
    },
  },
});

export default function TableDataUsers() {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 8,
  });
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState(null);
  const { searchQuery } = useOutletContext();

  useEffect(() => {
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

    fetchUsers();
  }, []);

  const filteredRows = data.filter((user) =>
    [user.firstName, user.lastName, user.email, user.gender, user.role].some(
      (field) => field.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const rows = filteredRows.map((user, index) => ({
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
      width: 100,
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
      width: 200,
      renderCell: (params) => (
        <div style={{ color: "lightgray" }}>{params.value}</div>
      ),
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 200,
      renderCell: (params) => (
        <div style={{ color: "lightgray" }}>{params.value}</div>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      width: 300,
      headerAlign: "center",
      renderCell: (params) => (
        <div style={{ color: "lightgray" }}>{params.value}</div>
      ),
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 200,
      renderCell: (params) => (
        <div style={{ color: "lightgray" }}>{params.value}</div>
      ),
    },
    {
      field: "role",
      headerName: "Role",
      width: 200,
      renderCell: (params) => (
        <div style={{ color: "lightgray" }}>{params.value}</div>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 300,
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
          <FaEdit className="text-yellow-500" style={{ fontSize: "1rem" }} />{" "}
          <FaTrash className="text-red-500" style={{ fontSize: "1rem" }} />{" "}
        </div>
      ),
    },
  ];

  console.info(errors);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          pagination
          pageSizeOptions={[5, 8, 10, 20]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          hideFooterSelectedRowCount
        />
      </div>
    </ThemeProvider>
  );
}
