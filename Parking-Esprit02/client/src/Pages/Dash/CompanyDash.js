import React, { useEffect, useMemo, useState } from "react";
import defaultImage from "../images/images.png";
import park from "../images/parking.png";
import {
  Avatar,
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Layout,
  Menu,
  message,
  Popconfirm,
  Progress,
  Image,
  Row,
  Select,
  Space,
  Statistic,
  Table,
  Tag,
  Typography,
  Transfer,
  DatePicker,
  Dropdown,
  notification,
  Upload,
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
  PlusOutlined,
} from "@ant-design/icons";

import axios from "axios";
import _ from "lodash";
import { useNavigate, useParams } from "react-router";

const { Header, Footer, Sider, Content } = Layout;
const { Option } = Select;
const { RangePicker } = DatePicker;

function CompanyDash() {
  const navig = useNavigate();

  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [parkings, setparkings] = useState([]);
  const [datenow, setdatenow] = useState("");

  const [lc, setlc] = useState(true);
  const [lpr, setlpr] = useState(false);
  const [lpa, setlpa] = useState(false);
  const [lp, setlp] = useState(false);

  let { id } = useParams();

  const [client, setclient] = useState([]);
  const [Photo, setPhoto] = useState("");

  const handleAct = async (record, Status) => {
    await axios
      .put(`http://localhost:5000/api/parkings/${record._id}`, {
        Status: Status,
      })
      .then((response) => {
        notification.success({ message: Status });
      })
      .catch(() => {
        notification.success({ message: Status });
      });
  };

  const LogOut = () => {
    localStorage.removeItem("userInfo");
    navig("/");
  };

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
        .get(`http://localhost:5000/api/users/finduser`, config)
        .then((response) => {
          setclient(response.data);
        });

      axios
        .get(`http://localhost:5000/api/parkings/${id}`, config)
        .then((response) => {
          setparkings(response.data);
          console.log("parkings", parkings);
        });
    }

    axios.get(`http://localhost:5000/api/pub/by/${id}`).then((response) => {
      setDatas(response.data.pub);
    });
  }, []);

  const profilt = [
    { total: "55K", date: datenow.slice(0, 15), parking: "parking 1" },
    { total: "77K", date: datenow.slice(0, 15), parking: "parking 2" },
    { total: "78K", date: datenow.slice(0, 15), parking: "parking 3" },
    { total: "79K", date: datenow.slice(0, 15), parking: "parking 4" },
    { total: "150K", date: datenow.slice(0, 15), parking: "parking 6" },
    { total: "10K", date: datenow.slice(0, 15), parking: "parking 8" },
    { total: "25K", date: datenow.slice(0, 15), parking: "parking 9" },
  ];

  const columns = [
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
      title: "phone",
      dataIndex: "phone",
      key: "phone",
    },
  ];

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
    {
      title: "Action",
      key: "action",
      render: (text, record, i) =>
        record.Status === "LIBRE" ? (
          <Button size="small" onClick={() => handleAct(record, "RESERVE")}>
            Reservée
          </Button>
        ) : (
          <Button size="small" onClick={() => handleAct(record, "LIBRE")}>
            Liberé
          </Button>
        ),
    },
  ];

  const Porccolumns = [
    {
      title: "total",
      dataIndex: "total",
      key: "total",
    },

    {
      title: "date",
      dataIndex: "date",
      key: "date",
    },

    {
      title: "parking",
      dataIndex: "parking",
      key: "parking",
    },
  ];

  const [form] = Form.useForm();
  const [datas, setDatas] = useState([]);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => record._id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      brand: "",
      dimension: "",
      price: "",
      startdate: "",
      enddate: "",
      taille: "",
      reservation: "",
      place: "",
      Photo: "",
      ...record,
    });
    setEditingKey(record._id);
  };

  const deleteval = (record) => {
    const data = datas.filter((elem) => elem._id !== record._id);

    axios
      .delete(`http://localhost:5000/api/pub/${record._id}`)
      .then((response) => {
        notification.success({ message: "deleted" });
      });
    setDatas(data);
    setEditingKey("");
  };

  const cancel = () => {
    setEditingKey("");
  };

  // ------------- HERE : add w Edit tekhou ken ids -------------
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...datas];
      const index = newData.findIndex((item) => key === item._id);

      const config = {
        headers: {
          "content-type": "application/json",
        },
      };
      console.log("testtt", index, newData[index].new, key, row);
      if (index > -1 && (newData[index].new === false || !newData[index].new)) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setDatas(newData);
        setEditingKey("");

        axios
          .put(
            `http://localhost:5000/api/pub/${item._id}`,
            {
              brand: row.brand,
              dimension: row.dimension,
              enddate: row.enddate,
              startdate: row.startdate,
              taille: row.taille,
              reservation: row.reservation,
              place: row.place,
              Photo: Photo,
            },

            config
          )
          .then((response) => {
            notification.success({ message: "Edite done" });
          });
      } else {
        axios
          .post(
            `http://localhost:5000/api/pub`,
            {
              brand: row.brand,
              dimension: row.dimension,
              enddate: row.enddate,
              startdate: row.startdate,
              parkingid: "625edff22b5babeaf1048479",
              company_id: id,
              taille: row.taille,
              reservation: row.reservation,
              place: row.place,
              Photo: Photo,
            },

            config
          )
          .then((response) => {
            const item = newData[index];
            console.log("responseee", newData, index);
            newData.splice(index, 1, {
              ...item,
              ...row,
              new: false,
              _id: response.data.pub._id,
            });
            setDatas(newData);
            setEditingKey("");
            notification.success({ message: "Create done" });
          });
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  // ------------- HERE : add w Edit tekhou ken ids -------------

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode =
      inputType === "number" ? (
        <InputNumber />
      ) : inputType === "img" ? (
        <Upload
          onChange={async ({ file, fileList }) => {
            if (file.status !== "uploading") {
              console.log("filee", file);

              var bodyFormData = new FormData();

              bodyFormData.append("image", file.originFileObj);
                
              await axios({
                method: "post",
                url: "http://localhost:5000/api/upload",
                data: bodyFormData,
              }).then(function (response) {
                setPhoto(file.name);
                console.log("upload response", response);
                console.log("upload response datas", datas);
              });
            }
          }}
          progress={{
            strokeColor: {
              "0%": "#108ee9",
              "100%": "#87d068",
            },
            strokeWidth: 3,
            format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
          }}
        >
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      ) : (
        <Input />
      );
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const columnsPub = useMemo(() => {
    return[
    {
      title: "dimension",
      dataIndex: "dimension",
      width: "10%",
      editable: true,
    },
    {
      title: "brand",
      dataIndex: "brand",
      width: "10%",
      editable: true,
    },

    {
      title: "startdate",
      dataIndex: "startdate",
      width: "10%",
      editable: true,
    },
    {
      title: "enddate",
      dataIndex: "enddate",
      width: "10%",
      editable: true,
    },
    {
      title: "taille",
      dataIndex: "taille",
      width: "10%",
      editable: true,
    },
    {
      title: "reservation",
      dataIndex: "reservation",
      width: "10%",
      editable: true,
    },
    {
      title: "place",
      dataIndex: "place",
      width: "10%",
      editable: true,
    },
    {
      title: "Photo",
      dataIndex: "Photo",
      width: "30%",
      editable: true,
      render: (val, record, index) => {
        try{

        console.log("toto", val, record, index);

        let img = typeof val === "object" ? val.file.name : val;
        if (img !== undefined && img !== "" && img !== null) {
          try {
            return (
              <Image
                src={require("../../uploads/" + img)}
                style={{ maxWidth: "50%" }}
              />
            );
          } catch (err) {
            console.log("errr", err);
          }
        } else return null;}
        catch (err){
          console.log("errrTotal", err);

        }
      },
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record._id)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <span>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              Edit
            </Typography.Link>
            &nbsp;&nbsp;&nbsp;
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => deleteval(record)}
            >
              <Typography.Link disabled={editingKey !== ""}>
                Delete
              </Typography.Link>
            </Popconfirm>
          </span>
        );
      },
    },
  ]},[datas]);

  const mergedColumns = columnsPub.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType:
          col.dataIndex === "dimension"
            ? "number"
            : col.dataIndex === "Photo"
            ? "img"
            : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

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
                setlc(true);
                setlpa(false);
                setlpr(false);
                setlp(false);
              }}
            >
              <OrderedListOutlined />
              &nbsp; List des Client
            </Menu.Item>

            <Menu.Item
              onClick={() => {
                setlc(false);
                setlpa(true);
                setlpr(false);
                setlp(false);
              }}
            >
              <UnorderedListOutlined />
              &nbsp; List des Parkings
            </Menu.Item>

            <Menu.Item
              onClick={() => {
                setlc(false);
                setlpa(false);
                setlpr(true);
                setlp(false);
              }}
            >
              <ContainerOutlined />
              &nbsp; List des Profilt
            </Menu.Item>

            <Menu.Item
              onClick={() => {
                setlc(false);
                setlpa(false);
                setlpr(false);
                setlp(true);
              }}
            >
              <HolderOutlined />
              &nbsp; List des Publicités
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
                <Avatar size="large" icon={<UserOutlined />} />
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
              {lc && (
                <Card hoverable>
                  <b>List des Client </b>
                  <Table
                    pagination={{
                      simple: true,
                      pageSize: 10,
                      hideOnSinglePage: true,
                      responsive: true,
                    }}
                    size="large"
                    columns={columns}
                    dataSource={client}
                  />
                </Card>
              )}
              {lpa && (
                <Card hoverable>
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
              {lpr && (
                <Card hoverable>
                  <b>
                    List des Profilt :{" "}
                    <DatePicker
                      format="YYYY-MM-DD"
                      onChange={(date) => setdatenow(String(date._d))}
                    />{" "}
                  </b>
                  <Table
                    pagination={{
                      simple: true,
                      pageSize: 10,
                      hideOnSinglePage: true,
                      responsive: true,
                    }}
                    columns={Porccolumns}
                    dataSource={profilt}
                  />
                </Card>
              )}

              {lp && (
                <Card hoverable>
                  <b>List des Publicités </b>
                  <Row>
                    <Col span={22} />
                    <Col span={2}>
                      <Button
                        type="primary"
                        onClick={() => {
                          let newd = datas;
                          const newId = Math.random(
                            Math.floor(1000)
                          ).toString();
                          newd.push({
                            _id: newId,
                            new: true,
                          });
                          newd = newd.slice();
                          setDatas(newd);
                          edit({ new: true, _id: newId });
                        }}
                        shape="round"
                        icon={<PlusOutlined />}
                      >
                        Add
                      </Button>
                    </Col>
                  </Row>
                  <br />
                  <Form form={form}>
                    <div style={{ width: "100%" }}>
                      <Table
                        components={{
                          body: {
                            cell: EditableCell,
                          },
                        }}
                        bordered
                        dataSource={datas}
                        columns={mergedColumns}
                        rowKey={(record) => record._id}
                        pagination={{
                          onChange: cancel,
                        }}
                      />
                    </div>
                  </Form>
                </Card>
              )}
            </Space>
          </Content>
        </Layout>
      </Card>
    </Layout>
  );
}

export default CompanyDash;
