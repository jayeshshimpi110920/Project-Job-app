import { Container,Grid,OutlinedInput,Typography ,InputAdornment, Button, TextareaAutosize} from '@material-ui/core';
import {  IconButton, Snackbar } from '@material-ui/core';
import React, { useState } from 'react';

import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Quill from '../Layout/Quill';
import { useDispatch } from 'react-redux';
import { makePostJobRequest } from '../../Redux/PostJob/action';

const useStyles = makeStyles((theme) => ({
    root: {
        width:'100%',
        '& > *':{
            marginBottom:'20px'
        }
    },
    select_job_type: {
        width:'100%'
    }

  }));
function PostJob(props) {
    const classes = useStyles();
    
    const [companyName,setCompanyName] = useState(''); 
    const [jobTitle,setJobTitle] = useState(''); 
    const [location,setLocation] = useState(''); 
    const [companyUrl,setCompanyUrl] = useState(''); 
    const [jobType,setJobType] = useState('Full-Time'); 
    const [occupation,setOccupation] = useState('Software');

    const [education,setEducation] = useState("12th Pass");

    const [startSalary,setStartSalary] = useState(''); 
    const [endSalary,setEndSalary] = useState('') ;
    const [salaryType,setSalaryType] = useState('Per year') ;
    const [jobDescription,setJobDescription] = useState('')
    const [snippet,setSnippet] = useState('')
    
    const [snackBarOpen,setSnackBarOpen] = useState(false)
   

    
    const dispatch = useDispatch()

    const handelPost = (e)=>{
        e.preventDefault();
        
        dispatch(makePostJobRequest({
            companyName,
            jobTitle,
            location,
            companyUrl,
            jobType,
            occupation,
            education,
            startSalary,
            endSalary,
            salaryType,
            jobDescription,
            snippet:snippet,
            date:new Date().getTime()
        }))

        // setCompanyName(''); 
        // setJobTitle(''); 
        // setLocation(''); 
        // setCompanyUrl(''); 
        // setJobType('Full-Time'); 
        // setOccupation('Software');

        // setEducation("12th Pass");

        // setStartSalary(''); 
        // setEndSalary('') ;
        // setSalaryType('Per year') ;
        // setJobDescription('')
        // setSnippet('')

        
        setSnackBarOpen(true)
        
        
    }
    return (
        <Container>
            <Typography variant='h4'>
                Indeed for employers
            </Typography>
            <form onSubmit={handelPost} className={classes.root} style={{width:'100%'}}>
                
                <Grid item lg={12} md={12} sm={12} xs={12} >
                    <label >
                        Company name for this job
                    </label>
                    <OutlinedInput
                    style={{width:'100%'}}
                    className={classes.input}
                    defaultValue={companyName}
                    required
                    onChange={(e)=>{setCompanyName(e.target.value)}}
                    />
                </Grid>
                
                <Grid item lg={12} md={12} sm={12} xs={12} >
                    <label >
                        Job Title
                    </label>
                    <OutlinedInput
                    style={{width:'100%'}}
                    className={classes.input}
                    defaultValue = {jobTitle}
                    required
                    onChange={(e)=>{setJobTitle(e.target.value)}}
                    />
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12} >
                    <label >
                        Location
                    </label>
                    <OutlinedInput
                    style={{width:'100%'}}
                    className={classes.input }
                    defaultValue={location}
                    required
                    onChange={(e)=>{setLocation(e.target.value)}}
                    />
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12} >
                    <label >
                        Company website
                    </label>
                    <OutlinedInput
                    style={{width:'100%'}}
                    className={classes.input }
                    required
                    defaultValue={companyUrl}
                    onChange={(e)=>{setCompanyUrl(e.target.value)}}
                    />
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12} >
                    <label >
                        Job Summary
                    </label>
                    
                    <TextareaAutosize value={snippet} onChange={(e)=>setSnippet(e.target.value)} aria-label="minimum height" rowsMin={6} style={{width:"100%",fontSize:'20px'}}  placeholder="" />

                </Grid>
                
            


            <Grid spacing={2} item container lg={12} md={12} sm={12} xs={12}>
                <Grid item lg={4} md={4} sm={4} xs={4}>
                    <FormControl variant="outlined" className={classes.select_job_type}>
                        <label>
                            Job Type
                        </label>
                        <Select defaultValue={jobType} native={true} onChange={(e)=>setJobType(e.target.value)}>
                            <option value={'Full-Time'}>
                                Full_Time
                            </option>
                            <option value={'Part-Time'}>
                                Part_time
                            </option>
                            <option value={'Contract'}>
                                Contract
                            </option>
                            <option value={'Fresher'}>
                                Fresher
                            </option>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item lg={4} md={4} sm={4} xs={4}>
                    <FormControl variant="outlined" className={classes.select_job_type}>
                        <label>
                            Occupation
                        </label>
                        <Select
                        native={true}
                        defaultValue={occupation}
                        onChange={e => setOccupation (e.target.value)}
                        
                        >
                        
                        <option value={'Software'}>Software</option>
                        <option value={'Government'}>Government</option>
                        <option value={'Account'}>Account</option>
                        <option value={'Executive and personal assitansts'}>Executive and personal assitansts</option>
                        
                        </Select>
                    </FormControl>

                </Grid>
                <Grid item lg={4} md={4} sm={4} xs={4}>
                    <FormControl variant="outlined" className={classes.select_job_type}>
                        <label>
                            Education Level
                        </label>
                        <Select
                        defaultValue={education}
                        native={true}
                        onChange={(e)=>{setEducation(e.target.value)}}
                        >
                            
                            <option value={'12th pass'}>12th pass</option>
                            <option value={'Diploma'}>Diploma</option>
                            <option value={"Bachelor's degree"}>Bachelor's degree</option>
                            <option value={"Master's degree"}>Master's degree</option>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid item container spacing={1} lg={12} md={12} sm={12} xs={12}>
                <Grid item container lg={12} md={12} sm={12} xs={12}>
                    <label>Salary</label>
                </Grid>

                <Grid item lg={4} md={4} sm={4} xs={4}>
                    <OutlinedInput
                    startAdornment={<InputAdornment position="start"> Rs </InputAdornment>}
                    style={{width:'100%'}}
                    className={classes.input }
                    value={startSalary}
                    required
                    onChange={(e)=>setStartSalary(e.target.value)}
                    /> 
                </Grid>
                <Grid item lg={1} md={1} sm={1} xs={1}>
                    <Typography variant='h5'>
                        to
                    </Typography>
                </Grid>
                <Grid item lg={3} md={3} sm={3} xs={3}>
                    <OutlinedInput
                    style={{width:'100%'}}
                    className={classes.input }
                    value={endSalary}
                    onChange={(e)=>setEndSalary(e.target.value)}
                    required
                    />
                </Grid>
                <Grid item lg={4} md={4} sm={4} xs={4}>
                    <FormControl variant="outlined" className={classes.select_job_type}>
                        <Select
                            defaultValue={salaryType}
                            native={true}
                            onChange={(e)=>setSalaryType(e.target.value)}
                        >   
                        
                        <option value={'Per Hour'}>Per Hour</option>
                        <option value={'Per Day'}>Per month</option>
                        <option value={'Per Month'}>Per day</option>
                        <option value={'Per year'}>Per year</option>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <label>
                Description
            </label>
            <Quill jobDescription={jobDescription} setJobDescription={setJobDescription} />
            <Button variant="contained" color='primary' type='submit'>
                Submit
            </Button>
            </form>
           

                <Snackbar
                anchorOrigin={{vertical:'top',horizontal:'left'}}
                open={snackBarOpen}
                autoHideDuration={3000}
                message={<span className="format__id">Job Successfully posted</span>}
                ContentProps={{
                    'aria-describedby':'message-id'
                }}
                onClose={()=>setSnackBarOpen(false)}
                action={[
                    <IconButton
                    onClick={()=>{setSnackBarOpen(false)}}
                    color="inherit"
                    key="close"
                    aria-label="close">
                        <CloseIcon/>
                    </IconButton>
                ]}
/>
        </Container>
    );
}

export default PostJob;