import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../apis/axiosInstance";
import { Card } from "react-bootstrap";
import { HPBlogType } from "./types";
// import { useParams } from "react-router-dom";
import { FC } from "react";
interface ParentViewBlogsProps {
  healthProfessionalId: string;
}
export const ParentViewBlogs: FC<ParentViewBlogsProps> = ({
  healthProfessionalId,
}) => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<HPBlogType[]>([]);
  // const { id } = useParams();

  const getBlogData = async (id: string) => {
    try {
      const res = await axiosInstance.get(`getBlogsByHPId/${id}`);
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

  useEffect(() => {
    if (healthProfessionalId) {
      getBlogData(healthProfessionalId);
    } else {
      console.log("HP id can't find");
    }
  }, [healthProfessionalId]);
  if (blogs.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <h3>No blogs found</h3>
      </div>
    );
  }
  return (
    <div style={{ backgroundColor: "#eee" }}>
      <h3 style={{ textAlign: "center" }}>Blogs</h3>

      <div className="d-flex flex-wrap gap-2">
        {blogs.map((blog) => {
          return (
            <Card
              onClick={() => {
                navigate(`/parent/blog/${blog._id}`);
              }}
              border="primary"
              style={{ width: "18rem", cursor: "pointer" }}
            >
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
