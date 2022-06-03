import { FC } from "react";
import { useParams } from "react-router-dom";

const Details: FC = () => {
  const { id } = useParams();
  console.log(location);
  return <div>History Details {id}</div>;
};

export default Details;
