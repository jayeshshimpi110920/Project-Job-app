import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { CompanyBox } from "../Layout/Companies/CompanyBox";
import { useHistory } from 'react-router-dom';
import { searchCompany, getCompanyReviews } from '../../Redux/CompanyReviews/action';
import SearchIcon from '@material-ui/icons/Search';
import Rating from '@material-ui/lab/Rating';
import { 
    Container,
    makeStyles,
    Grid,
    Typography,

    Button,
    withStyles,
    InputAdornment,
    TextField,
    FormHelperText

} from '@material-ui/core';
import TypeWriter from './floattext';

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: "#f2f2f2",
        padding: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center" 
    },
    boxSearch: {
        backgroundColor: "white",
        margin: 0,
        height: "220px",
        // width:"400px",
        backgroundSize: "450px 220px",
        backgroundPosition: "bottom right",
        backgroundImage: "url(/Images/banner.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center" 

    },
    outerSearchGrid: {
        marginTop: "50px",
        flexDirection: "column",
        alignContent: "flex-end"
    },
    h3: {
        fontWeight: "bold",
        marginBottom: "20px" 
    },
    h5: {
        color: "#6f78a5",
        fontWeight: "400",
        marginBottom: "70px"
    },
    outlinedInput: {
        border: "2px solid #cccccc",
        borderRadius: "10px",
        width: "450px"
    },
    formhelperText: {
        color: "#085ff7",
        paddingLeft: "20px",
        cursor: "pointer"
    },
    companiesHiring: {
        marginTop: "50px",
        marginBottom: "20px",
        backgroundColor: "white",
        display: "flex",
    }
}))

const SearchButton = withStyles((theme) => ({
    root: {
        color: "#ffffff",
        backgroundColor: "#085ff7",
        cursor: "pointer",
        width: "200px",
        borderRadius: "200px",
        height: "53px",
        marginLeft: "50px",
        '&:hover': {
            backgroundColor: "#0542ac",
        },
    },
}))(Button);

