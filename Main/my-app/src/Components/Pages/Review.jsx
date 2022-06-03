import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCompanyReviews } from '../../Redux/CompanyReviews/action';
import axios from "axios";
import { ReviewBox } from "../Layout/Review/ReviewBox";
import StarIcon from '@material-ui/icons/Star';
import { Grid, 
    Container,
    makeStyles,
    Typography,
    Button,
    withStyles
} from '@material-ui/core';
import { Redirect } from 'react-router-dom';

const useStyle = makeStyles((theme) => ({
    imgCont: {
        padding: "5px",
        borderRadius: "5px",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
    },
    optionTab: {
        cursor: "pointer",
        margin: "0 40px 0 40px",
        '&:hover': {
            borderBottom: "5px solid #397ff8",
            fontWeight: "bold"
        }
    }
}))

const FollowButton = withStyles((theme) => ({
    root: {
        color: "#ffffff",
        backgroundColor: "#085ff7",
        cursor: "pointer",
        width: "200px",
        borderRadius: "200px",
        height: "43px",
        marginLeft: "50px",
        '&:hover': {
            backgroundColor: "#0542ac",
        },
    },
}))(Button);

export function Review(props) {
    const classes = useStyle();
    const companyDetails = useSelector(state => state.companies.currentCompany);
    const [reviews, setReviews] = useState([]);
    const query = new URLSearchParams(props.location.search);
    const id =query.get('id')
    const dispatch = useDispatch()
    const {isAuth} = useSelector(state=>state.login)
    useEffect(()=>{
        dispatch(getCompanyReviews(id));

        axios.get(`https://indeed-mock-server.herokuapp.com/reviews?company_id=${id}`)
            .then((res) => {
                setReviews(res.data)
                
            })
            .catch((err) => console.log("Error getting reviews" + err))
        
    },[])
    return (

         isAuth ? (companyDetails ?
        <Container maxwidth = "xl">
            <Grid container style = {{justifyContent:"space-between", alignItems: "center", marginBottom: "40px"}}>
                <Grid container item lg={6} md={7} sm={8}>
                    <Grid item className = {classes.imgCont} >
                        <img src={companyDetails.logo} alt={companyDetails.company} width="100px" />
                    </Grid>
                    <Grid item style = {{paddingTop: "40px", paddingLeft: "20px"}}>
                        <Typography variant="h5" >{companyDetails.company}</Typography>
                        <Typography variant="h5" >
                            {companyDetails.ratings}
                            <StarIcon style = {{color: "#9d2b6b", paddingRight: "10px"}}/>
                            <Typography variant="caption" >{reviews.length} reviews</Typography>
                        </Typography>
                    </Grid>
                </Grid>
                <Grid  item >
                    <FollowButton>Follow</FollowButton>
                    <br/>
                    <Typography variant="caption" >Get weekly updates, new jobs, and reviews</Typography>
                </Grid>
            </Grid>
            <Grid container style = {{height: "40px"}}>
                {/* <Grid item style = {{cursor: "pointer", fontWeight: "bold", borderBottom: "5px solid #085ff7"}}>
                    SnapShot
                </Grid> */}
                <Grid item className = {classes.optionTab} style={{fontSize:"x-large"}}>
                    About the company
                </Grid>
                <Grid item className = {classes.optionTab}>
                    {reviews.length} Reviews
                </Grid>
                {/* <Grid item className = {classes.optionTab}>
                    {companyDetails.salaries} Salaries
                </Grid>
                <Grid item className = {classes.optionTab}>
                    {companyDetails.photos} Photos
                </Grid>
                <Grid item className = {classes.optionTab}>
                    {companyDetails.jobs} Jobs
                </Grid>
                <Grid item className = {classes.optionTab}>
                    {companyDetails.questions} Questions
                </Grid>
                <Grid item className = {classes.optionTab}>
                    Interviews
                </Grid> */}
            </Grid>
            <Grid item style = {{marginTop: "20px", marginBottom: "30px"}} >
                <Typography variant = "caption" >{companyDetails.company} Careers and Employment</Typography>
            </Grid>
            <Grid item style = {{marginTop: "20px", marginBottom: "50px"}}>
                <Typography variant = "h4"><b>About the company</b></Typography>
            </Grid>
            {/* <Grid container spacing={3} >
                <Grid item style = {{flex:1}} >
                    <img src={companyDetails.ceo_image} alt={companyDetails.ceo_name} style={{height: "350px", borderRadius: "10px"}}/>
                </Grid>
                <Grid container item style = {{flex:2, flexDirection: "column"}}>
                    <Grid item xl={6} lg={6}  style = {{border: "2px solid #f2f2f2", borderRadius: "10px", padding: "20px"}}>
                        <div style = {{fontWeight: "600"}}>
                            CEO
                        </div>
                        <br/><br/>
                        <div>
                            {companyDetails.ceo_name}
                        </div>
                    </Grid>
                    <Grid item xl={6} lg={6} style = {{border: "2px solid #f2f2f2", borderRadius: "10px", padding: "20px"}}>
                        <div style = {{fontWeight: "600"}}>
                            Revenue
                        </div>
                        <br/><br/>
                        <div>
                            {companyDetails.revenue}
                        </div>
                    </Grid>
                </Grid>
                <Grid container item style = {{flex:3, flexDirection: "column"}}>
                    <Grid item xl={6} lg={6} style = {{border: "2px solid #f2f2f2", borderRadius: "10px", padding: "20px"}}>
                        <div style = {{fontWeight: "600"}}>
                            Founded
                        </div>
                        <br/><br/>
                        <div style = {{}}>
                            {companyDetails.founded_year}
                        </div>
                    </Grid>
                    <Grid item xl={6} lg={6} style = {{border: "2px solid #f2f2f2", borderRadius: "10px", padding: "20px"}}>
                        <div style = {{fontWeight: "600"}}>
                            Company size
                        </div>
                        <br/><br/>
                        <div style = {{}}>
                            more than<br/>
                            {companyDetails.company_size}
                        </div>
                    </Grid>
                </Grid>
            </Grid> */}

            {/* ----> below padding change from 40px to  */}
            <Grid container style = {{justifyContent: "center", padding: "10px"}}>
                <Typography variant = "body2" style = {{color: "#767676", textAlign: "left"}}>
                    {companyDetails.description}
                </Typography>
            </Grid>
            <Typography variant = "h5" style = {{color: "#085ff7", fontWeight: "600", cursor: "pointer"}}>
                Learn More ＞
            </Typography>
            <Grid item style = {{marginTop: "30px", marginBottom: "50px"}}>
                <Typography variant = "h4"><b>Reviews</b></Typography>
            </Grid>
            <Grid container spacing={10}>
                {
                    reviews.map((item) => {
                        return (
                            <ReviewBox 
                                key = {item.id}
                                rating = {item.rating}
                                job_position = {item.job_position}
                                date = {item.date}
                                title = {item.title}
                                description = {item.description}
                            />
                        )
                    })
                }
            </Grid>


            <Grid container spacing = {1} style = {{fontSize : "14px", backgroundColor: "white", padding: "15px 10px", margin : "50px -20px 0"}} >
                <Grid item style = {{cursor: "pointer"}}>
                © 2020 Indeed
                </Grid>
                <Grid item>
                    -
                </Grid>
                <Grid item style = {{cursor: "pointer"}}>
                    Accessibility at Indeed
                </Grid>
                <Grid item>
                    -
                </Grid>
                <Grid item style = {{cursor: "pointer"}}>
                    Privacy Center
                </Grid>
                <Grid item>
                    -
                </Grid>
                <Grid item style = {{cursor: "pointer"}}>
                    Cookies
                </Grid>
                <Grid item>
                    -
                </Grid>
                <Grid item style = {{cursor: "pointer"}}>
                    Privacy
                </Grid>
                <Grid item>
                    -
                </Grid>
                <Grid item style = {{cursor: "pointer"}}>
                    Terms
                </Grid>
            </Grid>
        </Container>
        : <></>) :  <Redirect to="/login" /> 
    )
}
