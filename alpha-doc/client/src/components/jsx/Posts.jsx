import React, { useState } from 'react';
import axios from 'axios';
import '../css/postTag.css';
import Loader from './Loader';
import { MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBBtn } from 'mdb-react-ui-kit';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Pagination from '@mui/material/Pagination';
import { makeStyles } from '@material-ui/core';
import AOS from 'aos';
import "aos/dist/aos.css";
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';

const useStyle = makeStyles(theme => ({
  marg: {
    paddingTop: 20,
    paddingLeft: 50,
    paddingRight: 50,
    paddingBottom: 150,

    [theme.breakpoints.between('1000', '1300')]: {
      marginLeft: 30,
      marginRight: 30,
    },
    [theme.breakpoints.between('200', '1000')]: {
      marginLeft: 10,
      marginRight: 10,
    },
  },
  num: {
    marginLeft: -180,
    [theme.breakpoints.between('1000', '1300')]: {
      marginLeft: 30,
      // marginRight:30,
    },
    [theme.breakpoints.between('200', '1000')]: {
      marginLeft: 10,
      // marginRight:10,
    },
  }
}));

export default function App() {
  const classes = useStyle();

  const navigate = useNavigate();

  const [lt, setLt] = useState(6);
  const [sk, setSk] = useState(0);
  const [size, setSize] = useState(0);
  const [posts, setPosts] = useState([]);
  const [loadedPosts, setLoadedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState(["6256dd16a75e9e2040418daf", "6256dd19a75e9e2040418db1", "6256dd1fa75e9e2040418db3", "6256dd22a75e9e2040418db5", "6256dd2ca75e9e2040418db7", "6256dd30a75e9e2040418db9", "6256dd34a75e9e2040418dbb"]);

  useEffect(() => {
    if (!localStorage.getItem("codeToken")) {
      navigate("/login");
    }
    else {
      console.log(categories);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("codeToken")}`
        }
      }
      setLoading(true);
      console.log("JD");
      axios.post("/api/posts/allwithcategories", { lt, sk, categories }, config).then((data) => {
        setPosts(data.data.posts);
        setSize(data.data.size);
        setLoading(false);
        console.log(data.data.size);
      }).catch((err) => console.log(err));
    }
  }, [categories])

  useEffect(() => {
    AOS.init({
      duration: 1000
    });
  }, []);

  const [currentUserId, setCurrentUserId] = useState("");

  useEffect(() => {
    if (localStorage.getItem("codeToken")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("codeToken")}`
        }
      }
      axios.get('/api/user/getuser', config).then((data) => {
        setCurrentUserId(data.data._id);
        console.log(data.data._id);
      }).catch((error) => console.log(error))
    }
  }, [])



  function timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
      if (elapsed / 1000 < 30) return "Just now";

      return Math.round(elapsed / 1000) + ' seconds ago';
    }

    else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + ' minutes ago';
    }

    else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + ' hours ago';
    }

    else if (elapsed < msPerMonth) {
      return Math.round(elapsed / msPerDay) + ' days ago';
    }

    else if (elapsed < msPerYear) {
      return Math.round(elapsed / msPerMonth) + ' months ago';
    }

    else {
      return Math.round(elapsed / msPerYear) + ' years ago';
    }
  }

  const appendOrRemoveEle = (id) => {
    if (categories.includes(id)) setCategories(categories.filter(ele => ele !== id));
    else setCategories([...categories, id]);
  }

  const [cls1, setCls1] = useState("inactiveTag");
  const [cls2, setCls2] = useState("inactiveTag");
  const [cls3, setCls3] = useState("inactiveTag");
  const [cls4, setCls4] = useState("inactiveTag");
  const [cls5, setCls5] = useState("inactiveTag");
  const [cls6, setCls6] = useState("inactiveTag");
  const [cls7, setCls7] = useState("inactiveTag");


  return (
    <div style={{
      minHeight: '90vh', backgroundColor: '#37009c',
      backgroundImage: 'url("https://www.transparenttextures.com/patterns/brick-wall-dark.png")',
    }}>
      <div className={classes.marg}>
        <h1 className='heading' style={{ color: '#00b8f0' }}>Coding docs</h1>
        <Stack direction="row" spacing={2} style={{ marginBottom: 10, display: 'flex', flexWrap: 'wrap' }} justifyContent="center">
          {/* <Chip label="Clickable" style={{backgroundColor:'#94B3FD',color:'white'}}/> */}
          <Chip label="DSA" variant="outlined" class={`${cls1}`} onClick={() => {
            appendOrRemoveEle("6256dd16a75e9e2040418daf");
            setCls1(cls1 == "inactiveTag" ? "activeTag" : "inactiveTag");
          }} />
          <Chip label="OOP" variant="outlined" class={`${cls2}`} onClick={() => {
            appendOrRemoveEle("6256dd19a75e9e2040418db1");
            setCls2(cls2 == "inactiveTag" ? "activeTag" : "inactiveTag");
          }} />
          <Chip label="AI or ML" variant="outlined" class={`${cls3}`} onClick={() => {
            appendOrRemoveEle("6256dd1fa75e9e2040418db3");
            setCls3(cls3 == "inactiveTag" ? "activeTag" : "inactiveTag");
          }} />
          <Chip label="CP" variant="outlined" class={`${cls4}`} onClick={() => {
            appendOrRemoveEle("6256dd22a75e9e2040418db5");
            setCls4(cls4 == "inactiveTag" ? "activeTag" : "inactiveTag");
          }} />
          <Chip label="Blockchain" variant="outlined" class={`${cls5}`} onClick={() => {
            appendOrRemoveEle("6256dd2ca75e9e2040418db7");
            setCls5(cls5 == "inactiveTag" ? "activeTag" : "inactiveTag");
          }} />
          <Chip label="Web Dev" variant="outlined" class={`${cls6}`} onClick={() => {
            appendOrRemoveEle("6256dd30a75e9e2040418db9");
            setCls6(cls6 == "inactiveTag" ? "activeTag" : "inactiveTag");
          }} />
          <Chip label="Others" variant="outlined" class={`${cls7}`} onClick={() => {
            appendOrRemoveEle("6256dd34a75e9e2040418dbb");
            setCls7(cls7 == "inactiveTag" ? "activeTag" : "inactiveTag");
          }} />
          {/* <Chip label="Clickable" variant="outlined" style={{backgroundColor:'#113CFC',color:'white'}}/> */}
        </Stack>


        <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
          {
            posts.length > 0
              ?
              posts.map((post, ind) => {
                return <>
                  <MDBCol key={ind} data-aos={"flip-left"}>
                    <MDBCard style={{ height: window.innerWidth > 500 ? '200px' : '240px', backgroundColor: '#99fff7' }}>
                      {/* {
                    post.photo
                    ?
                    <>
                    <MDBCardImage
                      alt='...'
                      position='top'
                      style={{height:'250px', minHeight:'250px'}}
                    />
                    </>
                    :
                    null
                  } */}

                      <MDBCardBody>
                        <MDBCardTitle>{parse(post.title)}</MDBCardTitle>
                        <div style={{ display: 'flex', justifyContent: 'space-between', minHeight: 'fit-content' }}>
                          <MDBCardText>
                            {parse(post.excerpt)}
                          </MDBCardText>
                          <MDBCardText>
                            <small className='text-muted'>Posted {timeDifference(new Date(), new Date(post.createdAt))}</small>
                            <br />
                            <small className='text-muted'>Posted by {post.postedBy.fullName}</small>
                          </MDBCardText>
                          {/* <img style={{width:60,height:60}}
                                  src={post.postedBy.photo}
                                  class="img-fluid rounded-circle"
                                  alt=""
                                  onClick={()=>{
                                    navigate(`/dashboard/${post.postedBy._id}`);
                                  }}
                                 /> */}
                        </div>
                        <MDBCardBody>

                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <MDBBtn
                              color='danger'
                              onClick={
                                () => navigate(`/post/${post._id}`)
                              }
                            >Read More</MDBBtn>
                          </div>
                        </MDBCardBody>


                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </>
              })
              :
              (loading ? <Loader /> : <h2>No post to show!</h2>)
          }
        </MDBRow>
        {
          // <Button variant="contained" style={{margin: '0 auto',display: "flex",marginTop: '20px'}} onClick={loadMore}>Load More</Button>
        }


      </div>
    </div>
  );
}