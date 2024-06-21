import { useState } from "react";
import { CommonFooter } from "../../common/footer/footer";
import { ParentNavbar } from "../parentNavbar/parentNavbar";
import { Col, Row } from "react-bootstrap";
import { DropdownSearch } from "../../common/dropdownSearch/dropdownSearch";

export const BookVaccine = () => {
  const [selectedVaccine, setSelectedVaccine] = useState<string>("");
  const [allVaccines, setAllVaccines] = useState([
    "abc",
    "two word",
    "def",
    "ghi",
    "jkl",
    "abcd",
    "mno",
    "pqr",
    "stu",
    "vwxy",
  ]);

  const selectVaccine = (value: string) => {
    console.log("value", value);
    setSelectedVaccine(value);
  };

  return (
    <div>
      <ParentNavbar />
      <div style={{ minHeight: "600px" }}>
        <div className=" mt-4">
          <h4 className="text-center"> Find vaccines here.</h4>

          <Row
            style={{ width: "90%" }}
            className="find-vaccine-box mx-auto bg-primary pt-2 shadow  d-flex px-5 justify-content-center"
          >
            <Col md={3}>
              <DropdownSearch items={allVaccines} selectItem={selectVaccine} />
            </Col>
            <Col md={3}></Col>
            <Col md={3}></Col>
            <Col md={3}></Col>
          </Row>
        </div>
      </div>
      <CommonFooter />
    </div>
  );
};
