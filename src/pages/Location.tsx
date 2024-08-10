import { useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import { useGetLocationsQuery } from '../Services/location';
import { Button, Skeleton, Table, Typography } from 'antd';
import React from 'react';
import moment from 'moment';

const Location = () => {
  const { isLoading, data } = useGetLocationsQuery();

  console.log('DAta: ', data);

  const columns = [
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      responsive: ['sm'],
    },
    {
      title: 'Manager',
      dataIndex: 'officeManager',
      key: 'name',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      responsive: ['sm'],
    },
  ];

  const dataSource =
    data && data.length > 0
      ? data.map((location: any) => ({
          key: location._id,
          ...location,
          createdAt: moment(location.createdAt).format('DD MMMM YYYY'),
        }))
      : [];

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Location" />
      <div className="flex flex-col gap-10">
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
                <Typography className="text-2xl">
                  Location Information
                </Typography>

                <Button
                  className="border-2 border-primary-color mr-4 text-primary-color"
                  onClick={() =>
                    window.open(
                      'https://pwy-consulting-backend.vercel.app/generate-locations-report',
                    )
                  }
                >
                  Download
                </Button>
              </div>
              <Table
                columns={columns}
                dataSource={dataSource}
                pagination={false}
                size="middle"
                scroll={{ y: 350 }}
              />{' '}
            </React.Fragment>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Location;
