import { useEffect } from "react";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../layout/DefaultLayout";
import axios from "axios";

const Maintenance = () => {

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}maintenance/fetch-all-maintenance`).then(res => {

    }).catch(err => {
    })
  }, [])
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Maintenances" />

      <div className="flex flex-col gap-10">
        <h1>Content has to go here....</h1>
      </div>
    </DefaultLayout>
  );
};

export default Maintenance;
