import { Image } from "react-bootstrap";
import { FC } from "react";

interface IllustrationProps {
  imgPath: string;
}

export const IllustrationSection: FC<IllustrationProps> = ({ imgPath }) => {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <Image src={imgPath} alt="Illustration" fluid />
    </div>
  );
};
