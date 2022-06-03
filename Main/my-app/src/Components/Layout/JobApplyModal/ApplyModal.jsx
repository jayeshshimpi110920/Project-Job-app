import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Grid, OutlinedInput } from '@material-ui/core';
import UploadForm  from './UploadForm';
import { Button } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline:'none'
  },
  applyForm:{
    boxSizing:'border-box',
    width: "600px",
    borderRadius:"10px", 
    height: "80vh", 
    backgroundColor: "white",
    outline:'none',
    padding:'40px',
  },
  label:{
    marginBottom:"20px"
  }
}));

export const ApplyModal = ({open,handleClose,jobId,handleApply}) => {
  const classes = useStyles()
  return (
    <div
      style={{
       
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position:"relative"
      }}
     
    >
      
      <Modal
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        
        <div className={classes.applyForm} >
          {/* <div>{jobId}</div> */}

          <form action="
          ">
            <Grid container>
              <Grid item>
                <label style={{margin:"20px 0px",display:"block"}}>
                    Name
                </label>
                
                <OutlinedInput required style={{width:'500px'}}/>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item>
                <label style={{margin:"20px 0px",display:"block"}}>
                    Email
                </label>
                
                <OutlinedInput required style={{width:'500px'}} />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item>
                <label style={{margin:"20px 0px",display:"block"}}>
                    Phone
                </label>
                
                <OutlinedInput required style={{width:'500px'}}/>
              </Grid>
            </Grid>
              <UploadForm />
          </form>
          <Button variant='contained' color='primary' style={{marginRight:'20px'}} onClick={handleApply}>Apply</Button>
          <Button variant='outlined' onClick={handleClose}>cancel</Button>
        </div>


      </Modal>
    </div>
  );
};
