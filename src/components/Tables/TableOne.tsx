import React, { useEffect } from 'react';
import { Button, Pagination, Skeleton, Table, Typography } from 'antd';
import Register from './Register';
import { fetchAllUsers } from '../../store/admin/actions/admin.actions';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const TableOne = () => {
  const dispatch = useAppDispatch();
  const { allUsers, isLoading } = useAppSelector((state) => state.admin);

  const columns = [
    {
      title: 'First Name',
      dataIndex: ['profile', 'firstName'],
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: ['profile', 'lastName'],
      key: 'lastName',
    },
    {
      title: 'Email Address',
      dataIndex: ['profile', 'email'],
      key: 'email',
    },
    {
      title: 'Cell Number',
      dataIndex: ['profile', 'cellNumber'],
      key: 'cellNumber',
    },
    {
      title: 'Action',
      key: 'action',
      render: () => <Button type="primary">View</Button>,
    },
  ];

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);

  const dataSource = allUsers
    ? allUsers.map((user: any) => ({
        key: user._id,
        ...user,
      }))
    : [];

  return (
    <div className="bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4 mt-10">
      <Skeleton loading={isLoading}>
        <div className="flex justify-between items-center mb-10">
          <Typography className="text-2xl">User's Information</Typography>
          <Register />
        </div>
      </Skeleton>
      <Skeleton loading={isLoading}>
        <Table columns={columns} dataSource={dataSource} pagination={false} />
        <Pagination className="text-right mt-6" defaultCurrent={1} total={50} />
      </Skeleton>
    </div>
  );
};

export default TableOne;
