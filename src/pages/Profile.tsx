import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../layout/DefaultLayout";

const Profile = () => {

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Profile" />

      <div className="flex flex-col gap-10">
        <h1>Content has to go here....</h1>
      </div>
    </DefaultLayout>
  );
};

export default Profile;
