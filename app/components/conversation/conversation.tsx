import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Dialog,
  Divider,
  FormControl,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MessageSelect from "./messageSelect";
import NotificationSelect from "./notificationSelect";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

interface User {
  userName: string;
}

interface ConversationPageProps {
  onSelectFriend: (userName: string) => void;
}

const ConversationPage: React.FC<ConversationPageProps> = ({
  onSelectFriend,
}) => {
  const [message, setMessage] = useState("1");
  const [showNotification, setShowNotification] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setMessage(value);
    setShowNotification(value === "2");
  };

  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserName, setSelectedUserName] = useState("");

  const handleOpen = () => {
    setOpen(true);
    fetchUsers();
  };
  const handleClose = () => setOpen(false);

  const handleSearchChange = (event: any) => setSearchTerm(event.target.value);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Le token d'authentification est manquant.");
        return;
      }

      const response = await axios.get(
        "http://localhost:3000/api/allUserName",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.users) {
        setUsers(response.data.users);
      } else {
        console.error("Les données des utilisateurs n'ont pas été reçues.");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(
          error.response.data.error ||
            "Une erreur est survenue lors de la récupération des utilisateurs."
        );
      } else {
        console.error("Une erreur inconnue s'est produite.");
      }
    }
  };

  const filteredUsers = users.filter((user) =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const SendInvitation = async (userName: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Le token d'authentification est manquant.");
        return;
      }
      setSelectedUserName(userName);

      const response = await axios.post(
        "http://localhost:3000/api/sendInvitation",
        {
          userName: userName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSnackBarMessage("Invitation envoyée avec succès !");
      setSnackBarOpen(true);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(
          error.response.data.error ||
            "Une erreur est survenue lors de l'envoi de l'invitation."
        );
      } else {
        console.error("Une erreur inconnue s'est produite.");
      }
    }
  };

  return (
    <Grid
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "120px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <FormControl>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={message}
              label="Message"
              onChange={handleChange}
              sx={{
                ml: 1,
                border: "none",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "& .MuiSvgIcon-root": {
                  color: "#000",
                  mr: -1,
                },
              }}
            >
              <MenuItem value="1">
                <Typography
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "22px",
                    fontWeight: "600",
                    color: "#000",
                  }}
                >
                  Message
                </Typography>
              </MenuItem>
              <MenuItem value="2">
                <Typography
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "22px",
                    fontWeight: "600",
                    color: "#000",
                  }}
                >
                  Notification
                </Typography>
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Box
            onClick={handleOpen}
            sx={{
              width: "46px",
              height: "46px",
              display: "flex",
              borderRadius: "40px",
              backgroundColor: "#7786F6",
              color: "#FFF",
              alignItems: "center",
              justifyContent: "center",
              mr: 2,
              cursor: "pointer",
            }}
          >
            <AddIcon />
          </Box>
        </Box>
      </Box>
      <Divider
        orientation="horizontal"
        sx={{
          width: "100%",
          height: "2px",
          borderColor: "A1A1A1",
          mb: 4,
          mt: -1,
        }}
      />
      {showNotification ? (
        <NotificationSelect />
      ) : (
        <MessageSelect onSelectFriend={onSelectFriend} />
      )}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <Box sx={{ padding: "30px" }}>
          <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Rechercher des utilisateurs..."
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{ mr: 3.7 }}
            />
            <IconButton onClick={handleClose} sx={{ mt: 1 }}>
              <CloseIcon sx={{ color: "#7786F6" }} />
            </IconButton>
          </Box>
          <List>
            {filteredUsers.map((user, index) => (
              <React.Fragment key={user.userName}>
                <ListItem>
                  <ListItemText primary={user.userName} />
                  <ListItemSecondaryAction>
                    <Button
                      onClick={() => SendInvitation(user.userName)}
                      sx={{
                        backgroundColor: "#7786F6",
                        padding: "2px 5px 2px 5px",
                        borderRadius: "5px",
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: "#7786F6",
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "13px",
                          fontWeight: "400",
                          color: "#FFF",
                        }}
                      >
                        Ajouté
                      </Typography>
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
                {index !== filteredUsers.length - 1 && (
                  <Divider sx={{ width: "100%", my: 1 }} />
                )}
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Dialog>
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackBarOpen(false)}
      >
        <Alert
          onClose={() => setSnackBarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackBarMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default ConversationPage;
