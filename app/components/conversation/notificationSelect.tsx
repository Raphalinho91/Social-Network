import { Box, Button, Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import axios from "axios";

interface Invitation {
  id: string;
  senderUserName: string;
}

const NotificationSelect = () => {
  const [invitations, setInvitations] = useState<Invitation[]>([]);

  useEffect(() => {
    const fetchInvitations = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Le token d'authentification est manquant.");
        return;
      }

      const response = await axios.get(
        "http://localhost:3000/api/receiveInvitation",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.invitationsData) {
        setInvitations(response.data.invitationsData);
      } else {
        console.error("Aucune invitation reçue.");
      }
    };

    fetchInvitations();
  }, []);

  const handleAccept = async (invitationId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Le token d'authentification est manquant.");
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/api/acceptInvitation",
        { invitationId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Invitation acceptée :", response.data);
      setInvitations((prev) =>
        prev.filter((invite) => invite.id !== invitationId)
      );
    } catch (error) {
      console.error("Erreur lors de l'acceptation de l'invitation :", error);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "column",
        backgroundColor: "#fff",
      }}
    >
      {invitations.length > 0 ? (
        invitations.map((invitation, index) => (
          <React.Fragment key={index}>
            <Divider
              orientation="horizontal"
              sx={{ width: "80%", height: "2px", borderColor: "A1A1A1" }}
            />
            <Box
              sx={{
                width: "80%",
                height: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                flexDirection: "row",
              }}
            >
              <Box
                sx={{
                  width: "56px",
                  height: "56px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "10px",
                  backgroundColor: "#7786F6",
                  color: "#FFF",
                  cursor: "pointer",
                }}
              >
                <PersonIcon />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  flexDirection: "column",
                  ml: 3,
                  gap: "10px",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#000",
                  }}
                >
                  {invitation.senderUserName}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    flexDirection: "row",
                    gap: "20px",
                  }}
                >
                  <Button
                    onClick={() => handleAccept(invitation.id)}
                    sx={{
                      backgroundColor: "#C6F6D5",
                      padding: "2px 5px 2px 5px",
                      borderRadius: "5px",
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "#C6F6D5",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "13px",
                        fontWeight: "400",
                        color: "#38A169",
                      }}
                    >
                      Accepté
                    </Typography>
                  </Button>
                  <Button
                    sx={{
                      backgroundColor: "#FEEBC8",
                      padding: "2px 5px 2px 5px",
                      borderRadius: "5px",
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "#FEEBC8",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "13px",
                        fontWeight: "400",
                        color: "#DD6B20",
                      }}
                    >
                      Refusé
                    </Typography>
                  </Button>
                </Box>
              </Box>
            </Box>
          </React.Fragment>
        ))
      ) : (
        <Typography
          sx={{
            mt: 2,
            fontFamily: "Poppins, sans-serif",
            fontSize: "16px",
            fontWeight: "600",
            color: "#000",
          }}
        >
          Vous n&#39;avez aucune notification
        </Typography>
      )}
    </Box>
  );
};

export default NotificationSelect;
