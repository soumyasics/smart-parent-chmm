import { Container, Row, Col, Card, Button } from "react-bootstrap";

const articles = [
  {
    title: "The Importance of Regular Exercise",
    excerpt:
      "Regular exercise is crucial for maintaining a healthy lifestyle. It helps in weight management, improves mental health, and reduces the risk of chronic diseases.",
    author: "Dr. John Smith",
    link: "https://www.healthline.com/nutrition/10-benefits-of-exercise",
  },
  {
    title: "Understanding Nutrition Labels",
    excerpt:
      "Nutrition labels provide essential information about the food we eat. Learn how to read them and make healthier choices.",
    author: "Dietitian Jane Doe",
    link: "https://www.fda.gov/food/nutrition-facts-label/how-understand-and-use-nutrition-facts-label",
  },
  {
    title: "Mental Health: Tips for Managing Stress",
    excerpt:
      "Managing stress is vital for mental well-being. Discover effective techniques to cope with stress and improve your overall health.",
    author: "Psychiatrist Alice Johnson",
    link: "https://www.mentalhealth.org.uk/explore-mental-health/publications/how-manage-and-reduce-stress",
  },
  {
    title: "The Benefits of a Balanced Diet",
    excerpt:
      "A balanced diet is the foundation of good health. Learn about the key components of a balanced diet and how to incorporate them into your meals.",
    author: "Nutritionist Michael Brown",
    link: "https://www.maxhealthcare.in/blogs/what-is-a-balanced-diet",
  },
];

const LatestArticles = () => {
    return (
      <Container className="my-5">
        <h2 className="text-center mb-4">Latest Articles</h2>
        <Row>
          {articles.map((article, index) => (
            <Col key={index} md={6} lg={3} className="mb-4">
              <Card className="h-100 d-flex flex-column">
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{article.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{article.author}</Card.Subtitle>
                  <Card.Text className="flex-grow-1">{article.excerpt}</Card.Text>
                  <Button variant="primary" href={article.link} className="mt-auto">Read More</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  };
  

export default LatestArticles;
