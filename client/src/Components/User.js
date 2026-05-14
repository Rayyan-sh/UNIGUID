import { useSelector } from "react-redux";
import Location from "./Location";
const User = () => {
  const email = useSelector((state) => state.users.user?.email);
  const name = useSelector((state) => state.users.user?.name);

  return (
    <div>
      <p>
        <b>{name}</b>
        <br />
        {email}
        
      </p>
      <Location/>
    </div>
  );
};

export default User;
