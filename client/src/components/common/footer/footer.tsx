import { Form, InputGroup, Stack } from "react-bootstrap";
import { AiOutlineMail } from "react-icons/ai";
import { FaSquareInstagram } from "react-icons/fa6";
import {
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillGoogleCircle,
} from "react-icons/ai";
import "./footer.css";

export const CommonFooter = () => {
  const iconStyle = {
    fontSize: "25px",
  };

  return (
    <div className="my-footer">
      <div>
        <Stack>
          <h4 className="footer-logo">Child Crescendo  </h4>
          <InputGroup className="w-75 footer-mail">
            <InputGroup.Text>
              <AiOutlineMail />
            </InputGroup.Text>
            <Form.Control  type="text" placeholder="Enter Your Email" />
          </InputGroup>
          <div className="socialmedia-icons">
            <FaSquareInstagram style={iconStyle} />
            <AiFillFacebook style={iconStyle} />
            <AiFillTwitterSquare style={iconStyle} />
            <AiFillGoogleCircle style={iconStyle} />
          </div>
        </Stack>
        <Stack className="my-stack">
          <p>Links</p>
          <p>Home</p>
          <p>Support</p>
          <p>About </p>
        </Stack>

        <Stack className="my-stack">
          <p>Services</p>
          <p>Insurance</p>
          <p>Legal</p>
          <p>Site Map</p>
        </Stack>

        <Stack className="my-stack">
          <p>About </p>
          <p>Accessability</p>
          <p>Enviornment</p>
          <p>Branches</p>
        </Stack>

        <Stack className="my-stack">
          <p>Contact us</p>
          <p>(+91) 123-456-7890</p>
          <p>ChildCrescendo@gmail.com</p>
        </Stack>

        <Stack className="download-app-stack my-stack">
          <p>Download App</p>
          <img
            src="https://pbs.twimg.com/media/F8K8X3_XMAAKWYp?format=jpg&name=small"
            alt="play-store"
          />
          <img
            src="https://pbs.twimg.com/media/F8K9Y0mXUAA7itL?format=png&name=small"
            alt="play-store"
          />
        </Stack>
      </div>
      <div className="footer-credit">
        <p>© 2024 Child Crescendo </p>
        <div>
          <p>Terms of Service</p>
          <p>Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};
