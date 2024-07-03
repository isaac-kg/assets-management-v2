import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import { Button, Pagination, Table, Typography } from 'antd';
import { useGetProductsQuery } from '../Services/product';
import CustomModal from '../components/Modal';
import { useState } from 'react';

const Product = () => {
  const columns = [
    {
      title: 'Date Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
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

  const { data } = useGetProductsQuery();
  const [openModal, setModalOpen] = useState<boolean>(false);
  const [product, setProduct] = useState(null);

  const dataSource =
    data && data.length > 0
      ? data.map((product: any) => ({
          key: product._id,
          ...product,
        }))
      : [];

  const modal = () => {
    return (
      <CustomModal
        title="Product"
        isOpen={openModal}
        content={<div>
          Date Created: {product?.createdAt}
          <img src={product?.qr} className='h-29 w-29' />
        </div>}
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
        <div className="bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4 mt-10">
          <div className="flex justify-between items-center mb-10">
            <Typography className="text-2xl">Products Information</Typography>
          </div>
          <Table columns={columns} dataSource={dataSource} pagination={false} />
          <Pagination
            className="text-right mt-6"
            defaultCurrent={1}
            total={50}
          />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Product;
