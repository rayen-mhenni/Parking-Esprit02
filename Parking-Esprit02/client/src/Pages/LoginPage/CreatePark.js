import { Button, Input, Modal, notification, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import emailjs from "@emailjs/browser";
import GoogleLogin from "react-google-login";

const CreatePark = (props) => {
  const [name, setname] = useState("");
  const [adress, setadress] = useState("");
  const [description, setdescription] = useState("");
  const [totalParkingLots, settotalParkingLots] = useState(0);
  const [totalFreeParkingLots, settotalFreeParkingLots] = useState(0);
  const [latitude, setlatitude] = useState(0);
  const [longitude, setlongitude] = useState(0);
  const [ParkingFees, setParkingFees] = useState(0);
  const user = JSON.parse(localStorage.getItem("userInfo"));

  const onadd = async () => {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    await axios
    .post(
      "http://localhost:5000/api/parkings/create",
      {
        Name : name,
        Adress :adress ,
        description :description ,
        totalParkingLots :totalParkingLots ,
        totalFreeParkingLots :totalFreeParkingLots ,
        latitude :latitude ,
        longitude :longitude ,
        ParkingFees :ParkingFees,
        companyId : user._id,
        Status:"Libre"
      },
      config
    )
    .then((data) => {
      notification.success({
        message: "Done parking created " + data.data.name,
      });
      props.onCancel()
    })
    .catch(() => {
      notification.error({ message: "check Data" });
    });
    props.onCancel()
  };
  return (
    <Modal
      visible={props.visible}
      onCancel={props.onCancel}
      width="20%"
      footer={<Button type="primary" onClick={()=>onadd()}>save</Button>}
      title="Create Parking"
      destroyOnClose
    >
      <Row>
        Name: <Input onChange={(val) => setname(val.target.value)} />
      </Row>
      <Row>
        adress: <Input onChange={(val) => setadress(val.target.value)} />
      </Row>
      <Row>
        description: <Input onChange={(val) => setdescription(val.target.value)} />
      </Row>
      <Row>
        totalParkingLots: <Input onChange={(val) => settotalParkingLots(val.target.value)} />
      </Row>
      <Row>
        totalFreeParkingLots:{" "}
        <Input onChange={(val) => settotalFreeParkingLots(val.target.value)} />
      </Row>
      <Row>
        latitude: <Input onChange={(val) => setlatitude(val.target.value)} />
      </Row>
      <Row>
        longitude: <Input onChange={(val) => setlongitude(val.target.value)} />
      </Row>
      <Row>
        ParkingFees: <Input onChange={(val) => setParkingFees(val.target.value)} />
      </Row>
    </Modal>
  );
};

export default CreatePark;
