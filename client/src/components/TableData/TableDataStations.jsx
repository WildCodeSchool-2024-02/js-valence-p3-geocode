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

export default function TableDataStations() {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 8,
  });
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState(null);
  const { searchQuery } = useOutletContext();

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch("http://localhost:3310/api/stations", {
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
          setErrors(null);
        } else {
          setData([]);
          console.error("Fetched data is not an array:", fetchedData);
          setErrors("Fetched data is not in the expected format.");
        }
      } catch (error) {
        console.error("Error:", error);
        setErrors(error.message || "Failed to fetch. Please try again.");
        setData([]);
      }
    };

    fetchStations();
  }, [searchQuery]);

  const filteredRows = data.filter((station) =>
    [
      station.nom_amenageur,
      station.nom_operateur,
      station.nom_enseigne,
      station.nom_station,
      station.commune,
    ].some((field) =>
      field ? field.toLowerCase().includes(searchQuery.toLowerCase()) : false
    )
  );

  const rows = filteredRows.map((station, index) => ({
    id: index + 1,
    nom_amenageur: station.nom_amenageur,
    nom_operateur: station.nom_operateur,
    nom_enseigne: station.nom_enseigne,
    nom_station: station.nom_station,
    commune: station.consolidated_commune,
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
      field: "nom_amenageur",
      headerName: "Nom Amenageur",
      width: 200,
      renderCell: (params) => (
        <div style={{ color: "lightgray" }}>{params.value}</div>
      ),
    },
    {
      field: "nom_operateur",
      headerName: "Nom Operateur",
      width: 200,
      renderCell: (params) => (
        <div style={{ color: "lightgray" }}>{params.value}</div>
      ),
    },
    {
      field: "nom_enseigne",
      headerName: "Nom Enseigne",
      width: 200,
      renderCell: (params) => (
        <div style={{ color: "lightgray" }}>{params.value}</div>
      ),
    },
    {
      field: "nom_station",
      headerName: "Nom Station",
      width: 300,
      headerAlign: "center",
      renderCell: (params) => (
        <div style={{ color: "lightgray" }}>{params.value}</div>
      ),
    },
    {
      field: "commune",
      headerName: "Commune",
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
          <FaEdit style={{ cursor: "pointer", color: "orange" }} />
          <FaTrash style={{ cursor: "pointer", color: "red" }} />
        </div>
      ),
    },
  ];

  console.info(errors);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        {errors ? (
          <div
            style={{
              padding: "20px",
              color: "red",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {errors}
          </div>
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            autoHeight
            pagination
            paginationModel={paginationModel}
            pageSizeOptions={[5, 8, 10, 20]}
            onPaginationModelChange={setPaginationModel}
            hideFooterSelectedRowCount
          />
        )}
      </div>
    </ThemeProvider>
  );
}
