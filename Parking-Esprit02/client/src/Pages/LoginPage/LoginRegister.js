import React, { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import GoogleLogin from "react-google-login";
import "./LoginSignUp.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { notification } from "antd";



import log1 from "../images/register.svg";

import log2 from "../images/log.svg";

const LoginRegister = () => {

  const alpha = "abcdefghijklmnopqrstuvwxyz";
  const calpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const num = "1234567890";
  const specials = ",.!@#$%^&*";
  const options = [alpha, alpha, alpha, calpha, calpha, num, num, specials];
  let opt, choose;
  let pass = "";




  for (let i = 0; i < 8; i++) {
    opt = Math.floor(Math.random() * options.length);
    choose = Math.floor(Math.random() * options[opt].length);
    pass = pass + options[opt][choose];
    options.splice(opt, 1);
  }

  const [loginData, setLoginData] = useState(
    localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null
  );

  const handleFailure = () => {
    notification.error({ message: "error GoogleLogin " });
  };

  const handleLogin = async (googleData) => {
    const res = await fetch("http://localhost:5000/api/google-login", {
      method: "POST",
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    await axios
      .post(
        "http://localhost:5000/api/users/loginGoogle",
        { email: data.email },
        config
      )
      .then((result) => {
        localStorage.setItem("userInfo", JSON.stringify(result.data));

        if(result.data.role == 'admin'){
          navig("/admin/dash/" + result.data._id);
        }

        if(result.data.role == 'client'){
          navig("/client/dash/" + result.data._id);
        }
        
      })
      .catch(() => {
        notification.error({ message: "check your Email " });
      });
  };

  const handleSignUp = async (googleData) => {
    const res = await fetch("http://localhost:5000/api/google-login", {
      method: "POST",
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    setLoginData(data);

    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    await axios
      .post(
        "http://localhost:5000/api/users/add",

        {
          name: data.name,
          email: data.email,
          address: "GoogleAddress",
          password: pass,
          phone: "00000000",
          photo: data.photo,
          role: "client",
        },
        config
      )
      .then((result) => {
        const templateParams = {
          password: pass,
          Email: result.data.email,
        };

        emailjs
          .send(
            "service_1os572r",
            "template_hw9fwol",
            templateParams,
            "user_TjkkGMETOdkygzIZjLVGS"
          )
          .then(
            (result) => {
              console.log(result.text);
            },
            (error) => {
              console.log(error.text);
            }
          );

        setTogel((togel = ""));

        notification.success({
          message: "check your Email To find your password ",
        });
      })
      .catch(() => {
        notification.error({ message: "Error Sign Up  " });
      });
  };

  const resetpassword = async () => {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    await axios
      .post(
        "http://localhost:5000/api/users/request/password",
        { email },
        config
      )
      .then((data) => {
        let templateParams = {
          name: name,
          Email: email,
          message: `http://localhost:3000/profile/ressetpass/${data.data._id}/${data.data.token}`,
        };

        emailjs
          .send(
            "service_1os572r",
            "template_lnq0ocu",
            templateParams,
            "user_TjkkGMETOdkygzIZjLVGS"
          )
          .then(
            (result) => {
              notification.success({ message: "Check you Email" });
            },
            (error) => {
              notification.error({ message: error.text });

            }
          );
      })
      .catch((error) => {
        notification.error({ message: "Email Not Found " });

      });
  };

  //Login Variable
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  //Register Variable
  const [emailR, setemailR] = useState("");
  const [passwordR, setpasswordR] = useState("");

  const [name, setname] = useState("");
  const [address, setaddress] = useState("");
  const [phone, setphone] = useState("");
  const [role, setrole] = useState("client");
  const [photo, setphoto] = useState("");


  
  const onFileUpload = (e) => {
    const formData = new FormData();

    let file = e.target.files[0];

    formData.append("image", file);

    setphoto(file.name);

    axios.post("http://localhost:5000/api/upload", formData);

    console.log("photo", photo);
  };

  const navig = useNavigate();

  let [togel, setTogel] = useState("");

  const handelchangeIn = () => {
    setTogel((togel = ""));
  };

  const handelchangeUp = () => {
    setTogel((togel = "sign-up-mode"));
  };

  const user = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {

    if (user){
      
      if (user.role == "client") {
        navig("/client/dash/" + user._id);
      }
      if (user.role == "admin") {
        navig("/admin/dash/" + user._id);
      }
      if (user.role == "company") {
        navig("/client/dash/" + user._id);
      }
    }

  }, []);

  const submithandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    await axios
      .post(
        "http://localhost:5000/api/users/login",
        { email, password },
        config
      )
      .then((data) => {

        

        if(data.data.role == 'admin' || data.data.role == 'Admin' ){
          localStorage.setItem("userInfo", JSON.stringify(data.data));
          navig("/admin/dash/" +data.data._id);
        }

        if(data.data.role == 'company' || data.data.role == 'Company'  ){
          localStorage.setItem("userInfo", JSON.stringify(data.data));
          navig("/company/dash/" +data.data._id);
        }

        if(data.data.role == 'client'|| data.data.role == 'Client' ){
          navig("/client/dash/" + data.data._id);
          localStorage.setItem("userInfo", JSON.stringify(data.data));
        }

      })
      .catch(() => {
        notification.error({ message: "check your Email or Password" });
      });
  };



  const submithandlerR = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    await axios
      .post(
        "http://localhost:5000/api/users/add",
        {
          name,
          email: emailR,
          address,
          password: passwordR,
          phone,
          photo,
          role,
        },
        config
      )
      .then((data) => {
        notification.success({ message: "You are One of us  " + data.data.name });
        setemail(emailR);
        setpassword(passwordR);
        setTogel((togel = ""));
      })
      .catch(() => {
        notification.error({ message: "check your Data" });
      });
  };

  return (
    <React.Fragment>
      <div className={`container_log ${togel}`}>
        <div className="forms-container_log">
          <div className="signin-signup">
            <form onSubmit={submithandler} className="sign-in-form">
              <h2 className="title">Sign in</h2>
              <div className="input-field">
                <i className="fas fa-user" />
                <input
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  required
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  required
                  minLength={5}
                  autoComplete
                />
              </div>
              <p onClick={resetpassword} className="Link">Forget my password ? </p>

              <input
                type="submit"
                defaultValue="Login"
                className="btn_log solid"
              />

              

              <GoogleLogin
                clientId={
                  "383609296631-1rqh8hldbf76j1420idr4l0bhhab1lhr.apps.googleusercontent.com"
                }
                buttonText="login with Google"
                onSuccess={handleLogin}
                onFailure={handleFailure}
                cookiePolicy={"single_host_origin"}
              ></GoogleLogin>
            </form>

            <form onSubmit={submithandlerR} className="sign-up-form">
              <h2 className="title">Sign up</h2>
              <div className="input-field">
                <i className="fas fa-user" />
                <input
                  type="text"
                  placeholder="Username"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  required
                  minLength={4}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope" />
                <input
                  type="email"
                  placeholder="Email"
                  value={emailR}
                  onChange={(e) => setemailR(e.target.value)}
                  required
                />
              </div>

              <div className="input-field">
                <i className="fas fa-phone" />
                <input
                  type="number"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setphone(e.target.value)}
                  required
                  minLength={8}
                />
              </div>

              <div className="input-field">
                <i className="fas fa-home" />
                <input
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setaddress(e.target.value)}
                  required
                  datatype="number"
                />
              </div>

              <div className="input-field">
                <i className="fas fa-users" />
                <select onChange={(e) => setrole(e.target.value)} required>
                  <option >client</option>
                  <option>company</option>
                </select>
              </div>


              <div className="input-field">
                <i className="fas fa-lock" />
                <input
                  type="password"
                  placeholder="Password"
                  value={passwordR}
                  minLength={5}
                  onChange={(e) => setpasswordR(e.target.value)}
                  required
                />
              </div>

              <div className="input-field">
            <i className="fas fa-image" />
            <input type="file" placeholder="photo" onChange={onFileUpload} />
            </div>

              <input type="submit" className="btn_log" defaultValue="Sign up" />

              <GoogleLogin
                clientId={
                  "383609296631-1rqh8hldbf76j1420idr4l0bhhab1lhr.apps.googleusercontent.com"
                }
                buttonText="Sign up with Google"
                onSuccess={handleSignUp}
                onFailure={handleFailure}
                cookiePolicy={"single_host_origin"}
              ></GoogleLogin>
            </form>
          </div>
        </div>
        <div className="panels-container_log">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here ?</h3>
              <p>Add Your Text Text Text Text ...</p>
              <button
                className="btn_log transparent"
                id="sign-up-btn_log"
                onClick={handelchangeUp}
              >
                Sign up
              </button>
            </div>
            <div className="image">
              <img src={log1} alt="image"></img>
            </div>
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>One of us ?</h3>
              <p>Add Your Text Text Text Text ...</p>
              <button
                className="btn_log transparent"
                id="sign-in-btn_log"
                onClick={handelchangeIn}
              >
                Sign in
              </button>
            </div>
            <div className="image">
              <img src={log2} alt="image"></img>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default LoginRegister;
