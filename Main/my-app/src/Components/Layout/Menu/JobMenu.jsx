import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import NotInterested from '@material-ui/icons/NotInterested';
import ErrorIcon from '@material-ui/icons/Error';
import { useDispatch, useSelector } from 'react-redux';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { fetchSuccess } from '../../../Redux/Search/actions';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    {...props}
  />
));



export default function JobMenu({job,handelSave,removeFromSaved}) {

const {jobkey,companyName,location,jobTitle} = job
let jobs = useSelector(state=>state.search.searched)
const {saved_jobs} = useSelector(state=>state.login.loggedUser)
const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const removeFromList = ({jobkey,location,companyName,jobTitle})=>{
    const newJobs = jobs.filter((job)=>job.jobkey !== jobkey)
    dispatch(fetchSuccess(newJobs))
  }

  return (
    <div style={{position:'absolute',top:"0",right:'0'}}>
        
        <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
     
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        
      >
        {

        saved_jobs[jobkey] ?
          <MenuItem   onClick={()=>{
              handleClose();
              removeFromSaved({jobkey})
          }}>

            <ListItemIcon style={{display:'flex',justifyContent:'center'}} > 
              <FavoriteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Saved" />
          </MenuItem> 
        
        :

          <MenuItem   onClick={()=>{
            handleClose();
            handelSave({jobkey,location,companyName,jobTitle})
        }}>

          <ListItemIcon style={{display:'flex',justifyContent:'center'}} > 
            <FavoriteBorderIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Save Job" />
        </MenuItem>
        }

        <MenuItem onClick={()=>{
                handleClose();
                removeFromList({jobkey,location,companyName,jobTitle})
            }}  >
          <ListItemIcon style={{display:'flex',justifyContent:'center'}}>
            <NotInterested fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Not Interseted" />
        </MenuItem>
        <MenuItem style={{backgroundColor: 'white',color:"black"}}>
          <ListItemIcon style={{display:'flex',justifyContent:'center'}}>
            <ErrorIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Is there a problem with the job" />
        </MenuItem>
      </StyledMenu>
       
    </div>
  );
}