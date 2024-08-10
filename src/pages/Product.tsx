import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import { Button, Image, Skeleton, Table, Typography } from 'antd';
import { useGetProductsQuery } from '../Services/product';
import CustomModal from '../components/Modal';
import { useState } from 'react';
import moment from 'moment';
import React from 'react';

const Product = () => {
  const columns = [
    {
      title: 'Date Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      responsive: ['sm'],
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      responsive: ['sm'],
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <Button
          type="primary"
          onClick={() => {
            setProduct(record);
            setModalOpen(true);
          }}
        >
          View
        </Button>
      ),
    },
  ];

  const { isLoading, data } = useGetProductsQuery();
  const [openModal, setModalOpen] = useState<boolean>(false);
  const [product, setProduct] = useState(null);

  console.log("data product: ", data)

  const dataSource =
    data && data.length > 0
      ? data.map((product: any) => ({
          key: product._id,
          ...product,
          createdAt: moment(product.createdAt).format('DD MMMM YYYY'),
        }))
      : [];

  const modal = () => {
    return (
      <CustomModal
        title="Product"
        isOpen={openModal}
        content={
          <div>
            <p className="flex">
              <strong className='w-22 block'>Name: </strong>
              {product?.name}
            </p>
            <p className="mt-3 flex">
              <strong className='w-22 block'>Created At:</strong>{' '}
              {moment(product?.createdAt).format('DD MMMM YYYY')}
            </p>
            <p className="mt-3 flex">
              <strong className='w-22 block'>location Id: </strong>
              {product?.locationId}
            </p>
            <p className="mt-3 flex">
              <strong className='w-22 block shrink-0'>Description: </strong>
              <p>{product?.description}</p>
            </p>
            <div className="mt-3">
              {product?.qr && (
                <div className="flex">
                  <p className='w-22 block'><strong>QR Code: </strong></p>
                  <Image
                    src={product?.qr}
                    height={120}
                    className="bg-slate-400 rounded-sm -ml-2"
                  />
                </div>
              )}
            </div>
          </div>
        }
        buttonClose={{
          label: 'Cancel',
          action: () => {
            setModalOpen(false);
          },
        }}
      />
    );
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Products" />
      {modal()}
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
                  Products Information
                </Typography>

                <Button
                  className="border-2 border-primary-color mr-4 text-primary-color"
                  onClick={() => window.open("https://pwy-consulting-backend.vercel.app/generate-items-report")}
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

export default Product;
