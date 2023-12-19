import { useEffect, useState } from "react";
import Button from "./component/Button/Button";
import ImageUpload from "./component/Image/ImageUpload";
import Mouse from "./component/Mouse/Mouse";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [process, setProcess] = useState(0);
  useEffect(() => {
    const uploadToImgbb = async () => {
      if (!file) return null;
      setProcess(1);
      const formData = new FormData();
      formData.append("image", file);
      const response = await axios({
        method: "post",
        url: "https://api.imgbb.com/1/upload?key=1354c230dd40a7043dbe4307c3df1bc3",
        data: formData,
        headers: {
          "content-Type": "multipart/form-data",
        },
      });
      console.log(response.data.data.url);
      if (response.data.data.url) setProcess(0);
      setImage(response.data.data.url);
    };
    uploadToImgbb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);
  const handleSelectImage = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  const handleDeleteImage = () => {
    setImage(null);
  };
  const handleClick = async () => {
    // Create a FormData object and append the image to it.
    const formData = new FormData();
    formData.append('image', image);
    // formData.append('text_input', "cmm");

    // Make a POST request to the server with the FormData object.
    const response = await axios.post('http://localhost:8080/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Handle the response.
    if (response.status === 200) {
      // The image was successfully uploaded.
      // Do something with the response.data.
      console.log("success");
      console.log(response.data);
      // const data = response.data;
      // setRs(data);
      // navigate('/rs', { state: { result: response.data , resultImg : image ,model : model } });
    } else {
      // An error occurred.
      // Handle the error.
      console.error('Failed to upload and process the image.');
    }
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-12 mt-14">
        <ImageUpload
          onChange={handleSelectImage}
          handleDeleteImage={handleDeleteImage}
          progress={process}
          image={image}
        ></ImageUpload>
        <Button onClick={handleClick}></Button>
      </div>
      <Mouse></Mouse>
    </>
  );
}

export default App;
