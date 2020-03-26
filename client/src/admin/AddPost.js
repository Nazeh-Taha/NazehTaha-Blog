import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Container } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { Editor } from "@tinymce/tinymce-react";
import { Redirect } from "react-router-dom";
import AdminDash from "./AdminDash";
import Messages from "../components/Messages";
import Alert from "../components/Alert";
import Progress from "../components/Progress";
import isLoging from "../helper/isloged";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));
const AddPost = () => {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [categore, setCategote] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose file");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState("");
  const [uploadPersentage, setUploadPersentage] = useState(0);

  const onChange = event => {
    setFile(event.target.files[0]);
    setFilename(event.target.files[0].name);
  };
  //uploading image
  const onSubmit = async event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post("/api/admin/posts/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        onUploadProgress: ProgressEvent => {
          setUploadPersentage(
            parseInt(
              Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
            )
          );
          setTimeout(() => setUploadPersentage(0), 10000);
        }
      });

      const { fileName, filePath } = res.data;
      setUploadedFile({ fileName, filePath });
      setMessage("Image Uploaded");
    } catch (err) {
      console.log(err);
      setMessage("Error - Upload Image Again");
    }
  };
  //add article to database
  const addArticle = async () => {
    await fetch("/api/admin/posts", {
      method: "post",
      body: JSON.stringify({
        image: uploadedFile.filePath,
        title: title,
        text: text,
        categore: categore,
        token: localStorage.getItem("token")
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(result => {
        setAlert("Article Uploaded");
        setText("");
      })
      .catch(err => {
        setAlert("ERROR - Article Not Uploaded");
      });
  };

  if (!isLoging()) return <Redirect to="/admin" />;
  return (
    <>
      <AdminDash />
      <Container>
        {message ? <Messages msg={message} /> : null}
        <form onSubmit={onSubmit}>
          <div className="custom-file">
            <input
              name="file"
              type="file"
              className="custom-file-input"
              id="customFile"
              onChange={onChange}
            />
            <label className="custom-file-label" htmlFor="customFile">
              {filename}
            </label>
            <Progress percentage={uploadPersentage} />
            <button
              type="submit"
              value="upload"
              className="btn btn-primary btn-lg btn-block mb-10 mt-3"
            >
              Uploade Image
            </button>
          </div>
        </form>
        {uploadedFile ? (
          <div className="row mt-5">
            <div className="col-md-6 m-auto">
              <h3 className="text-center">{uploadedFile.fileName}</h3>
              <img
                style={{ width: "100%" }}
                src={uploadedFile.filePath}
                alt=""
              />
            </div>
          </div>
        ) : null}
        <TextField
          id="outlined-full-width"
          label="Title"
          placeholder="Title"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
        <Editor
          apiKey="cthvq9cxps44kt5ntna1f2jakjf76h4zmu81qflqrrkf3g93"
          initialValue=""
          init={{
            height: 500,
            selector: "textarea",
            menubar: true,
            fontsize_formats: "11px 12px 14px 16px 18px 24px 36px 48px",
            plugins: [
              "advlist autolink lists link image",
              "charmap print preview anchor help",
              "searchreplace visualblocks code",
              "insertdatetime media table paste wordcount"
            ],
            toolbar:
              "undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist outdent indent | help | fontsizeselect"
          }}
          onChange={event => setText(event.target.getContent())}
        />
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-native-simple">Categories</InputLabel>
          <Select
            native
            value={categore}
            onChange={event => setCategote(event.target.value)}
          >
            <option aria-label="None" value="" />
            <option value="ARTICLE">ARTICLE</option>
            <option value="NEWS">NEWS</option>
            <option value="PROGRAMING">PROGRAMING</option>
            <option value="TECHNOLOGY">TECHNOLOGY</option>
            <option value="GADGETS">GADGETS</option>
          </Select>
        </FormControl>
        {alert ? <Alert msg={alert} /> : null}
        <button
          style={{ margin: "50px 0" }}
          onClick={() => addArticle()}
          className="btn btn-success btn-lg btn-block m-6 mt-6"
        >
          Add Article
        </button>
      </Container>
    </>
  );
};

export default AddPost;
