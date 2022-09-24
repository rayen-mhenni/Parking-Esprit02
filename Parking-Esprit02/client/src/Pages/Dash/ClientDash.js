import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Col,
  InputNumber,
  Layout,
  Menu,
  message,
  Popconfirm,
  Progress,
  Row,
  Select,
  Space,
  Statistic,
  Table,
  Tag,
  Dropdown,
  DatePicker,
} from "antd";
import moment from "moment";
import {
  DollarOutlined,
  UserOutlined,
  LogoutOutlined,
  CarOutlined,
  EditOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  ContainerOutlined,
  HolderOutlined,
  ScheduleOutlined
} from "@ant-design/icons";

import axios from "axios";
import _ from "lodash";
import { useNavigate } from "react-router";

import { Image, notification } from "antd";
import defaultImage from "../images/images.png";
import park from "../images/parking.png";

const { Header, Footer, Sider, Content } = Layout;

function ClientDash() {
  const navig = useNavigate();

  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [data, setdata] = useState([]);

  const [reclamation, setreclamation] = useState([]);
  const [voitures, setvoitures] = useState([]);

  const [reserved, setreserved] = useState([]);
  const [listeParking, setListeParking] = useState([]);

  const [lv, setlv] = useState(true);
  const [lr, setlr] = useState(false);
  const [lf, setlf] = useState(false);
  const [cars, setcars] = useState(false);

  const [prnumber, setprnumber] = useState(0);
  const [parkId, setparkId] = useState(0);
  const [reserv, setreserv] = useState(0);
  const [date, setDate] = useState("");
  const [h, setH] = useState(0);

  const [totalToken, settotalToken] = useState(5);

  const LogOut = () => {
    localStorage.removeItem("userInfo");
    navig("/");
  };
  const text = "Take this place?";
  function confirm(e) {
    
    if (totalToken > 0) {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };
      axios
        .post(
          "http://localhost:5000/api/parking/reserve",
          {
            userId: user._id,
            position: e,
            parkId: parkId,
            date: date,
            heure: h,
          },
          config
        )
        .then((response) => {
          message.success(e + " reserved");
        });

      let newarray = [];

      newarray = e > 40 ? right : left;

      newarray.forEach((ele) => {
        if (ele.key === e) ele.color = "red";
      });
      const array = newarray.slice();
      e > 40 ? setright(array) : setleft(array);

      setreserv(reserv+1)
    

    } else {
      let newarray = [];

      newarray = e > 40 ? right : left;

      newarray.forEach((ele) => {
        if (ele.key === e) ele.color = "orange";
      });
      const array = newarray.slice();
      e > 40 ? setright(array) : setleft(array);
    }
  }

  function clear(e) {
    const idOfcasetodelete = reserved.find((ele) => ele.position === e)._id;
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    axios
      .delete(`http://localhost:5000/api/parking/delete/${idOfcasetodelete}`)
      .then((response) => {
        message.success(e + " clear" + idOfcasetodelete);
        settotalToken(totalToken + 1);
        axios
          .get(`http://localhost:5000/api/parking/reserved/${user._id}`, config)
          .then((response) => {
            console.log("reserved data", response.data);
            setreserved(response.data);
            response.data.forEach((el) => {
              let newarray = [];

              newarray = el.position > parseInt(prnumber / 2) ? right : left;

              newarray.forEach((ele) => {
                if (ele.key === el.position) ele.color = "red";
              });
              const array = newarray.slice();
              el.position > parseInt(prnumber / 2)
                ? setright(array)
                : setleft(array);
            });
          });
      });
  }
