import NavigationComp from "./navigationComp";
const AsideContainer = ({
  user,
  isSidebarOpen,
  setIsSidebarOpen,
  handleLogout,
}: any) => {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <NavigationComp
        user={user}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        handleLogout={handleLogout}
      />
    </aside>
  );
};

export default AsideContainer;
