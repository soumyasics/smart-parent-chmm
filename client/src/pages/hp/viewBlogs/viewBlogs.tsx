import { useEffect, useState } from "react";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../apis/axiosInstance";
import { Card } from "react-bootstrap";
import { HPBlogType } from "./types";

export const ViewBlogs = () => {
  const navigate = useNavigate();
  const { userType, userId } = useSelector((state: RootState) => state.user);
  const [blogs, setBlogs] = useState<HPBlogType[]>([]);
  useEffect(() => {
    if (userType !== "healthProfessional" && userId) {
      navigate("/hp/login");
      return;
    } else {
      getBlogData();
    }
  }, [userType, userId]);

  const getBlogData = async () => {
    try {
      const res = await axiosInstance.get(`getBlogsByHPId/${userId}`);
      if (res.status === 200) {
        const data = res.data?.data || [];
        setBlogs(data);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.log("Error on get blog data", error);
      setBlogs([]);
    }
  };
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Blogs</h1>
      <div className="d-flex flex-wrap gap-2">
        {blogs.map((blog) => {
          return (
            <Card onClick={() => {
              navigate(`/hp/blog/${blog._id}`)
            }} border="primary" style={{ width: "18rem", cursor: "pointer" }}>
              <Card.Header as="h5">Blog</Card.Header>
              <Card.Body>
                <Card.Title>{blog?.title || ""}</Card.Title>
                <Card.Text>{blog?.para1.substring(0, 10) || ""}</Card.Text>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
