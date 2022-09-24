import React, { useEffect, useState } from "react";
import defaultImage from "../images/images.png";
import park from "../images/parking.png";

import {
  Avatar,
  Button,
  Card,
  Col,
  InputNumber,
  Dropdown,
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
  Transfer,
} from "antd";

import {
  DollarOutlined,
  UserOutlined,
  LogoutOutlined,
  CarOutlined,
  UploadOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  ContainerOutlined,
  HolderOutlined,
  EditOutlined,
} from "@ant-design/icons";

import axios from "axios";
import _ from "lodash";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import RegisterModal from "../LoginPage/RegisterModal";
import CreatePark from "../LoginPage/CreatePark";

const { Header, Footer, Sider, Content } = Layout;
const { Option } = Select;

function AdminDash() {
  const navig = useNavigate();

  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [data, setdata] = useState([]);
  const [visible, setVisible] = useState(false);
  const [VisiblePar, setVisiblePar] = useState(false);
  const [parkings, setparkings] = useState([]);

  let { id } = useParams();

  const [client, setclient] = useState([]);

  const [left, setleft] = useState(
    _.times(40, function (e) {
      return { color: "green", key: e };
    })
  );
  const [right, setright] = useState(
    _.times(40, function (e) {
      return { color: "green", key: 41 + e };
    })
  );

  const LogOut = () => {
    localStorage.removeItem("userInfo");
    navig("/");
  };

  const push = () => {
    navig("/profile");
  };

  const goto = (Comid) => {
    navig("/company/dash/" + Comid);
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
        .get(`http://localhost:5000/api/users/findcompany`, config)
        .then((response) => {
          setclient(response.data);
          console.log("user list ", response.data);
        });
        axios
        .get(`http://localhost:5000/api/parkings`, config)
        .then((response) => {
          setparkings(response.data);
          console.log("parkings", parkings);
        });
    }
  }, [visible,VisiblePar]);

  const columns = [
    {
      title: "email",
      dataIndex: "email",
      key: "email",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/company/dash/${record._id}`}>{record.email}</Link>
        </Space>
      ),
    },

    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "address",
      dataIndex: "address",
      key: "address",
    },

    {
      title: "phone",
      dataIndex: "phone",
      key: "phone",
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
  const [lpa, setlpa] = useState(false);
  const [cl, setcl] = useState(true);

  const Parccolumns = [
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
    },

    {
      title: "Adress",
      dataIndex: "Adress",
      key: "Adress",
    },

    {
      title: "description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "idParking",
      dataIndex: "idParking",
      key: "idParking",
    },
    {
      title: "idPhoto",
      dataIndex: "idPhoto",
      key: "idPhoto",
    },
    {
      title: "totalParkingLots",
      dataIndex: "totalParkingLots",
      key: "totalParkingLots",
    },
    {
      title: "totalFreeParkingLots",
      dataIndex: "totalFreeParkingLots",
      key: "totalFreeParkingLots",
    },
    {
      title: "latitude",
      dataIndex: "latitude",
      key: "latitude",
    },
    {
      title: "longitude",
      dataIndex: "longitude",
      key: "longitude",
    },
    {
      title: "ParkingFees",
      dataIndex: "ParkingFees",
      key: "ParkingFees",
    },
    {
      title: "Status",
      key: "Status",
      dataIndex: "Status",
      render: (val, rec) => {
        if (val === "LIBRE")
          return (
            <Tag color="green" key={val}>
              {val}
            </Tag>
          );
        else
          return (
            <Tag color="volcano" key={val}>
              {val}
            </Tag>
          );
      },
      filters: [
        {
          text: "Libre",
          value: "LIBRE",
        },
        {
          text: "Reservée",
          value: "RESERVE",
        },
      ],
      onFilter: (value, record) => record?.Status?.indexOf(value) === 0,
    },
  ];

  return (
    <>
      <Layout>
        <div className="logo" />
        <Sider style={{ backgroundColor: "#6F89E4" }} width="15vw">
          <div style={{ height: "100vh" }}>
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
                    setlpa(false);
                    setcl(true);
                  }}
                >
                  <OrderedListOutlined />
                  &nbsp; List Des Company
                </Menu.Item>
                <Menu.Item
                  onClick={() => {
                    setlpa(true);
                    setcl(false);
                  }}
                >
                  <OrderedListOutlined />
                  &nbsp; List Des Parkings
                </Menu.Item>
              </Menu>
            </div>
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

            <Content style={{}}>
              <Space
                direction="vertical"
                size="middle"
                style={{ display: "flex" }}
              >
                <Row> </Row>

                {cl && (
                  <Card
                    hoverable
                    extra={
                      <Row>
                        <Col span={1}></Col>
                        <Col span={4}>
                          <Button
                            type="primary"
                            onClick={() => setVisible(true)}
                          >
                            Add Company
                          </Button>
                        </Col>
                      </Row>
                    }
                  >
                    {" "}
                    <b>Company List </b>
                    <Table
                      pagination={{
                        simple: true,
                        pageSize: 15,
                        hideOnSinglePage: true,
                        responsive: true,
                      }}
                      size="small"
                      columns={columns}
                      dataSource={client}
                    />
                  </Card>
                )}
                {lpa && (
                  <Card
                    hoverable
                    extra={
                      <Row>
                        <Col span={1}></Col>
                        <Col span={4}>
                          <Button
                            type="primary"
                            onClick={() => setVisiblePar(true)}
                          >
                            Add Parking
                          </Button>
                        </Col>
                      </Row>
                    }
                  >
                    <b>List des Parkings </b>
                    <Table
                      pagination={{
                        simple: true,
                        pageSize: 10,
                        hideOnSinglePage: true,
                        responsive: true,
                      }}
                      size="large"
                      columns={Parccolumns}
                      dataSource={parkings}
                    />
                  </Card>
                )}
              </Space>
            </Content>
          </Layout>
        </Card>
      </Layout>
      <RegisterModal visible={visible} onCancel={() => setVisible(false)} />
      <CreatePark visible={VisiblePar} onCancel={() => setVisiblePar(false)} />
    </>
  );
}

export default AdminDash;
