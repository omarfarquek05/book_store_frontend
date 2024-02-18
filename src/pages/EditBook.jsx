import { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [avatarview, setAvatarview] = useState("");

  const { id } = useParams();
  //console.log(id)

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const getBook = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8000/books/${id}`);
        const bookData = response.data.book; // Accessing the 'book' property
        console.log(bookData);
        setAuthor(bookData.author);
        setPublishYear(bookData.publishYear);
        setTitle(bookData.title);
        setEmail(bookData.email);
        setPhone(bookData.phone);
        setAvatar(bookData.avatar);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        alert("An error happened. Please Check console");
        console.log(error);
      }
    };

    getBook();
  }, [id]);

  const handleEditBook = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("publishYear", publishYear);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("avatar", avatar); // Append the file to FormData

    //   Create a data object with all other fields
    //   const data = { title, email, phone, publishYear, author };
    //      data.append("avatar", avatar)
    // If avatar is not an empty object, include it in the data object
    //   if (avatar && typeof avatar !== 'object') {
    //  formData.avatar = avatar;
    //   }

    setLoading(true);

    try {
      // Send the PUT request with the data object
      await axios.put(`http://localhost:8000/books/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Manually update the state of the avatar
      //   if (formData.avatar) {
      //     setAvatar(formData.avatar);
      //  }
      console.log(formData)

      setLoading(false);
      enqueueSnackbar("Book updated successfully", { variant: "success" });
      navigate("/");
    } catch (error) {
      setLoading(false);
      enqueueSnackbar("Error", { variant: "error" });
      console.log(error);
    }
  };

  const imageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setAvatarview(reader.result);
      setAvatar(file);
    };
  };

 

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4 font-bold">Edit Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>

        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>

        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">E-mail</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>

        {/* Avatar Input */}
        <div className="my-4 flex ">
          <img
            src={avatarview ? avatarview : 
            
              `${avatar}?${new Date().getTime()}`}
            alt="book"
            className="rounded-full object-cover h-20 w-20"
          />
          <input
            type="file"
            accept="image/*"
            id="avatar"
           // onChange={(e) => setAvatar(e.target.files[0])} // Store the selected file
           onChange={imageChange}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>

        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>

        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>
        <button
          className="p-2 bg-indigo-500 text-white font-bold text-center m-8"
          onClick={handleEditBook}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;
