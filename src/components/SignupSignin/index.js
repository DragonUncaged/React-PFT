import React, { useState } from "react";
import "./styles.css";
import InputComponent from "../common/Input";
import Button from "../common/Button";
import { FcGoogle } from "react-icons/fc";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db, provider } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignupSignin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cfPassword, setcfPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  const navigate = useNavigate();
  
  const signUnHandle = () => {
    if (
      name !== " " &&
      email !== " " &&
      password !== " " &&
      cfPassword !== " "
    ) {
      setLoading(true);
      if (password !== cfPassword) {
        toast.error("Password does not match");
      }
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          toast.success("Sign in successfully");
          setLoading(false);
          setLoginForm(true);
          setName("");
          setEmail("");
          setPassword("");
          setcfPassword("");

          createDoc(user);
        })
        .catch((error) => {
          toast.error(error.message);
          setLoading(false);
        });
    } else {
      toast.error("All fields required");
      setLoading(false);
    }
  };

  // Signin function
  const signInHandle = () => {
    setLoading(true);
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

          toast.success("Login successfully");
          setEmail("");
          setPassword("");
          setLoading(false);
          // when user sign in successfully then navigate to the dashboard page
          navigate("/dashboard");
        })
        .catch((error) => {
          toast.error(error.message);
          setLoading(false);
        });
    } else {
      toast.error("All fields required");
      setLoading(false);
    }
  };

  const createDoc = async (user) => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      try {
        console.log("new Account username", name);
        await setDoc(doc(db, "users", user.uid), {
          displayName: user.displayName ? user.displayName : user.email,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });

        console.log("new Account username", user);
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  const googleAuth = () => {
    setLoading(true);
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          
          const user = result.user;
          console.log(user);
          createDoc(user);
          navigate("/dashboard");
          toast.success("Login successfully");
          
          setLoading(false);
        })
        .catch((error) => {
          toast.error(error.message);
          setLoading(false);
        });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {loginForm ? (
        <div className="signup-wrapper">
          <h2 className="title">
            Login up on{" "}
            <span style={{ color: "var(--primary-purple)" }}>Fanancley</span>
          </h2>
          <InputComponent
            type={"email"}
            state={email}
            setState={setEmail}
            placeholder={"Enter your email"}
          />
          <InputComponent
            type={"password"}
            state={password}
            setState={setPassword}
            placeholder={"Password"}
          />
          <Button
            text={loading ? "Loading..." : "Login"}
            disabled={loading}
            onClick={signInHandle}
            purple={true}
          />
          <p className="or-name">or</p>
          <Button
            text={loading ? "Loading..." : "Login with Google"}
            onClick={googleAuth}
            purple={false}
            icon={<FcGoogle className="FcGoogle" />}
          ></Button>
          <p className="have-an-account">
            Don't have an account?{" "}
            <span
              onClick={() => setLoginForm(false)}
              style={{ cursor: "pointer" }}
            >
              Click here
            </span>
          </p>
        </div>
      ) : (
        <div className="signup-wrapper">
          <h2 className="title">
            Sign Up on{" "}
            <span style={{ color: "var(--primary-purple)" }}>Financely</span>
          </h2>
          <InputComponent
            type={"text"}
            state={name}
            setState={setName}
            placeholder={"Enter your name"}
          />
          <InputComponent
            type={"email"}
            state={email}
            setState={setEmail}
            placeholder={"Enter your email"}
          />
          <InputComponent
            type={"password"}
            state={password}
            setState={setPassword}
            placeholder={"Password"}
          />
          <InputComponent
            type={"password"}
            state={cfPassword}
            setState={setcfPassword}
            placeholder={"Confirm password"}
          />
          <Button
            text={loading ? "Loading..." : "Sign up"}
            disabled={loading}
            onClick={signUnHandle}
            purple={true}
          />
          <p className="or-name">or</p>
          <Button
            text={loading ? "Loading..." : "Sign up with Google"}
            purple={false}
            icon={<FcGoogle className="FcGoogle" />}
            onClick={googleAuth}
          ></Button>
          <p className="have-an-account">
            Already have an account?{" "}
            <span
              onClick={() => setLoginForm(true)}
              style={{ cursor: "pointer" }}
            >
              Click here
            </span>
          </p>
        </div>
      )}
    </>
  );
};

export default SignupSignin;
