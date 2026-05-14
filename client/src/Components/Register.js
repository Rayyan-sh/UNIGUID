import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../Features/UserSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchemaValidation } from "../Validations/UserValidations";
import { Button, Container, FormGroup, Label } from "reactstrap";
import "./register.css";
import p1 from "../Images/p1.jpg";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaValidation),
  });

  const onSubmit = async (data) => {
    try {
      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
        gender: data.gender,
      };
      const result = await dispatch(registerUser(userData));
      if (result?.payload) {
        localStorage.setItem("user", JSON.stringify(result.payload));
      }
      if (result?.payload) {
        alert("Account created successfully ");

        navigate("/CourseList");
      } else {
        alert("Registration failed ");
      }
    } catch (error) {
      console.log("Register Error:", error);
    }
  };

  return (
    <div className="register-page">
      <Container>
        <div className="register-wrapper">

          <div className="register-left">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2>Create Account</h2>

              <FormGroup>
                <Label>Name</Label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  {...register("name")}
                />
                <p style={{ color: "red" }}>{errors.name?.message}</p>
              </FormGroup>

              <FormGroup>
                <Label>Email</Label>
                <input
                  type="email"
                  placeholder="Enter email"
                  {...register("email")}
                />
                <p style={{ color: "red" }}>{errors.email?.message}</p>
              </FormGroup>

              <FormGroup>
                <Label>Password</Label>
                <input
                  type="password"
                  placeholder="Enter password"
                  {...register("password")}
                />
                <p style={{ color: "red" }}>{errors.password?.message}</p>
              </FormGroup>

              <FormGroup>
                <Label>Confirm Password</Label>
                <input
                  type="password"
                  placeholder="Confirm password"
                  {...register("confirmPassword")}
                />
                <p style={{ color: "red" }}>
                  {errors.confirmPassword?.message}
                </p>
              </FormGroup>

              <FormGroup>
                <Label>Gender</Label>

                <div>
                  <label>
                    <input
                      type="radio"
                      value="male"
                      {...register("gender")}
                    />
                    Male
                  </label>

                  <label style={{ marginLeft: "15px" }}>
                    <input
                      type="radio"
                      value="female"
                      {...register("gender")}
                    />
                    Female
                  </label>
                </div>

                <p style={{ color: "red" }}>{errors.gender?.message}</p>
              </FormGroup>

              <Button color="primary" type="submit">
                Register
              </Button>

              <p className="mt-3">
                Already have account? <Link to="/login">Login</Link>
              </p>
            </form>
          </div>

          <div className="register-right">
            <img src={p1} alt="register" />
          </div>

        </div>
      </Container>
    </div>
  );
};

export default Register;