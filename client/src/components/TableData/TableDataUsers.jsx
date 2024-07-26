import { useState, useEffect } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { FaTrash, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Snackbar,
} from "@mui/material";

// Define your theme
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

function TableDataUsers() {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 8,
  });
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState(null);
  const [editMode, setEditMode] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [originalRowData, setOriginalRowData] = useState({});
console.info(errors,editMode);
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3310/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users.");
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
    fetchUsers();
  }, []);

  const handleEditCellChange = (params) => {
    setEditMode((prev) => ({ ...prev, [params.id]: true }));
  };

  const processRowUpdate = async (newRow, oldRow) => {
    try {
      const response = await fetch(
        `http://localhost:3310/api/users/${newRow.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newRow),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      await fetchUsers();
      return newRow;
    } catch (error) {
      setErrors(error.message);
      return oldRow;
    }
  };

  const handleProcessRowUpdateError = (error) => {
    setErrors(error.message);
  };

  const openDeleteConfirmation = (userId) => {
    setUserToDelete(userId);
    setOpenDeleteDialog(true);
  };

  const handleDelete = async () => {
    if (!userToDelete) return;

    try {
      const response = await fetch(
        `http://localhost:3310/api/users/${userToDelete}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete user");
      }

      setOpenDeleteDialog(false);
      setUserToDelete(null);

      await fetchUsers();
      setSnackbarMessage("User deleted successfully!");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Failed to delete user:", error);
      setErrors(error.message);
    }
  };

  const handleCancelEdit = async () => {
    if (!userToEdit) return;

    try {
      const rowToRevert = originalRowData[userToEdit.id];
      if (!rowToRevert) return;

      const updatedRows = data.map((row) =>
        row.id === userToEdit.id ? rowToRevert : row
      );
      setData(updatedRows);

      const response = await fetch(
        `http://localhost:3310/api/users/${userToEdit.id}`,
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
        delete updatedEditMode[userToEdit.id];
        return updatedEditMode;
      });
      setOriginalRowData((prev) => {
        const updated = { ...prev };
        delete updated[userToEdit.id];
        return updated;
      });
      setUserToEdit(null);

      setSnackbarMessage("Changes reverted");
      setSnackbarOpen(true);
    } catch (error) {
      setErrors(error.message);
    }
  };

  const handleConfirmEdit = () => {
    if (!userToEdit) return;

    setOpenEditDialog(false);
    setEditMode((prev) => {
      const updatedEditMode = { ...prev };
      delete updatedEditMode[userToEdit.id];
      return updatedEditMode;
    });
    setUserToEdit(null);
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
    setUserToEdit(updatedRow);
    setOpenEditDialog(true);
  };

  const handleCancelClick = (id) => {
    setEditMode((prev) => ({ ...prev, [id]: false }));
    handleCancelEdit();
  };

  const rows = data.map((user) => ({
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    gender: user.gender,
    birthDate: user.birthDate,
    postalCode: user.postalCode,
    city: user.city,
    role: user.role,
    numVehicles: user.numVehicles,
  }));

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "email",
      headerName: "Email",
      flex: 2,
      editable: true,
    },
    { field: "firstName", headerName: "First Name", flex: 2, editable: true },
    { field: "lastName", headerName: "Last Name", flex: 2, editable: true },
    { field: "gender", headerName: "Gender", flex: 1, editable: true },
    { field: "birthDate", headerName: "Birth Date", flex: 2, editable: true },
    { field: "postalCode", headerName: "Postal Code", flex: 2, editable: true },
    { field: "city", headerName: "City", flex: 2, editable: true },
    { field: "role", headerName: "Role", flex: 2, editable: true },
    {
      field: "numVehicles",
      headerName: "Num Vehicles",
      flex: 1,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      flex: 2,
      getActions: (params) => [
        <GridActionsCellItem
          key="edit"
          icon={<FaEdit />}
          label="Edit"
          onClick={() => handleEditClick(params.id)}
          showInMenu
        />,
        <GridActionsCellItem
          key="save"
          icon={<FaSave />}
          label="Save"
          onClick={() => handleSaveClick(params.id)}
          showInMenu
        />,
        <GridActionsCellItem
          key="cancel"
          icon={<FaTimes />}
          label="Cancel"
          onClick={() => handleCancelClick(params.id)}
          showInMenu
        />,
        <GridActionsCellItem
          key="delete"
          icon={<FaTrash />}
          label="Delete"
          onClick={() => openDeleteConfirmation(params.id)}
          showInMenu
        />,
      ],
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={paginationModel.pageSize}
          rowsPerPageOptions={[5, 10, 25]}
          pagination
          paginationMode="server"
          onPageSizeChange={(newPageSize) =>
            setPaginationModel((prev) => ({ ...prev, pageSize: newPageSize }))
          }
          onPageChange={(newPage) =>
            setPaginationModel((prev) => ({ ...prev, page: newPage }))
          }
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={handleProcessRowUpdateError}
          editMode="row"
          onEditCellChange={handleEditCellChange}
        />
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Confirmation Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to save the changes?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCancelEdit()} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmEdit} color="secondary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </ThemeProvider>
  );
}

export default TableDataUsers;
