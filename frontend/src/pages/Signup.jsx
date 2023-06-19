import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import SignForm from "../components/SignForm";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Signup() {

  const { register } = useAuth();
  const navigate = useNavigate();
  const [err, setErr] = useState('')

  const handleSubmit = async ({ userName, password, confirmPassword }) => {
    if (!userName || !password) {
      setErr('empty field')
    } else if (password !== confirmPassword) {
      setErr("passwords don't match ")
    } else {
      try {
          await register(userName, password)
          navigate('/signin')
      } catch (err) {
        setErr('some thing went wrong ')
      }
    }
  };
  return (
    <SignForm signIn={false} Submit={handleSubmit} err={err} />
  );
}

export default Signup;
