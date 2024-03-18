import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import axios from "axios";

interface Friend {
  userName: string;
  dateStarted: string;
}

interface MessageSelectProps {
  onSelectFriend: (userName: string) => void;
}

const MessageSelect: React.FC<MessageSelectProps> = ({ onSelectFriend }) => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Le token d'authentification est manquant.");
          return;
        }
        const response = await axios.get(
          "http://localhost:3000/api/friendUser",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && Array.isArray(response.data.friends)) {
          setFriends(response.data.friends);
        } else {
          setFriends([]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching friends:", error);
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear().toString().slice(-2)}`;
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
      }}
    >
      <Autocomplete
        id="search-userName"
        sx={{
          width: "80%",
          backgroundColor: "#F3F3F3",
          borderRadius: "10px",
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
            display: "none",
          },
        }}
        options={friends.map((option) => option.userName)}
        renderInput={(params) => (
          <TextField {...params} label="Nom d'utilisateur" variant="outlined" />
        )}
        loading={loading}
      />
      {friends.length > 0 ? (
        friends.map((friend, index) => (
          <Box
            key={index}
            onClick={() => onSelectFriend(friend.userName)}
            sx={{
              width: "70%",
              height: "80px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flexDirection: "row",
              border: "0.5px solid #A1A1A1",
              borderRadius: "10px",
              padding: "0px 15px 0px 15px",
              mt: 2,
            }}
          >
            <Box
              sx={{
                height: "56px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                backgroundColor: "#7786F6",
                color: "#FFF",
                width: "30%",
                cursor: "pointer",
              }}
            >
              <PersonIcon />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                flexDirection: "row",
                ml: 3,
                cursor: "pointer",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  width: "100%",
                  flexDirection: "column",
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
                  {friend.userName}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "13px",
                    fontWeight: "400",
                    color: "#000",
                  }}
                >
                  Ami
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "13px",
                    fontWeight: "400",
                    color: "#000",
                  }}
                >
                  {formatDate(friend.dateStarted)}{" "}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))
      ) : (
        <>
          <Divider
            orientation="horizontal"
            sx={{ width: "80%", height: "2px", borderColor: "A1A1A1", mt: 3 }}
          />
          <Typography
            sx={{
              mt: 4,
              mb: 4,
              fontFamily: "Poppins, sans-serif",
              fontSize: "16px",
              fontWeight: "600",
              color: "#000",
              textAlign: "center",
            }}
          >
            Ajouté des amis
          </Typography>
          <Divider
            orientation="horizontal"
            sx={{ width: "80%", height: "2px", borderColor: "A1A1A1" }}
          />
        </>
      )}
    </Box>
  );
};

export default MessageSelect;
