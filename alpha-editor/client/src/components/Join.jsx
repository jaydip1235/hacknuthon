import * as React from 'react';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CodeIcon from '@mui/icons-material/Code';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Code from '@mui/icons-material/Code';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

export default function Album() {
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  const navigate=useNavigate();
  const [username,setUsername]=useState("");
  const [roomId,setRoomId]=useState("");

  const createRoom=async()=>{
    try {
        const {data}=await axios.post('/api/createroom',{username},{
            headers:{
                "Content-Type":"application/json"
            }
        })
        navigate(`/room/${data._id}`);

    } catch (error) {
        console.log(error);
    }
}

  return (
      <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative" style={{
              backgroundColor: "#61004a",
              backgroundImage: `url("https://www.transparenttextures.com/patterns/blizzard.png")`,
            }}>
        <Toolbar>
          <Code sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" fontWeight="bold" fontFamily='Lobster, cursive' noWrap>
          Alpha-editor
          </Typography>
          <Typography sx={{ml:'auto'}} variant="h6" color="inherit" fontWeight="bold" fontFamily='Lobster, cursive' noWrap style={{cursor:"pointer"}}
          onClick={()=>{
            window.open("https://alpha-doc.herokuapp.com","_blank")
          }}
          >
          Code-doc
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            pt: 8,
            pb: 6,
            height:'84vh'
          }}
          style={{backgroundColor:'#ff7dcb',backgroundImage:'url("https://www.transparenttextures.com/patterns/dark-matter.png")'}}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h3"
              align="center"
              color="text.primary"
              fontWeight="bold" fontFamily='Lobster, cursive'
              gutterBottom
            >
              Alpha-code-editor
            </Typography>
            <Typography variant="h6" align="center" color="text.secondary" paragraph>
            * A cross -platform IDE website which will provide features for live code editing and compilation along with set of tools that streamlines their workflow!
            <br/>
            * One will be able to create documentation of their code and others will be able to view that documentation, can filter according to tags and can also be able to get suggestion of similar documentation!
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" style={{backgroundColor:"#61004a"}} onClick={handleClickOpen}>Create Room</Button>
              <Button variant="outlined" style={{color:"#61004a", borderColor:"#61004a"}} onClick={handleClickOpen2}>Join Room</Button>
            </Stack>
          </Container>
        </Box>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p:2,height:'2' }} component="footer" style={{
              backgroundColor: "#61004a",
              backgroundImage: `url("https://www.transparenttextures.com/patterns/blizzard.png")`,
              color:"white"
            }}>
        <Typography variant="h6" align="center" gutterBottom>
        © {new Date().getFullYear()} - Site created by Team Alpha
        </Typography>
      </Box>
      {/* End footer */}
    </ThemeProvider>
    <Dialog open={open} onClose={handleClose} >
        <DialogTitle style={{color:"#61004a"}}>Create Room</DialogTitle>
        <DialogContent >
          <DialogContentText style={{color:"#eb4deb"}}>
            To create your own room, please enter the room name
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Room Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e)=>setUsername(e.target.value)}
            value={username}
            InputLabelProps={{style: {color:"#61004a",borderBottomColor:"#61004a"}}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{color:"#eb9eeb"}}>Cancel</Button>
          <Button onClick={createRoom} style={{color:"#61004a"}}>Create</Button>
        </DialogActions>
      </Dialog>
      
      <Dialog open={open2} onClose={handleClose2}>
        <DialogTitle style={{color:"#61004a"}}>Join Room</DialogTitle>
        <DialogContent>
          <DialogContentText style={{color:"#eb4deb"}}>
            Enter Room ID to join a room
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Room ID"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e)=>setRoomId(e.target.value)}
            value={roomId}
            InputLabelProps={{style: {color:"#61004a"}}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2} style={{color:"#eb9eeb"}}>Cancel</Button>
          <Button onClick={()=>navigate(`/room/${roomId}`)} style={{color:"#61004a"}}>Join</Button>
        </DialogActions>
      </Dialog>
      </>
  );
}