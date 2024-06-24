import { Image } from "react-bootstrap";
import addTutorialImg from "../../../assets/add-tutorial-img.jpg";
import { useState, useEffect } from "react";
import { Col, Form, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import axiosMultipartInstance from "../../../apis/axiosMultipartInstance";
import { CommonFooter } from "../../../components/common/footer/footer";
import { HPNavbar } from "../../../components/hp/hpNavbar/hpNavbar";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

interface VideoDataType {
  title: string;
  description: string;
  thumbnail: File | null;
  video: File | null;
  HPId: string;
  target: string;
  duration: string;
}

export const UploadVideo = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("title");
  const [description, setDescription] = useState("desc");
  const [target, setTarget] = useState("3");
  const [duration, setDuration] = useState("3");

  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [HPId, setHPId] = useState("");
  const [validated, setValidated] = useState(false);
  const { userId, userType } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!userId || userType !== "healthProfessional") {
      toast.error("Please login again");
      navigate("/hp/login");
    } else {
      setHPId(userId);
    }
  }, []);

  const handleUploadTutorail = (e: any) => {
    e.preventDefault();
    setValidated(true);
    if (e.currentTarget.checkValidity() === false) {
      e.stopPropagation();
    }

    if (
      !title ||
      !description ||
      !thumbnail ||
      !video ||
      !HPId ||
      !duration ||
      !target
    ) {
      toast.error("All fields are required.");
      return;
    }

    let videoObj: VideoDataType = {
      title,
      description,
      thumbnail,
      video,
      HPId,
      duration,
      target,
    };

    sendDataToServer(videoObj);
  };

  const sendDataToServer = async (videoObj: VideoDataType) => {
    const formData = new FormData();
    formData.append("title", videoObj.title);
    formData.append("description", videoObj.description);

    if (videoObj.thumbnail) {
      formData.append("files", videoObj.thumbnail);
    } else {
      toast.error("Thumbnail is required");
    }
    if (videoObj.video) {
      formData.append("files", videoObj.video);
    } else {
      toast.error("Video is required");
    }

    formData.append("HPId", videoObj.HPId);
    formData.append("duration", videoObj.duration);
    formData.append("target", videoObj.target);

    console.log("video boj", videoObj);
    try {
      let res = await axiosMultipartInstance.post("uploadVideo", formData);
      if (res.status === 200) {
        toast.success("Tutorial uploaded successfully");
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log("err on upload video", error);
    }
  };

  return (
    <>
      <HPNavbar />
      <div className="mt-5">
        <h2 className="text-center mb-3">Upload Tutorials</h2>

        <div
          style={{ height: "500px", width: "90%" }}
          className=" d-flex add-tutorial-form-container mx-auto"
        >
          <div
            style={{ width: "40%" }}
            className="d-flex p-3 justify-content-center align-items-center"
          >
            <Image className="w-75" src={addTutorialImg} alt="add-tutorials" />
          </div>
          <div className="p-3 shadow">
            <Form
              className="rp-video-upload-form p-5 "
              noValidate
              validated={validated}
              onSubmit={handleUploadTutorail}
            >
              <h4 className="text-center text-dark"> Tutorial Upload Form </h4>
              <p className="text-center text-dark">
                {" "}
                <i>Upload tutorial videos here.. </i>
              </p>
              <Row>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Tutorial Title</Form.Label>
                    <Form.Control
                      onChange={(e) => setTitle(e.target.value)}
                      name="title"
                      value={title}
                      type="text"
                      placeholder="Tutorial Title"
                      autoFocus
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please Tutorial title
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Tutorial Target</Form.Label>
                    <Form.Control
                      name="target"
                      onChange={(e) => setTarget(e.target.value)}
                      value={target}
                      type="text"
                      placeholder="Video Target age Eg: 3"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide tutorial target
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Tutorial Duration in mins</Form.Label>
                    <Form.Control
                      onChange={(e) => setDuration(e.target.value)}
                      name="duration"
                      value={duration}
                      type="text"
                      placeholder="Tutorial Duration Eg: 3"
                      autoFocus
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please Provide Tutorial Duration
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Tutorial Description</Form.Label>
                    <Form.Control
                      name="description"
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                      type="text"
                      placeholder="Tutorial Description"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide tutorial description
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Tutorial Thumbnail</Form.Label>
                    <Form.Control
                      name="thumbnail"
                      type="file"
                      required
                      onChange={(e) => {
                        const target = e.target as HTMLInputElement;
                        if (target.files && target.files[0]) {
                          setThumbnail(target.files[0]);
                        }
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a video thumbnail
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Tutorial Video</Form.Label>
                    <Form.Control
                      onChange={(e) => {
                        const target = e.target as HTMLInputElement;
                        if (target.files && target.files[0]) {
                          setVideo(target.files[0]);
                        }
                      }}
                      name="video"
                      type="file"
                      required
                      placeholder="Video"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please upload a video
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <div className="mt-3 d-flex justify-content-center align-items-center">
                <Button
                  type="submit"
                  style={{ width: "10rem", height: "50px" }}
                >
                  {" "}
                  Upload Video
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <CommonFooter />
      </div>
    </>
  );
};
