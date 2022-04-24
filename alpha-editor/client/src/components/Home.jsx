import React, { useCallback, useEffect, useState } from "react";
import AceEditor from "react-ace";
import axios from "axios";
import socket from "../socket";
import { VscRunAll, VscDebugRerun } from "react-icons/vsc";
import {BsFillShareFill, BsShareFill} from 'react-icons/bs';
import {FaUpload,FaDownload} from 'react-icons/fa';
import {RiImageAddLine} from 'react-icons/ri';
import { languages, highlightedLangs, themes } from "./Snippets";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useParams, useNavigate } from "react-router-dom";
import Tesseract from "tesseract.js";

highlightedLangs.forEach((lang) => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
  require(`ace-builds/src-noconflict/snippets/${lang}`);
});
themes.forEach((theme) => require(`ace-builds/src-noconflict/theme-${theme}`));

const Home = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [code, setCode] = useState(languages[0].sampleCode);
  const [result, setResult] = useState("");
  const [inputData, setInputData] = useState("");
  const [fs, setFs] = useState("18");
  const [th, setTh] = useState("monokai");
  const [lang, setLang] = useState("python");
  const [ext, setExt] = useState("py");
  const [isDis, setIsDis] = useState(false);
  const [recLi, setRecLi] = useState([]);
  const [linkBody, setLinkBody] = useState("");
  const [changeDef, setChangeDef] = useState(false);
  const [username,setUsername]=useState("");
  const [image, setImage] = useState(null);


  const API_KEY = "a29f6dd4e9782b6e034db6437ab659b3";
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
      setLinkBody(window.location.href);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };






  const convertImageToText = async () => {
    const result = await Tesseract.recognize(image, "eng");
    setCode(result.data.text);

  };

  // const handleChangeImage = async (e) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("image", e.target.files[0]);

  //     const config = {
  //       headers: {
  //         "content-type": "multipart/form-data",
  //       },
  //     };

  //     const res = await axios.post(
  //       `https://api.imgbb.com/1/upload?key=${API_KEY}`,
  //       formData,
  //       config
  //     );
  //     setImage(res.data.data.url);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  useEffect(() => {
    if (image != null) {
      convertImageToText();
    }
  }, [image]);























    // const worker = createWorker();

    // const convertImageToText = useCallback(async () => {
    //   if (!image) return;
    //   await worker.load();
    //   await worker.loadLanguage("eng");
    //   await worker.initialize("eng");
    //   const { data } = await worker.recognize(Image);
    //   await setCode(data.text);
    //   await worker.terminate();
    // }, [worker, setImage]);

    // useEffect(() => {
    //   convertImageToText();

    // }, [Image, convertImageToText]);

  useEffect(() => {
    if (window.screen.width <= 992)
      alert("Open in a larger device for best experience!");
    if (roomId) {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      axios
        .get(`/api/getcode/${roomId}`, config)
        .then(({ data, status }) => {
          if (status === 200) {
            setCode(data.code);
            setExt(data.extension);
            setLang(data.lang);
            setUsername(data.username);
            let ind;
            for (let i = 0; i < languages.length; i++) {
              if (languages[i].extension === data.extension) {
                ind = i;
                break;
              }
            }
            let tempArr = languages.filter(
              (l) => l.extension !== data.extension
            );
            tempArr.unshift(languages[ind]);
            setRecLi(tempArr);
            console.log(tempArr);
          } else {
            alert("Invalid URL!");
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Invalid URL!");
          navigate("/");
          setRecLi(languages);
        });
    } else setRecLi(languages);
  }, []);

  useEffect(() => {
    socket.emit("joined", { roomDbId: roomId });
  });

  useEffect(() => {
    socket.on("receivingCode", ({ recCode }) => {
      setCode(recCode);
      console.log(recCode);
    });
    socket.on("receivingInp", ({ inp }) => {
      setInputData(inp);
    });
    socket.on("receiveOp", ({ op }) => {
      setResult(op);
      console.log(op);
    });
    socket.on("setExtLangSn", ({ lng, cd, ex }) => {
      setCode(cd);
      setExt(ex);
      setLang(lng);
      let ind;
      for (let i = 0; i < languages.length; i++) {
        if (languages[i].extension === ex) {
          ind = i;
          break;
        }
      }
      let tempArr = languages.filter((l) => l.extension !== ex);
      tempArr.unshift(languages[ind]);
      setRecLi(tempArr);
      setChangeDef(!changeDef);
    });
  });

  const uploadCode = async () => {
    try {
      setIsDis(true);
      var data = JSON.stringify({
        code: `${code}`,
        language: `${ext}`,
        input: `${inputData}`,
      });
      console.log(code);

      var config = {
        method: "post",
        url: "https://cors-anywhere-jaagrav.herokuapp.com/https://codexweb.netlify.app/.netlify/functions/enforceCode",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log(response.data);
          setResult(response.data.output);
          socket.emit("sendOp", { op: response.data.output, roomDbId: roomId });
        })
        .catch(function (error) {
          console.log(error);
        });
      setTimeout(() => {
        setIsDis(false);
      }, 2000);
      // alert("Code uploaded!");
    } catch (error) {
      console.log(error);
    }
  };

  
      const copyURL=()=>{
          var r = document.createRange();
  r.selectNode(document.getElementById("alert-dialog-title"));
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(r);
  document.execCommand('copy');
  window.getSelection().removeAllRanges();
          handleClose();
      }

   
    
      // useEffect(() => {
      //   convertImageToText();
      // },[image])
    
    const handleChangeImage = (e) => {
      if (e.target.files[0]) {
        setImage(e.target.files[0]);
      //  convertImageToText();
      } else {
        setImage(null);
        setCode("");
      }
    };

    const downloadFile = () => {
      setIsDis(true);
      const element = document.createElement("a");
      const file = new Blob([code], {
        type: "text/plain",
      });
      element.href = URL.createObjectURL(file);
      element.download = "code."+ext;
      document.body.appendChild(element);
      element.click();
      setIsDis(false);
    };

      let fileReader;
      const handleFileRead = (e) => {
      const content = fileReader.result;
      console. log(content);
      setCode(content);
      let curr=languages.filter(val=>val.extension===e);
      socket.emit("changeExtLangSn", {
        lng: curr[0].name,
        cd: content,
        ex: e,
        roomDbId: roomId,
      });
      }
      const handleFileChosen = (file) => {
        console.log(file);
        const extArr=file.name.split('.');
        const tempExt=extArr[extArr.length-1];
        if(tempExt!==ext) alert("Please choose proper language!");
        else{
          setExt(tempExt);
        fileReader = new FileReader();
        fileReader.onloadend = ()=>{
          handleFileRead(tempExt);
        };
        fileReader. readAsText(file);
        }
      }

  return (
    <>
      <div style={{ overflowY: "hidden", overflowX: "hidden", width: "100vw" }}>
        <div className="row" style={{ maxHeight: "100vh" }}>
          <div
            className="col-lg-2 col-md-2 col-sm-2 col-2"
            style={{
              backgroundColor: "#61004a",
              backgroundImage: `url("https://www.transparenttextures.com/patterns/blizzard.png")`,
            }}
          >
            <img
              src="https://i.postimg.cc/pVkHzfDK/alp-edi-removebg-preview-1.png"
              className="img-fluid"
              style={{ height: "70px", marginLeft: "10px" }}
            ></img>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-2 col-2" style={{
              backgroundColor: "#61004a",
              backgroundImage: `url("https://www.transparenttextures.com/patterns/blizzard.png")`,
            }}>
          <h6 className="mt-2 text-white">Room Name: {username.length>15?`${username.slice(0,15)}...`:username}</h6>
          <h6 className="text-white">Room ID: {roomId}</h6>
          </div>

          <div
            className="col-lg-6 col-md-6 col-sm-8 col-8 d-flex justify-content-evenly menu flex-wrap  flex-sm-wrap justify-content-end"
            style={{
              backgroundColor: "#61004a",
              backgroundImage: `url("https://www.transparenttextures.com/patterns/blizzard.png")`,
            }}
          >
            <select
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Font size"
              onChange={(e) => setFs(e.target.value)}
              className="browser-default custom-select theme-class px-3"
            >
              <option value="14">Font Size</option>
              <option value="14">14</option>
              <option value="16">16</option>
              <option value="18">18</option>
              <option value="20">20</option>
              <option value="24">24</option>
              <option value="28">28</option>
              <option value="32">32</option>
              <option value="40">40</option>
            </select>
            {/* <div className="selectWrapper"> */}
            <select
              onChange={(e) => setTh(e.target.value)}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Theme"
              className="browser-default custom-select ps-2 theme-class"
            >
              <option value="monokai">Theme</option>
              {themes.map((thm) => (
                <option value={thm} key={thm}>
                  {thm}
                </option>
              ))}
            </select>
            {/* </div> */}
            <select
              onChange={(e) => {
                setLang(recLi[parseInt(e.target.value)].code);
                setCode(recLi[parseInt(e.target.value)].sampleCode);
                setExt(recLi[parseInt(e.target.value)].extension);
                socket.emit("changeExtLangSn", {
                  lng: recLi[parseInt(e.target.value)].code,
                  cd: recLi[parseInt(e.target.value)].sampleCode,
                  ex: recLi[parseInt(e.target.value)].extension,
                  roomDbId: roomId,
                });
              }}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Language"
              className="browser-default custom-select theme-class px-3"
            >
              {changeDef
                ? recLi.map((l, ind) => {
                    return (
                      <option value={ind} key={l.extension}>
                        {l.name}
                      </option>
                    );
                  })
                : null}
              {!changeDef
                ? recLi.map((l, ind) => {
                    return (
                      <option value={ind} key={l.extension}>
                        {l.name}
                      </option>
                    );
                  })
                : null}
            </select>
            <button
              type="button"
              className="btn btn-primary theme-class px-4"
              disabled={isDis}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Run code"
              onClick={uploadCode}
            >
              <VscRunAll />
            </button>
            <button  class="btn btn-primary theme-class p-0" disabled={isDis} style={{cursor:'pointer'}} data-bs-toggle="tooltip"
              data-bs-placement="top" title="Upload image">
              <label for="formFileImg" className="px-4" style={{cursor:'pointer'}} >
                <RiImageAddLine/>
              </label>
              <input
                class="form-control"
                type="file"
                id="formFileImg"
                onChange={handleChangeImage}
                style={{display:'none'}}
              />
            </button>
            <button  class="btn btn-primary theme-class p-0" disabled={isDis} style={{cursor:'pointer'}} data-bs-toggle="tooltip"
              data-bs-placement="top" title="Upload code">
              <label for="formFile" className="px-4" style={{cursor:'pointer'}} >
                <FaUpload/>
              </label>
              <input
                class="form-control"
                type="file"
                id="formFile"
                onChange={e => handleFileChosen(e. target.files[0])}
                style={{display:'none'}}
              />
            </button>
            {/* <div className='upload-expense'>
<input type='file'
id="file"
className="input-file"
onChange={e => handleFileChosen(e. target.files[0])}
/>
</div> */}
            <button
              type="button"
              className="btn btn-primary theme-class px-4"
              disabled={isDis}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Download"
              onClick={downloadFile}
            >
              <FaDownload />
            </button>
            <button type="button" className="btn btn-primary theme-class px-4"  data-bs-toggle="tooltip" data-bs-placement="top" title="Share this room" onClick={handleClickOpen}>
                            <BsShareFill/>
                        </button>
          </div>
        </div>
      </div>
      <div className="row" style={{ minHeight: "95vh", overflowY: "hidden" }}>
        <div
          className="col-lg-8 col-md-8 col-sm-8 col-8"
          style={{
            backgroundColor: "red",
            padding: "0px",
            minHeight: "100vh",
            overflowY: "hidden",
            overflowX: "scroll",
          }}
        >
          <AceEditor
            placeholder="Start writing your code..."
            value={code}
            mode={lang}
            theme={th}
            onChange={(e) => {
              setCode(e);
              socket.emit("enteringCode", { code: e, roomDbId: roomId });
              // socket.emit("enteringCode",{code:e})
            }}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
            height="92%"
            width="100%"
            fontSize={parseInt(fs)}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: false,
              showLineNumbers: true,
              tabSize: 2,
            }}
            showPrintMargin={false}
            showGutter={true}
            highlightActiveLine={true}
          />
          ,
        </div>

        <div
          className="col-lg-4 col-md-4 col-sm-4 col-4"
          style={{ minHeight: "95vh", maxHeight: "95vh", overflowX: "scroll" }}
        >
          <div className="row" style={{ minHeight: "50%", maxHeight: "50%" }}>
            <div
              className="px-2"
              style={{ minHeight: "100%", backgroundColor: "#1e1e1e" }}
            >
              <h4
                style={{ overflowY: "hidden", color: "aqua" }}
                className="mt-3"
              >
                Input
              </h4>
              <hr />
              <textarea
                wrap="off"
                spellcheck="false"
                className="form-control"
                id="exampleFormControlTextarea1"
                rows={3}
                defaultValue={""}
                value={inputData}
                onChange={(e) => {
                  setInputData(e.target.value);
                  socket.emit("enteringInp", {
                    inp: e.target.value,
                    roomDbId: roomId,
                  });
                }}
                style={{
                  height: "78%",
                  resize: "none",
                  width: "98%",
                  backgroundColor: "aqua",
                  color: "black",
                  fontWeight: "bolder",
                  overflowX: "scroll",
                }}
              />
            </div>
          </div>
          <div
            className="row"
            style={{
              backgroundColor: "#1e1e1e",
              height: "50%",
              maxHeight: "50%",
              color: "aqua",
            }}
          >
            <div
              className="op"
              style={{
                height: "100%",
                overflowY: "scroll",
                overflowX: "scroll",
              }}
            >
              <h4 style={{ overflowY: "hidden" }}>Output </h4>
              <hr />
              {/* <text>{result}</text> */}
              <textarea
                wrap="off"
                spellcheck="false"
                className="form-control"
                id="exampleFormControlTextarea1"
                rows={3}
                defaultValue={""}
                value={result}
                style={{
                  height: "76%",
                  resize: "none",
                  width: "98%",
                  backgroundColor: "#1e1e1e",
                  color: "aqua",
                  fontWeight: "bolder",
                  overflowX: "scroll",
                  border: "2px solid aqua",
                }}
                disabled={true}
              />
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {linkBody}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Click on the <strong>Copy</strong> button to copy URL
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={copyURL} autoFocus>
            Copy
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Home;
