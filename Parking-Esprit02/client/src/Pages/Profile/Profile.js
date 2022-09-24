import React, { useEffect, useState } from "react";
import "../LoginPage/LoginSignUp.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { Image, notification } from "antd";
import defaultImage from "../images/images.png";

import { Layout, Menu } from "antd";

const { Header } = Layout;

function Profile() {
  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [photo, setphoto] = useState("");

  const [number, setnumber] = useState("");
  const [type, settype] = useState("");
  const [description, setdescription] = useState("");

  const user = JSON.parse(localStorage.getItem("userInfo"));
  const navig = useNavigate();

  useEffect(() => {
    if (!user) {
      navig("/");
    } else {
      setname(user.name);
      setemail(user.email);
      setaddress(user.address);
      setphone(user.phone);
      setphoto(user.photo);
    }
  }, [user.name]);

  const onFileUpload = async (e) => {
    const formData = new FormData();

    let file = e.target.files[0];

    formData.append("image", file);

    setphoto(file.name);

    await axios.post("http://localhost:5000/api/upload", formData);
    image = require("../../uploads/" + photo);
    console.log("photo", photo);
  };

  const LogOut = () => {
    localStorage.removeItem("userInfo");
    navig("/");
  };

  const addcreate = async () => {
    await axios
      .post(`http://localhost:5000/api/car`, {
        number,
        type,
        description,
        owner_id: user._id,
      })
      .then((data) => {
        notification.success({ message: "car added " });
      })
      .catch(() => {
        notification.error({ message: "Check your data" });
      });
  };

  const push = () => {
    navig("/profile");
  };

  const home = () => {
    if (user.role == "admin" || user.role == "Admin") {
      navig("/admin/dash/" + user._id);
    }

    if (user.role == "company" || user.role == "Company") {
      navig("/company/dash/" + user._id);
    }

    if (user.role == "client" || user.role == "Client") {
      navig("/client/dash/" + user._id);
    }
  };

  const submithandlerR = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    let id = user._id;

    await axios
      .put(
        `http://localhost:5000/api/users/update/${id}`,
        {
          name,
          email,
          address,
          phone,
          photo,
        },
        config
      )
      .then((data) => {
        notification.success({ message: "Done" });
      })
      .catch(() => {
        notification.error({ message: "Check your data" });
      });
  };

  let image = "";
  try {
    if (photo != "") {
      image = require("../../uploads/" + photo);
    }
  } catch (err) {
    setphoto("");
  }

  return (
    <>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key="1" onClick={() => home()}>
            Welcom {user.name}
          </Menu.Item>
          <Menu.Item key="2" onClick={() => push()}>
            Edite Profile
          </Menu.Item>
          <Menu.Item key="3" onClick={() => LogOut()}>
            LogOut
          </Menu.Item>
        </Menu>
      </Header>

      <div className="car">
        <div className="card">
          <form onSubmit={submithandlerR}>
            <h2 className="title_Update">Update Your Profile </h2>

            {photo != "" ? (
              <Image className="img_profile" width={200} src={image} />
            ) : (
              <img
                className="img_profile"
                src={defaultImage}
                alt="defaultimage"
              ></img>
            )}

            <div className="input-field">
              <i className="fas fa-user" />
              <input
                type="text"
                placeholder="Username"
                value={name}
                onChange={(e) => {
                  setname(e.target.value);
                }}
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                required
              />
            </div>

            <div className="input-field">
              <i className="fas fa-phone" />
              <input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setphone(e.target.value)}
                required
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
              />
            </div>

            <div className="input-field">
              <i className="fas fa-image" />
              <input type="file" placeholder="photo" onChange={onFileUpload} />
            </div>

            <input type="submit" className="btn_log" defaultValue="Sign up" />
          </form>
        </div>

        {user.role == "client" ? (
          <div className="card  car-car">
            <form onSubmit={addcreate}>
              <h2 className="title_Update">Add Car information </h2>

              <div className="input-field">
                <i className="fas fa-car" />
                <input
                  type="text"
                  placeholder="number"
                  value={number}
                  onChange={(e) => {
                    setnumber(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="input-field">
                <i className="fas fa-car" />
                <input
                  type="text"
                  placeholder="type"
                  value={type}
                  onChange={(e) => {
                    settype(e.target.value);
                  }}
                  required
                />
              </div>

              <div className="input-field">
                <i className="fas fa-car" />
                <input
                  type="text"
                  placeholder="description"
                  value={description}
                  onChange={(e) => {
                    setdescription(e.target.value);
                  }}
                  required
                />
              </div>

              <input type="submit" className="btn_log" defaultValue="Sign up" />
            </form>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default Profile;
