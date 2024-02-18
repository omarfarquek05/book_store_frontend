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

   // State variables for error messages
   const [titleError, setTitleError] = useState("");
   const [emailError, setEmailError] = useState("");
   const [authorError, setAuthorError] = useState("");
   const [avatarError, setAvatarError] = useState("");
   const [publishYearError, setPublishYearError]= useState("");
   const [phoneError, setPhoneError] = useState("")

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = async () => { 
    // Check if any required fields are empty
    if (!title) {
      setTitleError("Title is required");
      return;
    } else {
      setTitleError(""); // Clear the error message if title is not empty
    }

    if (!avatar) {
      setAvatarError("avatar is required");
      return;
    } else {
      setAvatarError(""); // Clear the error message if email is not empty
    }

    // Check if any required fields are empty
    if (!publishYear) {
      setPublishYearError("publish year is required");
      return;
    } else {
      setPublishYearError(""); // Clear the error message if title is not empty
    }

    if (!email) {
      setEmailError("Email is required");
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    } else {
      setEmailError(""); // Clear the error message if email is not empty and valid
    }
   
    if(!author){
      setAuthorError("author is required")
    }else {
      setAuthorError("")
    }
    if(!phone){
      setPhoneError("phone is required")
      return;
    } else if (!/^01\d{9}$/.test(phone)) {
        setPhoneError("Phone must start with '01' and have 11 digits.");
        return;
    }else{
      setPhoneError("")
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("author", author);
      formData.append("publishYear", publishYear);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("avatar", avatar); // Append the file to FormData

      await axios.post(`${baseUrl}`, formData, {
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
          {titleError && <span className="text-red-500">{titleError}</span>}
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
          {emailError && <span className="text-red-500">{emailError}</span>}
        </div>
          
          {/* Avatar Input */}
          <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Avatar</label>
          <input
            type="file"
            onChange={(e) => setAvatar(e.target.files[0])} // Store the selected file
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
          {avatarError && <span className="text-red-500">{avatarError}</span>}
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
          {authorError && <span className="bg-red-500">{authorError}</span>}
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
          {phoneError && <span className="bg-red-500">{phoneError}</span>}
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
          {publishYearError && <span className="bg-red-500">{publishYearError}</span>}
        </div>

        <button className="p-2 bg-indigo-500 text-white font-bold text-center m-8" onClick={handleSaveBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateBook;
