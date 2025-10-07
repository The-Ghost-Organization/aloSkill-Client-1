/* eslint-disable react-hooks/rules-of-hooks */
import LogoutButton from "@/components/logOut.tsx";
import LogoutAllDevicesButton from "@/components/logoutAll.tsx";
import { useGetUser } from "@/lib/auth/getUser.ts";

const Dashboard = async () => {
  const user = await useGetUser();
  console.log(user, "i am session in dashboard page");
  const { email = "mail@mail.com" } = user || {};
  return (
    <div className='flex flex-col items-center justify-center h-screen '>
      <h3>hello I am Dashboard page</h3>
      <LogoutButton />
      <LogoutAllDevicesButton email={email} />
    </div>
  );
};

export default Dashboard;
