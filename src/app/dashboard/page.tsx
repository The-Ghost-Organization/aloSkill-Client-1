import LogoutButton from "@/components/logOut.tsx";
import LogoutAllDevicesButton from "@/components/logoutAll.tsx";


const dashboard = ({user }) => {
  return (
    <div className='flex flex-col items-center justify-center h-screen '>
      <h3>hello I am Dashboard page</h3>
      <LogoutButton />
     <LogoutAllDevicesButton email={user?.email}/>
    </div>
  );
};

export default dashboard;
