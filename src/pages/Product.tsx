import { useEffect } from "react";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../layout/DefaultLayout";
import axios from "axios";

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
        <h1>Content has to go here....</h1>
      </div>
    </DefaultLayout>
  );
};

export default Product;
