import React, { useEffect, useState } from "react";
import "../LoginPage/LoginSignUp.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { notification } from "antd";



function RestPassword() {

    const [password, setpassword] = useState("");
    const [newpassword, setnewpassword] = useState("");

    let { id,token} = useParams();

    const  navig = useNavigate(); 

  const resetpassword =async(e)=>{

    e.preventDefault();

    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    await axios
      .put(
        "http://localhost:5000/api/users/updatepass/"+id,
        {password:newpassword , oldpass:password ,token},
        config
      )
      .then((data) => {
        notification.success({ message: "Done" });
        navig('/')
      })
      .catch((error) => {
        console.log(error)
        notification.error({ message: "check your Old Password" });
      });

  }


  return (
    <>

      <div className="card">
        <form onSubmit={resetpassword}>
          <h2 className="title_Update" >Reset Your Password </h2>

          <div className="input-field">
            <i className="fas fa-user" />
            <input
              type="password"
              placeholder="OldPassword"
              value={password}
              onChange={(e) => {setpassword(e.target.value) }}
              required
            />
          </div>
   
            <div className="input-field">
            <i className="fas fa-user" />
            <input
              type="password"
              placeholder="NewPassword"
              value={newpassword}
              onChange={(e) => {setnewpassword(e.target.value) }}
              required
            />
          </div>
  
       


          <input type="submit" className="btn_log" defaultValue="Sign up" />
        </form>
      </div>
    </>
  );
}

export default RestPassword;
