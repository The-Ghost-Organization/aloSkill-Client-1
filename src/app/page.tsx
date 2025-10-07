/* eslint-disable no-console */

import { useSession } from "next-auth/react";


const HomePage = () => {
  const sessionData = useSession();
  console.log("From home page", sessionData);
  return <div>this is the Home page component</div>;
};

export default HomePage;
