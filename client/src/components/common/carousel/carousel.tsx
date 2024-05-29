import Carousel from "react-bootstrap/Carousel";
import { Container, Image } from "react-bootstrap";
import hpImage1 from "../../../assets/doctor-1.jpg";
import hpImage2 from "../../../assets/hp2.jpg";
import hpImage3 from "../../../assets/hp3.jpg";

export const HomeCarousel = () => {
  return (
    <Carousel className="rounded w-100 mx-auto">
      <Carousel.Item>
        <Container
          style={{ height: "700px" }}
          fluid
          className="w-100 p-0 d-flex justify-content-center"
        >
          <Image
            style={{ height: "600px" }}
            className="h-100 w-100"
            src={hpImage1}
            alt="First slide"
          />
        </Container>
        <Carousel.Caption style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', borderRadius: '10px', padding: '10px' }}>
          <h3 style={{ color: '#ffffff' }}>Experienced and Certified Professionals</h3>
          <p style={{ color: '#ffffff' }}>
            Our team consists of experienced dietitians, psychiatrists, and fitness specialists.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Container
          style={{ height: "700px" }}
          fluid
          className="w-100 p-0 d-flex justify-content-center"
        >
          <Image className="h-100 w-100" src={hpImage2} alt="Second slide" />
        </Container>
        <Carousel.Caption style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', borderRadius: '10px', padding: '10px' }}>
          <h3 style={{ color: '#ffffff' }}>Tailored Health Plans</h3>
          <p style={{ color: '#ffffff' }}>
            Receive personalized diet and exercise plans that cater to your unique health requirements.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Container
          style={{ height: "700px" }}
          fluid
          className="w-100 p-0 d-flex justify-content-center"
        >
          <Image className="h-100 w-100" src={hpImage3} alt="Third slide" />
        </Container>
        <Carousel.Caption style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', borderRadius: '10px', padding: '10px' }}>
          <h3 style={{ color: '#ffffff' }}>Ongoing Support and Guidance</h3>
          <p style={{ color: '#ffffff' }}>
            Stay connected with your health professionals through our chat feature for continuous support.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};
