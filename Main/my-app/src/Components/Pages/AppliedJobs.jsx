import { Box, Button, Container,  makeStyles, Typography } from '@material-ui/core';
import React, { useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { timeDifference } from '../../Utils/timeDifference';
import {makeApplyRequest} from "../../Redux/JobApply/actions"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles((theme)=>({
    applyButton:{
        color:'black',
        width:"200px",
        height:'40px',
        borderRadius:'50px',
        border:'2px solid #0145E3',
        marginRight:'2%',

    },
    updateButton:{
        color:'#0145E3',
        width:"200px",
        height:'40px',
        border:'2px solid #909090',
        borderRadius:'50px',
        
    }
}))

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function AppliedJobs(props) {
    const classes = useStyles();
    const {saved_jobs,applied_job,id} = useSelector(state=>state.login.loggedUser)
    const jobKeys = Object.keys(saved_jobs).reverse()
    const applied = Object.keys(applied_job).reverse()
   
    const [ignored, forceUpdate] =useReducer(x => x + 1, 0)

    const dispatch = useDispatch();
    // console.log(loggedUser)
    const [open, setOpen] = useState(false)
    const [jobId, setJobId] = useState("")

  

    const handleClose=() =>{
        setOpen(false)
        setJobId("")
    }

    const handleOpen=(id)=>{
        setJobId(id)
        setOpen(true)
    }

  

    const handleCancel=(key)=>{
        console.log(applied_job)
        delete applied_job[key];
        console.log(applied_job)
        dispatch(makeApplyRequest({user_id:id,saved_jobs,applied_job}))
        setOpen(false)
        forceUpdate()
    }
    
    return (
        
        <Container style={{padding:'100px 10vw',display:'flex'}}>
                <Box>
                    <Typography variant={'h5'} style={{fontSize:'40px',marginBottom:'20px'}}>
                        My Jobs
                    </Typography>
                    <ul style={{display:'flex',marginBottom:'20px'}}>
                        <NavLink to="/savedjobs" activeStyle={{
                            color:"#0145E3",
                            textDecoration:'underline'
                        }}
                        style={{
                            fontSize:'25px',
                            marginRight:"30px"
                        }}
                        >
                            Saved {jobKeys.length}
                        </NavLink>
                        <NavLink to="/appliedjobs"
                        activeStyle={{
                            color:"#0145E3",
                            textDecoration:'underline'
                        }}
                        style={{
                            fontSize:'25px',
                            marginRight:"30px"
                        }}
                        
                        >
                            Applied {applied.length}
                        </NavLink>
                    </ul>

                    <Box>
                        
                            {
                                applied.map((key)=>{
                                    return (
                                        <>
                                        <Box style={{display:'flex'}}   key={key} >
                                        
                                            <Box style={{width:'500px'}}>
                                                <Typography variant='h5' style={{fontSize:'18px',marginBottom:'15px'}}> 
                                                    {applied_job[key].jobTitle}
                                                </Typography>
                                                <Box style={{marginBottom:'15px',fontWeight:'600',color:'grey'}}>
                                                {applied_job[key].companyName} | {applied_job[key].location}
                                                </Box>
                                                <Box style={{marginBottom:'30px',fontSize:'14px',fontWeight:'400',color:'grey'}}>
                                                    Applied { timeDifference(applied_job[key].dateSaved)}
                                                </Box>
                                            </Box>
                                            <Box style={{display:'flex'}}>
                                            <Button className={classes.applyButton} onClick={()=>handleOpen(key)} >
                                                    Cancel {jobId  ? null : null} {ignored ? null : null}
                                            </Button>

                                            </Box>
                                           
                                    </Box>
                                     <Dialog
                                     open={open}
                                     TransitionComponent={Transition}
                                     keepMounted
                                     onClose={handleClose}
                                     aria-labelledby="alert-dialog-slide-title"
                                     aria-describedby="alert-dialog-slide-description"
                                 >
                                     <DialogTitle id="alert-dialog-slide-title">{"Are you sure you want to cancel the application?"}</DialogTitle>
                                     <DialogContent>
                                     <DialogContentText id="alert-dialog-slide-description">
                                        
                                     </DialogContentText>
                                     </DialogContent>
                                     <DialogActions>
                                     <Button onClick={()=> handleCancel(key)} color="primary">
                                         Yes
                                     </Button>
                                     <Button onClick={handleClose} color="primary">
                                         No
                                     </Button>
                                     </DialogActions>
                                 </Dialog>
                                 </>
                                    )
                                })
                            }
                        
                            
                    
                    </Box>
                   
                </Box>
           
        
        </Container>
    );
}

export default AppliedJobs;