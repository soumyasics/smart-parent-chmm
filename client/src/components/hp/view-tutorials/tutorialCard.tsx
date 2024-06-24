import { Button, Card } from "react-bootstrap";
import { VideoType } from "./types.ts";
import { FC } from "react";
import { useProfilePicture } from "../../../hooks/useProfilePicture.ts";
import { useNavigate } from "react-router-dom";
interface TutorialCardProps {
  video: VideoType;
}
export const TutorialCard: FC<TutorialCardProps> = ({ video }) => {
  const navigate = useNavigate();
  console.log("vic", video);
  const { profilePicture } = useProfilePicture(video?.thumbnail?.filename);
  return (
    <Card style={{ width: "18rem", height: "400px" }}>
      <div className="h-50">
        <Card.Img className="w-100 h-100" variant="top" src={profilePicture} />
      </div>
      <Card.Body>
        <Card.Title>{video.title}</Card.Title>
        <Card.Text>{video.description}</Card.Text>
        <Button
          variant="primary"
          onClick={() => {
            navigate(`/hp/full-screen/${video._id}`);
          }}
        >
          Watch
        </Button>
      </Card.Body>
    </Card>
  );
};
export default TutorialCard;
