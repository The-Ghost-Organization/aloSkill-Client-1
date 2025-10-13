import LogoutButton from "@/components/logOut.tsx";
import LogoutAllDevicesButton from "@/components/logoutAll.tsx";
import { getUser } from "@/lib/auth/getUser.ts";

const Dashboard = async () => {
  const user = await getUser();
  const { email } = user as {email:string};
  return (
    <div className='flex flex-col items-center justify-center h-screen '>
      <h3>hello I am Dashboard page</h3>
      <LogoutButton />
      <LogoutAllDevicesButton email={email} />
    </div>
  );
};

export default Dashboard;
