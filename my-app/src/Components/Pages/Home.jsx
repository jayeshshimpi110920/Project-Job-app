import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import SearchForm from '../Layout/Forms/SearchForm/SearchForm';
import RecentSearch from '../Layout/RecentSearch';


const useStyles = makeStyles((theme) => ({
    container:{
        padding:'0px 10vw',
        marginTop:'80px'
    },
    linkContainer:{
        textAlign:'center',
        marginTop:'30px'
    },
    link:{
        fontWeight:'bolder',
        color:theme.palette.primary.main
    }
  }))

function Home(props) {
    const classes = useStyles();
    
    return (
        <Container className={classes.container}>
            <SearchForm />
            <div className={classes.linkContainer}>
                <Link className={classes.link} to="/postjob" >
                    {`Employers Yours next job is - `} 
                </Link>
                Your next hire is here
            </div>
            <RecentSearch />
        </Container>
    );
}

export default Home;