export function CompanyReviews() {

    const classes = useStyles();
    const[companies, setCompanies] = useState([]);
    const[query, setQuery] = useState("");
    const isSearching = useSelector(state => state.companies.isSearching);
    const dispatch = useDispatch();
    const history = useHistory();
   
    const {isAuth} = useSelector(state=>state.login)
    

    const onTextChange = (e) => {
        setQuery(e.target.value);
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(searchCompany(query))
    }

    const handleCompanyClick = (id) => {
        dispatch(getCompanyReviews(id));
        history.push(`/reviews?id=${id}`)
    }

    useEffect(() => {
        axios.get("https://indeed-mock-server.herokuapp.com/companies")
            .then((res) => {
                
                setCompanies(res.data)
            })
            .catch((err) => console.log(err))
    },[])

    const ftext={
        
            textAlign: "center",
            padding: "5px",
            fontSize:"3vw",
            fontFamily: 'Comfortaa cursive'
            /* font-size: 30px; */
         
    }



     
const typeWriter = ["Machine Learning", "Java Developer", "Data Analyst", "iOs Devloper", "Software Developer"];


    return (
        isAuth ? ( !isSearching ?
        <Container className = {classes.container} maxWidth = "xl">
            <Grid container className = {classes.boxSearch} >
                {/* <Grid item container className = {classes.outerSearchGrid} xs={12} sm={12} md={9} lg={8} xl={8}>
                    <Grid item>
                        <Typography className = {classes.h3} variant = "h3">
                            Find great places to work
                        </Typography>
                        <Typography className = {classes.h5} variant = "h5">
                            Discover millions of company reviews
                        </Typography>
                    </Grid>
                    <form onSubmit = {handleSubmit} style = {{display: "flex"}}>
                        <Grid item>
                            <TextField  
                                className = {classes.outlinedInput} 
                                required 
                                type = "text" 
                                variant="outlined"
                                placeholder = "Enter a company name"
                                value = { query }
                                onChange = { onTextChange }
                                InputProps={{
                                    endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchIcon />
                                    </InputAdornment>
                                    )
                                    }}
                                />
                            <FormHelperText className = {classes.formhelperText}>Do you want to search for salaries?</FormHelperText>
                        </Grid>
                        <Grid item>
                            <SearchButton type = "submit" variant = "contained">
                                Search
                            </SearchButton>
                        </Grid>
                    </form>
                </Grid> */}
               



            </Grid>
            <div className="ftext" style={ftext}>Inspiring <TypeWriter data={typeWriter} /> </div>
            <div className="ftext" style={ftext}>Jobs for the future !!</div>

            <Grid className = {classes.companiesHiring} container item xl = {9} lg = {9} md = {9} sm = {11} xs = {12}>
                <Grid item container  >
                    <Grid item>
                        <img src="/Images/location.PNG" alt="location pin" style = {{padding: "5px 0 5px 10px"}} />
                    </Grid>
                    <Grid item>
                        <Typography style = {{paddingTop: "15px"}} variant = "h5">Companies Hiring Now</Typography>
                    </Grid>
                </Grid>
                <Grid container style={{maxWidth:'1000px'}}>
                        {
                            companies.map((item) => {
                                return(
                                    <CompanyBox 
                                        key = {item.id}
                                        logo = {item.logo}
                                        name = {item.company}
                                        rating = {item.ratings}
                                        id = {item.id}
                                        handleClick = {handleCompanyClick}
                                        // handleClick={"l"}
                                    />
                                )
                            })
                        }
                </Grid>
            </Grid>
            <Grid className = {classes.companiesHiring} item container xl = {9} lg = {9} md = {9} sm = {11} xs = {12}>
                <Grid item container  >
                    <Grid item>
                        <img src="/Images/popularcompany.PNG" alt="location pin" style = {{padding: "5px 0 5px 10px"}} />
                    </Grid>
                    <Grid item>
                        <Typography style = {{paddingTop: "15px"}} variant = "h5">Popular Companies</Typography>
                    </Grid>
                </Grid>
                <Grid container style={{width:'1000px'}}>
                        {
                            companies.map((item) => {
                                return(
                                    <CompanyBox 
                                    key = {item.id}
                                    logo = {item.logo}
                                    name = {item.company}
                                    rating = {item.ratings}
                                    id = {item.id}
                                    handleClick = {handleCompanyClick}
                                    />
                                )
                            })
                        }
                </Grid>
            </Grid>
            <Grid className = {classes.companiesHiring} style = {{borderTop: "10px solid #ff5a1f", padding: "25px", justifyContent: "space-between"}} container item xl={9} lg={9} md={9} sm={11} xs={12}>
                <Grid item >
                    <Typography variant = "h5">Rate your recent company:</Typography>
                </Grid>
                <Grid item style = {{backgroundColor: "#f2f2f2", padding: "0 5px", borderRadius: "50px"}}>
                    <Rating name="pristine" size = "large" style = {{color: "blue"}} />
                </Grid>
            </Grid>
            <Grid container spacing = {1} style = {{fontSize : "14px", backgroundColor: "white", padding: "15px 10px", margin : "0 -20px "}} >
                {/* <Grid item style = {{cursor: "pointer"}}>
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
                </Grid> */}
            </Grid>
        </Container> : null ) : <Redirect to = "/review" />
    )
}


// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
// import { Redirect } from 'react-router-dom';
// import { CompanyBox } from "../Layout/Companies/CompanyBox";
// import { useHistory } from 'react-router-dom';
// import { searchCompany, getCompanyReviews } from '../../Redux/CompanyReviews/action';
// import SearchIcon from '@material-ui/icons/Search';
// import Rating from '@material-ui/lab/Rating';
// import { 
//     Container,
//     makeStyles,
//     Grid,
//     Typography,

