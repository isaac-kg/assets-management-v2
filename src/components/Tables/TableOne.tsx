import React, { useEffect } from "react";
import { Button, Pagination, Table, Typography } from "antd";
import Register from "./Register";
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllUsers } from "../../store/admin/actions/admin.actions";

const TableOne = () => {
  const dispatch = useDispatch();
  const { allUsers } = useSelector((state) => state.admin);

  const columns = [
    {
      title: "First Name",
      dataIndex: ['profile', "firstName"],
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: ['profile', "lastName"],
      key: "lastName",
    },
    {
      title: "Email Address",
      dataIndex: ['profile', "email"],
      key: "email",
    },
    {
      title: "Cell Number",
      dataIndex: ['profile', "cellNumber"],
      key: "cellNumber",
    },
    {
      title: "Action",
      key: "action",
      render: () => <Button type="primary">View</Button>,
    },
  ];

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const dataSource = allUsers ? allUsers.map(user => ({
    key: user._id,
    ...user
  })) : [];

// TODO display roles
  return (
    <div className="bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4 mt-10">
      <div className="flex justify-between items-center mb-10">
        <Typography className="text-2xl">Users</Typography>
        <Register />
      </div>
      <Table columns={columns} dataSource={dataSource} pagination={false} />
      <Pagination className="text-right mt-6" defaultCurrent={1} total={50} />
    </div>
  );
};

export default TableOne;
