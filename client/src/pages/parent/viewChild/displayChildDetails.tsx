import { ItemsNotFound } from "../itemsNotFound/itemsNotFound";
import { BASE_URL } from "../../../apis/baseUrl";
import { Col, Image, Row } from "react-bootstrap";
interface Child {
  _id: string;
  name: string;
  dob: string;
  birthWeight: string;
  weight: string;
  height: number;
  bloodGroup: string;
  createdAt: string;
  updatedAt: string;
  image: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
  };
  parentId: {
    _id: string;
    name: string;
    email: string;
    password: string;
    phoneNumber: number;
  };
  __v: number;
}
interface DisplayChildDetailsProps {
  childData: Child[];
}

export const DisplayChildDetails: React.FC<DisplayChildDetailsProps> = ({
  childData,
}) => {
  if (childData.length === 0) {
    return (
      <div>
        <ItemsNotFound
          title="You have not registered any child yet!"
          description=""
        />
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-center">Child Details</h3>
      <div>
        {childData.map((child: any) => {
          const imgFilename = child.image?.filename || "";
          let imageLink =
            "https://t3.ftcdn.net/jpg/01/28/56/34/360_F_128563455_bGrVZnfDCL0PxH1sU33NpOhGcCc1M7qo.jpg";
          if (imgFilename) {
            imageLink = `${BASE_URL}${imgFilename}`;
          }
          return (
            <div key={child._id} className="card mb-3">
              <div className="card-body">
                <Row>
                  <Col className="d-flex justify-content-center">
                    <Image
                      className="rounded-circle"
                      style={{ height: "150px", width: "150px" }}
                      src={imageLink}
                      alt="kid"
                    />
                  </Col>
                </Row>
                <Row className="mt-5">
                  <Col>
                    <p className="card-title">
                      {" "}
                      <span className="fw-bold"> Name:</span> {child?.name}
                    </p>
                    <p className="card-text">
                      <span className="fw-bold">Date Of Birth: </span>
                      {child?.dob?.substring(0, 10)}
                    </p>

                    <p className="card-text">
                      <span className="fw-bold">Birth Weight: </span>
                      {child?.birthWeight}
                    </p>
                    <p className="card-text">
                      <span className="fw-bold">Gender: </span>
                      {child?.gender}
                    </p>
                  </Col>
                  <Col>
                    <p className="card-text">
                      <span className="fw-bold"> Weight: </span>

                      {child?.weight}
                    </p>
                    <p className="card-text">
                      <span className="fw-bold">Height: </span>
                      {child?.height}
                    </p>
                    <p className="card-text">
                      <span className="fw-bold">Blood Group: </span>
                      {child?.bloodGroup}
                    </p>
                    <p className="card-text">
                      <span className="fw-bold">Description: </span>
                      {child?.description}
                    </p>
                  </Col>
                </Row>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