const handlereserv =()=>{
  settotalToken(totalToken - 1);
  setreserv(reserv-1)
}
  const push = () => {
    navig("/profile");
  };

  const home = () => {
    navig("/client/dash/" + user._id);
  };

  useEffect(() => {
    if (!user) {
      navig("/");
    } else {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };

      axios
        .post(
          "http://localhost:5000/api/factures/findAll",
          { email: user.email },
          config
        )
        .then((response) => {
          console.log("data", response.data);
          setdata(response.data);
        });

      axios
        .get("http://localhost:5000/api/parkings", config)
        .then((response) => {
          console.log("data", response.data);
          setListeParking(response.data);
        });

      axios
        .post(
          "http://localhost:5000/api/reclamation/getbyEmail",
          { email: user.email },
          config
        )
        .then((response) => {
          console.log(response.data);
          setreclamation(response.data);
        });

      axios
        .get("http://localhost:5000/api/car/" + user._id, config)
        .then((response) => {
          setvoitures(response.data.car);
        });

      axios
        .get(
          `http://localhost:5000/api/parking/reserved/${user._id}/${parkId}`,
          config
        )
        .then((response) => {
          console.log("reserved data", response.data);
          setreserved(response.data);
          response.data.forEach((el) => {
            let newarray = [];

            newarray = el.position > parseInt(prnumber / 2) ? right : left;

            newarray.forEach((ele) => {
              if (ele.key === el.position) ele.color = "red";
            });
            const array = newarray.slice();
            el.position > parseInt(prnumber / 2)
              ? setright(array)
              : setleft(array);
          });
        });
    }
  }, [parkId]);

  const [left, setleft] = useState(
    _.times(0, function (e) {
      return { color: "green", key: e };
    })
  );

  const [right, setright] = useState(
    _.times(0, function (e) {
      return { color: "green", key: 1 };
    })
  );

  const columns = [
    {
      title: "email",
      dataIndex: "email",
      key: "email",
      render: (text) => <a>{text}</a>,
    },

    {
      title: "address",
      dataIndex: "address",
      key: "address",
    },

    {
      title: "prix",
      dataIndex: "prix",
      key: "prix",
    },
  ];

  const carccolumns = [
    {
      title: "number",
      dataIndex: "number",
      key: "number",
      render: (text) => <a>{text}</a>,
    },

    {
      title: "type",
      dataIndex: "type",
      key: "type",
    },

    {
      title: "description",
      dataIndex: "description",
      key: "description",
    },
  ];

  const Reccolumns = [
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
      render: (val, rec) => {
        if (val === "WAITED")
          return (
            <Tag color="orange" key={val}>
              {val}
            </Tag>
          );
        else if (val === "RESERVED")
          return (
            <Tag color="volcano" key={val}>
              {val}
            </Tag>
          );
        else
          return (
            <Tag color="green" key={val}>
              {val}
            </Tag>
          );
      },
      filters: [
        {
          text: "Waited",
          value: "WAITED",
        },
        {
          text: "Reservée",
          value: "RESERVED",
        },
        {
          text: "Canceled",
          value: "CANCELED",
        },
      ],
      onFilter: (value, record) => record?.Status?.indexOf(value) === 0,
    },
  ];

  const menu = (
    <Menu>
      <Menu.Item key="settings" onClick={push}>
        <EditOutlined />
        &nbsp; Edit profile
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={LogOut}>
        <LogoutOutlined />
        &nbsp; Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <div className="logo" />
      <Sider style={{ backgroundColor: "#6F89E4" }} width="15vw">
        <div style={{ height: "40vh" }}>
          <img
            src={park}
            style={{
              width: "50%",
              position: "relative",
              top: "10vh",
              left: "3vw",
            }}
          ></img>
        </div>
        <div style={{ height: "60vh" }}>
          <Menu
            style={{ backgroundColor: "#8eb5f0" }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
          >
            <Menu.Item
              onClick={() => {
                setlf(false);
                setlv(false);
                setlr(true);
                setcars(false);
              }}
            >
              <OrderedListOutlined />
              &nbsp; List Des Reclamation
            </Menu.Item>

            <Menu.Item
              onClick={() => {
                setlf(false);
                setlv(true);
                setlr(false);
                setcars(false);
              }}
            >
              <UnorderedListOutlined />
              &nbsp; List Des Voitures
            </Menu.Item>

            <Menu.Item
              onClick={() => {
                setlf(true);
                setlv(false);
                setlr(false);
                setcars(false);
              }}
            >
              <ContainerOutlined />
              &nbsp; List Des Factures
            </Menu.Item>

            <Menu.Item
              onClick={() => {
                setlf(false);
                setlv(false);
                setlr(false);
                setcars(true);
              }}
            >
              <HolderOutlined />
              &nbsp; List Des Parkings
            </Menu.Item>
          </Menu>
        </div>
      </Sider>

      <Card style={{ width: "100%" }}>
        <Layout style={{ backgroundColor: "white" }}>
          <Header style={{ backgroundColor: "white" }}>
            <div style={{ right: "3vw", position: "absolute" }}>
              {user?.name}
              &nbsp;&nbsp;
              <Dropdown overlay={menu} placement="bottom">
                <Avatar size="default" icon={<UserOutlined />} />
              </Dropdown>
            </div>
          </Header>

          <Content style={{ marginTop: "1vh" }}>
            <Space
              direction="vertical"
              size="middle"
              style={{ display: "flex" }}
            >
              <Row>
                <Col span={11}>
                  <Card hoverable>
                    <Statistic
                      title="Total Payed"
                      value={totalToken-reserved.length}
                      precision={2}
                      valueStyle={{ color: "#3f8600" }}
                      prefix={<DollarOutlined />}
                      // suffix="$"
                    />
                    {/* get from database total payed from this user */}
                  </Card>
                </Col>
                <Col span={1} />
                <Col span={12}>
                  <Card hoverable>
                    <Statistic
                      title="Number of places reserved"
                      value={reserved.length}
                      precision={0}
                      valueStyle={{ color: "#cf1322" }}
                      prefix={<CarOutlined />}
                      suffix=""
                    />
                    {reserv>0&&
                    <Button type="dashed" icon={<ScheduleOutlined />} onClick={handlereserv}>
                        Confirm
                    </Button>}
                  </Card>
                </Col>
              </Row>

              {lf && (
                <Card hoverable>
                  <b>List des factures </b>

                  <Table
                    pagination={{
                      simple: true,
                      pageSize: 5,
                      hideOnSinglePage: true,
                      responsive: true,
                    }}
                    size="small"
                    columns={columns}
                    dataSource={data}
                  />
                </Card>
              )}
              {lr && (
                <Card hoverable>
                  <b>List des reclamation </b>
                  <Table
                    pagination={{
                      simple: true,
                      pageSize: 5,
                      hideOnSinglePage: true,
                      responsive: true,
                    }}
                    size="small"
                    columns={Reccolumns}
                    dataSource={reclamation}
                  />
                </Card>
              )}
              {lv && (
                <Card hoverable>
                  <b>List des voitures </b>
                  <Table
                    pagination={{
                      simple: true,
                      pageSize: 5,
                      hideOnSinglePage: true,
                      responsive: true,
                    }}
                    size="small"
                    columns={carccolumns}
                    dataSource={voitures}
                  />
                </Card>
              )}
              {cars && (
                <Card
                  hoverable
                  style={{ width: "100%" }}
                  extra={
                    <Select
                      style={{ width: "200px" }}
                      placeholder="select parking please"
                      onSelect={(v, k) => {
                        setparkId(k.key);
                        setprnumber(v);

                        setleft(
                          _.times(parseInt(v / 2), function (e) {
                            return { color: "green", key: e };
                          })
                        );

                        setright(
                          _.times(parseInt(v / 2), function (e) {
                            return { color: "green", key: e + parseInt(v / 2) };
                          })
                        );
                      }}
                    >
                      {listeParking.map((park) => (
                        <Select.Option
                          value={park.totalFreeParkingLots}
                          key={park._id}
                        >
                          {park.Name}
                        </Select.Option>
                      ))}
                    </Select>
                  }
                >
                  <div
                    className="demo"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <div style={{ width: 200, float: "left", marginLeft: 40 }}>
                      {left.map((e) => (
                        <Popconfirm
                          placement="top"
                          title={
                            <Space size="small" direction="vertical">
                              {text}
                              <div> Number: {e.key}</div>
                              <div>
                                {" "}
                                date:{" "}
                                <DatePicker
                                  onChange={(val) =>
                                    setDate(moment(val).format("YYYY-MM-DD"))
                                  }
                                  style={{ zIndex: 9 }}
                                />
                              </div>
                              <div>
                                {" "}
                                Heure:{" "}
                                <InputNumber onChange={(val) => setH(val)}  min={1} max={24}/>
                              </div>
                            </Space>
                          }
                          onConfirm={() => confirm(e.key)}
                          onCancel={() => clear(e.key)}
                          okText="Reservez"
                          cancelText="Clear"
                          disabled={totalToken-reserved.length<=0}
                          zIndex={5}
                        >
                          <Button
                            icon={<CarOutlined style={{ color: e.color }} />}
                          >
                            N° {e.key < 10 ? "0" + e.key : e.key}
                          </Button>
                        </Popconfirm>
                      ))}
                    </div>

                    <div style={{ width: 200, marginLeft: 304 }}>
                      {right.map((e) => (
                        <Popconfirm
                          placement="top"
                          title={
                            <Space size="small" direction="vertical">
                              {text}
                              <div> Number: {e.key}</div>
                              <div>
                                {" "}
                                date:{" "}
                                <DatePicker
                                  onChange={(val) =>
                                    setDate(moment(val).format("YYYY-MM-DD"))
                                  }
                                  style={{ zIndex: 9 }}
                                />
                              </div>
                              <div>
                                {" "}
                                Heure:{" "}
                                <InputNumber onChange={(val) => setH(val)} min={1} max={24} />
                              </div>
                            </Space>
                          }
                          onConfirm={() => confirm(e.key)}
                          onCancel={() => clear(e.key)}
                          disabled={totalToken-reserved.length<=0}
                          okText="Reservez"
                          cancelText="Clear"
                          zIndex={5}
                        >
                          <Button
                            icon={<CarOutlined style={{ color: e.color }} />}
                          >
                            N° {e.key < 10 ? "0" + e.key : e.key}
                          </Button>
                        </Popconfirm>
                      ))}
                    </div>
                  </div>
                </Card>
              )}
            </Space>
          </Content>
        </Layout>
      </Card>
    </Layout>
  );
}

export default ClientDash;