//     Button,
//     withStyles,
//     InputAdornment,
//     TextField,
//     FormHelperText

// } from '@material-ui/core';

// const useStyles = makeStyles((theme) => ({
//     container: {
//         backgroundColor: "#f2f2f2",
//         padding: 0,
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center" 
//     },
//     boxSearch: {
//         backgroundColor: "white",
//         margin: 0,
//         height: "310px",
//         backgroundPosition: "bottom right",
//         backgroundImage: "url(/Images/companyreview.PNG)",
//         backgroundRepeat: "no-repeat"

//     },
//     outerSearchGrid: {
//         marginTop: "50px",
//         flexDirection: "column",
//         alignContent: "flex-end"
//     },
//     h3: {
//         fontWeight: "bold",
//         marginBottom: "20px" 
//     },
//     h5: {
//         color: "#6f78a5",
//         fontWeight: "400",
//         marginBottom: "70px"
//     },
//     outlinedInput: {
//         border: "2px solid #cccccc",
//         borderRadius: "10px",
//         width: "450px"
//     },
//     formhelperText: {
//         color: "#085ff7",
//         paddingLeft: "20px",
//         cursor: "pointer"
//     },
//     companiesHiring: {
//         marginTop: "50px",
//         marginBottom: "20px",
//         backgroundColor: "white",
//         display: "flex",
//     }
// }))

// const SearchButton = withStyles((theme) => ({
//     root: {
//         color: "#ffffff",
//         backgroundColor: "#085ff7",
//         cursor: "pointer",
//         width: "200px",
//         borderRadius: "200px",
//         height: "53px",
//         marginLeft: "50px",
//         '&:hover': {
//             backgroundColor: "#0542ac",
//         },
//     },
// }))(Button);

// export function CompanyReviews() {

//     const classes = useStyles();
//     const[companies, setCompanies] = useState([]);
//     const[query, setQuery] = useState("");
//     const isSearching = useSelector(state => state.companies.isSearching);
//     const dispatch = useDispatch();
//     const history = useHistory();
   
//     const {isAuth} = useSelector(state=>state.login)
    

//     const onTextChange = (e) => {
//         setQuery(e.target.value);
        
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         dispatch(searchCompany(query))
//     }

//     const handleCompanyClick = (id) => {
//         dispatch(getCompanyReviews(id));
//         history.push(`/reviews?id=${id}`)
//     }

//     useEffect(() => {
//         axios.get("https://indeed-mock-server.herokuapp.com/companies")
//             .then((res) => {
                
//                 setCompanies(res.data)
//             })
//             .catch((err) => console.log(err))
//     },[])


