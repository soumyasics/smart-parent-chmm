import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CommonFooter } from "../../../components/common/footer/footer";
import { HPNavbar } from "../../../components/hp/hpNavbar/hpNavbar";
import "./createBlog.css";
interface BlogType {
  para1: string;
  para2: string;
  title: string;
  HPId: string;
  img: File | null;
}
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { toast } from "react-hot-toast";
import axiosMultipartInstance from "../../../apis/axiosMultipartInstance";

export const HPCreateBlog = () => {
  const navigate = useNavigate();
  const { userId, userType } = useSelector((state: RootState) => state.user);
  const [blogData, setBlogData] = useState<BlogType>({
    para1: "",
    para2: "",
    title: "",
    HPId: "",
    img: null,
  });

  useEffect(() => {
    if (!userId || userType !== "healthProfessional") {
      toast.error("Please login again");
      navigate("/hp/login");
    } else {
      setBlogData((prevData) => ({
        ...prevData,
        HPId: userId,
      }));
    }
  }, [userId, userType]);

  const handleChanges = (e: any) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: any) => {
    const { name, files } = e.target;
    setBlogData({ ...blogData, [name]: files[0] });
  };

  console.log("blog data", blogData);

  const handleSubmit = () => {
    const { title, para1, para2, img } = blogData;
    if (!title || !para1 || !para2 || !img) {
      alert("Please fill all the fields");
      return;
    }

    sendDataToServer();
  };

  const sendDataToServer = async () => {
    let formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("para1", blogData.para1);
    formData.append("para2", blogData.para2);
    if (blogData.img) {
      formData.append("files", blogData.img);
    }
    formData.append("HPId", blogData.HPId);
    try {
      let res = await axiosMultipartInstance.post("addBlog", formData);
      if (res.status === 200) {
        alert("Blog posted successfully");

        setTimeout(() => {
          navigate("/rp-view-tutorials");
        }, 1500);
      }
    } catch (error) {
      console.log("error on get task data", error);
    }
  };
  return (
    <>
      <HPNavbar />
      <div className="Rpblog ">
        <div className="rpblogheading">
          <h1>BLOG POST</h1>
        </div>

        <div className="rpblogform">
            
          <div className="rpblogfield">
            <div className="rpbloginputs">
              <div className="bloglabel">
                <label>Title</label>
              </div>
              <input
                type="text"
                name="title"
                value={blogData.title}
                onChange={handleChanges}
              />
            </div>
          </div>

          <div className="rpblogfield">
            <div className="rpblogarea">
              <div className="bloglabel">
                <label>Blog Content</label>
              </div>
              <textarea
                rows={5}
                name="para1"
                value={blogData.para1}
                onChange={handleChanges}
              />
            </div>
          </div>

          <div className="rpblogfield">
            <div className="rpblogarea">
              <div className="bloglabel">
                <label>Conclusion</label>
              </div>
              <textarea
                name="para2"
                value={blogData.para2}
                onChange={handleChanges}
              />
            </div>
          </div>

          <div className="rpblogfield">
            <div className="blogfiles">
              <div className="bloglabel">
                <label>Images</label>
              </div>

              <div className="rpimg1">
                <input name="img" onChange={handleFileChange} type="file" />
              </div>
            </div>
          </div>

          <div className="blogbutton d-flex justify-content-center">
            <button className="submit-btn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <CommonFooter />
      </div>
    </>
  );
};

