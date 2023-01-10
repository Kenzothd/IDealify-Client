import * as React from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

export interface LoginDialogProps {
  loginOpen: boolean;
  handleLoginClose: () => void;
}

function LoginDialog(props: LoginDialogProps) {
  const { loginOpen, handleLoginClose } = props;
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>("xs");
  const navigate = useNavigate();

  const handleClose = () => {
    handleLoginClose();
  };

  const handleHomeOwner = () => {
    handleLoginClose();
    navigate("/client/login");
  };

  const handleVendor = () => {
    handleLoginClose();
    navigate("/vendor/login");
  };

  return (
    <Dialog
      onClose={handleClose}
      open={loginOpen}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
    >
      <DialogTitle sx={{ pt: 3 }}>Select Profile</DialogTitle>
      <List sx={{ pl: 3, pr: 3, pb: 3, pt: 0 }}>
        <ListItem disableGutters>
          <ListItemButton onClick={() => handleHomeOwner()}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={"Homeowner"} />
          </ListItemButton>
        </ListItem>
        <ListItem disableGutters>
          <ListItemButton onClick={() => handleVendor()}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={"Vendor"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}

export default LoginDialog;
