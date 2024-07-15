import React from 'react';
import { Button, Skeleton, Table, Tag, Typography } from 'antd';
import Register from './Register';
import { useGetUsersQuery } from '../../Services/user';
import { Link } from 'react-router-dom';

const TableOne = () => {
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
      title: 'Roles',
      key: 'roles',
      dataIndex: 'roles',
      render: (_, { roles }: any) => (
        <>
          {roles?.map((role: string) => {
            // let color = tag.length > 5 ? 'geekblue' : 'green';
            let color = '';
            switch (role.toLowerCase()) {
              case 'admin':
                color = '#2db7f5';
                break;
              case 'manager':
                color = '#f79421';
                break;
              case 'user':
                color = '#1B437A';
                break;
              default:
                color = '';
            }

            return (
              <Tag key={role} color={color} className="capitalize">
                {role}
              </Tag>
            );
          })}
        </>
      ),
    },
  ];

  const { data, isLoading } = useGetUsersQuery();

  const dataSource =
    data && data.length > 0
      ? data.map((user: any) => ({
          key: user._id,
          ...user,
          roles: user.profile.roles,
        }))
      : [];

  const userLink =
    'https://pwy-consulting-backend.vercel.app/generate-users-report';

  return (
    <div className="bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4">
      {isLoading ? (
        <Skeleton.Input
          active={true}
          size={'large'}
          block={true}
          style={{ height: '400px' }}
        />
      ) : (
        <React.Fragment>
          <div className="flex justify-between items-center mb-10">
            <Typography className="text-2xl">User's Information</Typography>
            <div>
              <Button
                className="border-2 border-primary-color mr-4 text-primary-color"
                onClick={() => window.open(userLink)}
              >
                Download
              </Button>
              <Register />
            </div>
          </div>
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            size="middle"
            scroll={{ y: 400 }}
          />
        </React.Fragment>
      )}
    </div>
  );
};

export default TableOne;
