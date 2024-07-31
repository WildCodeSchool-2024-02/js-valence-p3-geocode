import { useOutletContext } from "react-router-dom";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Snackbar,
  Tooltip,
} from "@mui/material";

const theme = createTheme({
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#2d3748",
            color: "lightgray",
          },
          "& .MuiDataGrid-cell": {
            color: "lightgray",
          },
          "& .MuiDataGrid-row": {
            "&.editing-row": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
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
          "& .editing-cell": {
            backgroundColor: "rgba(0, 0, 0, 0.1)",
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

export default function TableDataCars() {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);
  const [vehicleToEdit, setVehicleToEdit] = useState(null);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 8,
  });
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState(null);
  const { searchQuery } = useOutletContext();
  const [editMode, setEditMode] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [originalRowData, setOriginalRowData] = useState({});

  const fetchCars = async () => {
    try {
      const response = await fetch("http://localhost:3310/api/vehicles", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch vehicles.");
      }

      const fetchedData = await response.json();
      if (Array.isArray(fetchedData.data)) {
        setData(fetchedData.data);
        setErrors(null);
      } else {
        throw new Error("Fetched data is not in the expected format.");
      }
    } catch (error) {
      setErrors(error.message);
      setData([]);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [searchQuery]);

  const handleEditCellChange = (params) => {
    setEditMode((prev) => ({ ...prev, [params.id]: true }));
  };

  const processRowUpdate = async (newRow, oldRow) => {
    try {
      const response = await fetch(
        `http://localhost:3310/api/vehicles/${newRow.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userID: newRow.user_id,
            brand: newRow.brand,
            model: newRow.model,
            picture: newRow.picture,
            priseType: newRow.priseType,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update vehicle");
      }

      await fetchCars();
      return newRow;
    } catch (error) {
      setErrors(error.message);
      return oldRow;
    }
  };

  const handleProcessRowUpdateError = (error) => {
    setErrors(error.message);
  };

  const openDeleteConfirmation = (vehicleId) => {
    setVehicleToDelete(vehicleId);
    setOpenDeleteDialog(true);
  };

  const handleDelete = async () => {
    if (!vehicleToDelete) return;

    try {
      const response = await fetch(
        `http://localhost:3310/api/vehicles/${vehicleToDelete}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete vehicle");
      }

      setOpenDeleteDialog(false);
      setVehicleToDelete(null);

      await fetchCars();
      setSnackbarMessage("Vehicle deleted successfully!");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Failed to delete vehicle:", error);
      setErrors(error.message);
    }
  };

  const handleCancelEdit = async () => {
    if (!vehicleToEdit) return;

    try {
      // Restore the original data in the UI
      const rowToRevert = originalRowData[vehicleToEdit.id];
      if (!rowToRevert) return;

      // Update the UI with the original row data
      const updatedRows = data.map((row) =>
        row.id === vehicleToEdit.id ? rowToRevert : row
      );
      setData(updatedRows);

      // Revert the changes on the server
      const response = await fetch(
        `http://localhost:3310/api/vehicle/${vehicleToEdit.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(rowToRevert),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to revert changes");
      }

      setOpenEditDialog(false);
      setEditMode((prev) => {
        const updatedEditMode = { ...prev };
        delete updatedEditMode[vehicleToEdit.id];
        return updatedEditMode;
      });
      setOriginalRowData((prev) => {
        const updated = { ...prev };
        delete updated[vehicleToEdit.id];
        return updated;
      });
      setVehicleToEdit(null);

      setSnackbarMessage("Changes reverted");
      setSnackbarOpen(true);
    } catch (error) {
      setErrors(error.message);
    }
  };

  const handleConfirmEdit = () => {
    if (!vehicleToEdit) return;

    setOpenEditDialog(false);
    setEditMode((prev) => {
      const updatedEditMode = { ...prev };
      delete updatedEditMode[vehicleToEdit.id];
      return updatedEditMode;
    });
    setVehicleToEdit(null);
    setSnackbarMessage("Changes made successfully!");
    setSnackbarOpen(true);
  };

  const handleEditClick = (id) => {
    const rowToEdit = data.find((row) => row.id === id);
    setOriginalRowData((prev) => ({ ...prev, [id]: rowToEdit }));
    setEditMode((prev) => ({ ...prev, [id]: true }));
  };

  const handleSaveClick = async (id) => {
    const updatedRow = data.find((row) => row.id === id);
    setVehicleToEdit(updatedRow);
    setOpenEditDialog(true);
  };

  const handleCancelClick = (id) => {
    setEditMode((prev) => ({ ...prev, [id]: false }));
    handleCancelEdit();
  };

  const filteredRows = data.filter((vehicle) =>
    [
      vehicle.userID,
      vehicle.brand,
      vehicle.model,
      vehicle.picture,
      vehicle.priseType,
    ].some((field) =>
      field
        ? field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        : false
    )
  );

  const rows = filteredRows.map((vehicle) => ({
    id: vehicle.id,
    user_id: vehicle.userID,
    brand: vehicle.brand,
    model: vehicle.model,
    picture: vehicle.picture,
    priseType: vehicle.priseType,
  }));

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "user_id",
      headerName: "User ID",
      flex: 1,
      editable: true,
    },
    {
      field: "brand",
      headerName: "Brand",
      flex: 1,
      editable: true,
    },
    {
      field: "model",
      headerName: "Model",
      flex: 1,
      editable: true,
    },
    {
      field: "picture",
      headerName: "Link picture",
      flex: 2,
      editable: true,
    },
    {
      field: "priseType",
      headerName: "Prise Type",
      flex: 1,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          {editMode[params.id] ? (
            <>
              <Tooltip title="Save" placement="top">
                <GridActionsCellItem
                  icon={
                    <FaSave
                      className="text-blue-500"
                      style={{ fontSize: "1rem" }}
                    />
                  }
                  label="Save"
                  onClick={() => handleSaveClick(params.id)}
                  color="primary"
                />
              </Tooltip>
              <Tooltip title="Cancel" placement="top">
                <GridActionsCellItem
                  icon={
                    <FaTimes
                      className="text-red-500"
                      style={{ fontSize: "1rem" }}
                    />
                  }
                  label="Cancel"
                  onClick={() => handleCancelClick(params.id)}
                  color="inherit"
                />
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip title="Edit" placement="top">
                <GridActionsCellItem
                  icon={
                    <FaEdit
                      className="text-yellow-500"
                      style={{ fontSize: "1rem" }}
                    />
                  }
                  label="Edit"
                  onClick={() => handleEditClick(params.id)}
                  color="inherit"
                />
              </Tooltip>
              <Tooltip title="Delete" placement="top">
                <GridActionsCellItem
                  icon={
                    <FaTrash
                      className="text-red-500"
                      style={{ fontSize: "1rem" }}
                    />
                  }
                  label="Delete"
                  onClick={() => openDeleteConfirmation(params.id)}
                  color="inherit"
                />
              </Tooltip>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        {errors && (
          <div className="p-4 font-bold text-center text-red-500">{errors}</div>
        )}
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          pagination
          pageSizeOptions={[5, 8, 10, 20]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          hideFooterSelectedRowCount
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={handleProcessRowUpdateError}
          onCellEditStart={handleEditCellChange}
          loading={false}
          isCellEditable={(params) => editMode[params.id]}
          getRowClassName={(params) =>
            editMode[params.id] ? "editing-row" : ""
          }
          getCellClassName={(params) =>
            editMode[params.id] ? "editing-cell" : ""
          }
        />
        {Object.values(editMode).some(Boolean) && (
          <div className="p-4 text-center text-yellow-500">
            <strong>Instructions:</strong>
            <ol className="list-decimal list-inside">
              <li>Edit the desired cell directly by double clicking on it.</li>
              <li>Click on the "Save" icon to apply the changes.</li>
              <li>Confirm the changes in the dialog box that appears.</li>
              <li>If you wish to cancel, click on the "Cancel" icon.</li>
            </ol>
          </div>
        )}
      </div>
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            backgroundColor: "#2d3748",
            color: "lightgray",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{ color: "lightgray", fontSize: "1.1rem" }}
          >
            Are you sure you want to delete this vehicle? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDeleteDialog(false)}
            style={{ color: "lightgray" }}
          >
            Cancel
          </Button>
          <Button onClick={handleDelete} autoFocus style={{ color: "red" }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openEditDialog}
        onClose={handleCancelEdit}
        aria-labelledby="edit-dialog-title"
        aria-describedby="edit-dialog-description"
        PaperProps={{
          style: {
            backgroundColor: "#2d3748",
            color: "lightgray",
          },
        }}
      >
        <DialogTitle id="edit-dialog-title">Confirm Edit</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="edit-dialog-description"
            style={{ color: "lightgray", fontSize: "1.1rem" }}
          >
            Are you sure you want to save changes to this vehicle? This action
            will overwrite the current data.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelEdit} style={{ color: "lightgray" }}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirmEdit}
            autoFocus
            style={{ color: "white", backgroundColor: "#15803d" }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </ThemeProvider>
  );
}