//     return (
//         isAuth ? ( !isSearching ?
//         <Container className = {classes.container} maxWidth = "xl">
//             <Grid container className = {classes.boxSearch} >
//                 <Grid item container className = {classes.outerSearchGrid} xs={12} sm={12} md={9} lg={8} xl={8}>
//                     <Grid item>
//                         <Typography className = {classes.h3} variant = "h3">
//                             Find great places to work
//                         </Typography>
//                         <Typography className = {classes.h5} variant = "h5">
//                             Discover millions of company reviews
//                         </Typography>
//                     </Grid>
//                     <form onSubmit = {handleSubmit} style = {{display: "flex"}}>
//                         <Grid item>
//                             <TextField  
//                                 className = {classes.outlinedInput} 
//                                 required 
//                                 type = "text" 
//                                 variant="outlined"
//                                 placeholder = "Enter a company name"
//                                 value = { query }
//                                 onChange = { onTextChange }
//                                 InputProps={{
//                                     endAdornment: (
//                                     <InputAdornment position="end">
//                                         <SearchIcon />
//                                     </InputAdornment>
//                                     )
//                                     }}
//                                 />
//                             <FormHelperText className = {classes.formhelperText}>Do you want to search for salaries?</FormHelperText>
//                         </Grid>
//                         <Grid item>
//                             <SearchButton type = "submit" variant = "contained">
//                                 Search
//                             </SearchButton>
//                         </Grid>
//                     </form>
//                 </Grid>
//             </Grid>
//             <Grid className = {classes.companiesHiring} container item xl = {9} lg = {9} md = {9} sm = {11} xs = {12}>
//                 <Grid item container  >
//                     <Grid item>
//                         <img src="/Images/location.PNG" alt="location pin" style = {{padding: "5px 0 5px 10px"}} />
//                     </Grid>
//                     <Grid item>
//                         <Typography style = {{paddingTop: "15px"}} variant = "h5">Companies Hiring Now</Typography>
//                     </Grid>
//                 </Grid>
//                 <Grid container style={{maxWidth:'1000px'}}>
//                         {
//                             companies.map((item) => {
//                                 return(
//                                     <CompanyBox 
//                                         key = {item.id}
//                                         logo = {item.logo}
//                                         name = {item.company}
//                                         rating = {item.ratings}
//                                         id = {item.id}
//                                         handleClick = {handleCompanyClick}
//                                     />
//                                 )
//                             })
//                         }
//                 </Grid>
//             </Grid>
//             <Grid className = {classes.companiesHiring} item container xl = {9} lg = {9} md = {9} sm = {11} xs = {12}>
//                 <Grid item container  >
//                     <Grid item>
//                         <img src="/Images/popularcompany.PNG" alt="location pin" style = {{padding: "5px 0 5px 10px"}} />
//                     </Grid>
//                     <Grid item>
//                         <Typography style = {{paddingTop: "15px"}} variant = "h5">Popular Companies</Typography>
//                     </Grid>
//                 </Grid>
//                 <Grid container style={{width:'1000px'}}>
//                         {
//                             companies.map((item) => {
//                                 return(
//                                     <CompanyBox 
//                                     key = {item.id}
//                                     logo = {item.logo}
//                                     name = {item.company}
//                                     rating = {item.ratings}
//                                     id = {item.id}
//                                     handleClick = {handleCompanyClick}
//                                     />
//                                 )
//                             })
//                         }
//                 </Grid>
//             </Grid>
//             <Grid className = {classes.companiesHiring} style = {{borderTop: "10px solid #ff5a1f", padding: "25px", justifyContent: "space-between"}} container item xl={9} lg={9} md={9} sm={11} xs={12}>
//                 <Grid item >
//                     <Typography variant = "h5">Rate your recent company:</Typography>
//                 </Grid>
//                 <Grid item style = {{backgroundColor: "#f2f2f2", padding: "0 5px", borderRadius: "50px"}}>
//                     <Rating name="pristine" size = "large" style = {{color: "blue"}} />
//                 </Grid>
//             </Grid>
//             <Grid container spacing = {1} style = {{fontSize : "14px", backgroundColor: "white", padding: "15px 10px", margin : "0 -20px "}} >
//                 <Grid item style = {{cursor: "pointer"}}>
//                 © 2020 Indeed
//                 </Grid>
//                 <Grid item>
//                     -
//                 </Grid>
//                 <Grid item style = {{cursor: "pointer"}}>
//                     Accessibility at Indeed
//                 </Grid>
//                 <Grid item>
//                     -
//                 </Grid>
//                 <Grid item style = {{cursor: "pointer"}}>
//                     Privacy Center
//                 </Grid>
//                 <Grid item>
//                     -
//                 </Grid>
//                 <Grid item style = {{cursor: "pointer"}}>
//                     Cookies
//                 </Grid>
//                 <Grid item>
//                     -
//                 </Grid>
//                 <Grid item style = {{cursor: "pointer"}}>
//                     Privacy
//                 </Grid>
//                 <Grid item>
//                     -
//                 </Grid>
//                 <Grid item style = {{cursor: "pointer"}}>
//                     Terms
//                 </Grid>
//             </Grid>
//         </Container> : null ) : <Redirect to = "/review" />
//     )
// }