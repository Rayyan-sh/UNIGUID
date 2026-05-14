import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { updateUserProfile } from "../Features/UserSlice";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Container,
} from "reactstrap";
import "./Profile.css";
import Location from "./Location"; 

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.users.user);
  const email = user?.email;

  const [name, setname] = useState(user?.name || "");
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState(user?.gender || "");

  useEffect(() => {
    if (user) {
      setname(user.name || "");
      setGender(user.gender || "");
    }
  }, [user]);

  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email, navigate]);
      // Prevent the default form submission 

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (password && password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const userData = {
      email: user.email,
      name: name,
      password: password,
      gender: gender,
    };

    try {
      await dispatch(updateUserProfile(userData)).unwrap();
      alert("Profile Updated");
      navigate("/profile");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <div className="profile-page">
      <Container>
        <div className="profile-wrapper">

          <div className="profile-sidebar">
            <div className="profile-card">

              <div className="profile-header">
                <h3>{user?.name || "User Name"}</h3>
                <p>{user?.email}</p>
                <p><b>Gender:</b> {user?.gender}</p>
              </div>

              <Location />

            </div>
          </div>

          <div className="profile-content">
            <div className="profile-card">

              <Form onSubmit={handleUpdate}>

                <FormGroup>
                  <Label>Name</Label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Email</Label>
                  <Input type="email" value={user?.email || ""} disabled />
                </FormGroup>

                <FormGroup>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Confirm Password</Label>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </FormGroup>

                {/* Gender */}
                <FormGroup>
                  <Label>Gender</Label>
                  <div>
                    <Input
                      type="radio"
                      value="male"
                      checked={gender === "male"}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <Label> Male </Label>

                    <Input
                      type="radio"
                      value="female"
                      checked={gender === "female"}
                      onChange={(e) => setGender(e.target.value)}
                      style={{ marginLeft: "15px" }}
                    />
                    <Label> Female </Label>
                  </div>
                </FormGroup>

                <Button className="update-btn">
                  Update Profile
                </Button>

              </Form>

            </div>
          </div>

        </div>
      </Container>
    </div>
  );
};

export default Profile;