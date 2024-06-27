import { useEffect } from "react";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../layout/DefaultLayout";
import axios from "axios";
import { Pagination, Table, Typography } from "antd";

const Product = () => {
  
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}items/item/fetch-items`).then(res => {
      console.log("Data: ",res)

    }).catch(err => {
      console.log("err =>", err)
    })
  }, [])


  

  
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Products" />

      <div className="flex flex-col gap-10">
      <div className="bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4 mt-10">
      <div className="flex justify-between items-center mb-10">
        <Typography className="text-2xl">Products Information</Typography>
      </div>
      <Table columns={[]} dataSource={[]} pagination={false} />
      <Pagination className="text-right mt-6" defaultCurrent={1} total={50} />
    </div>
      </div>
    </DefaultLayout>
  );
};

export default Product;
