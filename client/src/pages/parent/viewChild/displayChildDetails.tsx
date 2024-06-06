import { ItemsNotFound } from "../itemsNotFound/itemsNotFound";

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
  console.log("chh", childData);

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
        {/* todo => make this cards  */}
        {childData.map((child: any) => (
          <div key={child._id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Name: {child.name}</h5>
              <p className="card-text">
                Date Of Birth: {child.dob.substring(0, 10)}
              </p>
              <p className="card-text">Weight: {child.weight}</p>
              {/* todo add gender */}
              {/* <p className="card-text">Gender: {child.gender}</p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
