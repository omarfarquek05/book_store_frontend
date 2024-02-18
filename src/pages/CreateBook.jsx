import { useState} from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { baseUrl } from "../../utils";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState("");

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("author", author);
      formData.append("publishYear", publishYear);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("avatar", avatar); // Append the file to FormData

      await axios.post(`${baseUrl}/books`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set content type to multipart/form-data for file upload
        },
      });

      setLoading(false);
      enqueueSnackbar("Book Created successfully", { variant: "success" });
      navigate("/");
    } catch (error) {
      setLoading(false);
      enqueueSnackbar("Error", { variant: "error" });
      console.log(error);
    }
  };

{/*
  const handleSaveBook = async () => {
    const data = { title, email, phone, publishYear, author,avatar };
    console.log(data);
    setLoading(true);
    
    try {
      await axios.post("http://localhost:8000/books", data);
      setLoading(false);
      enqueueSnackbar("Book Created successfully", { variant: "success" });
      navigate("/");
    } catch (error) {
      setLoading(false);
      // alert('An error happened. Please Check console');
      enqueueSnackbar("Error", { variant: "error" });
      console.log(error);
    }
  };
   */}
  return (
    <div className="p-4">
      <BackButton />

      <h1 className="text-3xl my-4">Create Book</h1>
      {loading ? <Spinner /> : ""}

      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        {/* Title*/}
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>

        {/* email*/}
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">E-mail</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
          
          {/* Avatar Input */}
          
          <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Avatar</label>
          <input
            type="file"
            onChange={(e) => setAvatar(e.target.files[0])} // Store the selected file
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
      

        {/* author*/}
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>

        {/* Phone*/}
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Phone</label>
          <input
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>

        {/* Publish Year*/}
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>

        <button className="p-2 bg-indigo-500 text-white font-bold text-center m-8" onClick={handleSaveBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateBook;
