import { Modal, notification } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import emailjs from "@emailjs/browser";
import GoogleLogin from "react-google-login";

const RegisterModal = (props) => {


  //Register Variable
  const [emailR, setemailR] = useState("");
  const [passwordR, setpasswordR] = useState("");

  const [name, setname] = useState("");
  const [address, setaddress] = useState("");
  const [phone, setphone] = useState("");
  const [role, setrole] = useState("company");
  const [photo, setphoto] = useState("");

  const onFileUpload = (e) => {
    const formData = new FormData();

    let file = e.target.files[0];

    formData.append("image", file);

    setphoto(file.name);

    axios.post("http://localhost:5000/api/upload", formData);

    console.log("photo", photo);
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
        notification.success({
          message: "Done company created " + data.data.name,
        });
        props.onCancel()
      })
      .catch(() => {
        notification.error({ message: "check Data" });
      });
  };
  return (
    <Modal
      visible={props.visible}
      onCancel={props.onCancel}
      width="50%"
      footer={null}
    >
      <form onSubmit={submithandlerR}>
        <h2 className="title">Add Company</h2>
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
      </form>
    </Modal>
  );
};

export default RegisterModal;
