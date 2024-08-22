import LogoutButton from "@/components/logOut/logOut"; 

const Dashboard = () => {
  return (
    <div className="p-4 max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-4">
        <p className="text-xl font-semibold">Manage your account and orders.</p>
        <LogoutButton/>
      </div>
    </div>
  );
};

export default Dashboard;
