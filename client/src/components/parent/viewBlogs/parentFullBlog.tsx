import { useEffect, useState } from "react";
import { CommonFooter } from "../../../components/common/footer/footer";
import { useParams } from "react-router-dom";
import { HPBlogType } from "./types";
import axiosInstance from "../../../apis/axiosInstance";
import { Col, Row } from "react-bootstrap";
import { BASE_URL } from "../../../apis/baseUrl";
import { ParentNavbar } from "../parentNavbar/parentNavbar";
export const ParentFullBlog = () => {
  const [blog, setBlog] = useState<HPBlogType | null>(null);
  const [blogImg, setBlogImg] = useState(
    "https://t3.ftcdn.net/jpg/03/05/11/90/360_F_305119072_DVvXN3VHimeyX2mLJ75ssdQ3SV48AwOD.jpg"
  );
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getBlogData(id);
    } else {
      console.log("Blog id can't find");
    }
  }, [id]);

  useEffect(() => {
    if (blog) {
      let imgUrl = blog?.img?.filename || null;
      if (imgUrl) {
        setBlogImg(`${BASE_URL}${imgUrl}`);
      } else {
        setBlogImg(
          "https://t3.ftcdn.net/jpg/03/05/11/90/360_F_305119072_DVvXN3VHimeyX2mLJ75ssdQ3SV48AwOD.jpg"
        );
      }
    }
  }, [blog]);
  const getBlogData = async (id: string) => {
    try {
      const res = await axiosInstance.get(`getBlogById/${id}`);
      if (res.status === 200) {
        const data = res.data?.data || [];
        setBlog(data);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.log("Error on get blog data", error);
      setBlog(null);
    }
  };
  return (
    <div>
      <ParentNavbar />
      <div>
        <div
          className="mt-5 mx-auto"
          style={{
            minHeight: "500px",
            width: "95%",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
        >
          <div className=" p-5">
            <img
              className="img-fluid mx-auto d-block"
              src="https://aicontentfy.com/hubfs/Blog/a%20quill%20and%20scroll%20in%20flat%20illustration%20style%20with%20gradients%20and%20white%20background_compressed%20fa0a57ac-ba7f-4724-b337-aeabb1235c4b.jpg"
              alt="blog"
              style={{ height: "300px" }}
            />
            <br />
            <br />
            <Row>
              <Col xs={8} className="d-flex flex-column justify-content-center">
                <h2> {blog?.title}</h2>
                <p>{blog?.para1}</p>
                <p>{blog?.para2}</p>
              </Col>
              <Col xs={4}>
                <img
                  className="img-fluid"
                  src={blogImg}
                  alt="blog"
                  style={{ height: "300px", width: "100%" }}
                />
              </Col>
            </Row>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <CommonFooter />
      </div>
    </div>
  );
};
