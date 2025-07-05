function Logout({ onLogout }) {
    const handleLogout = async () => {
      await fetch("https://money-manager-production-7bea.up.railway.app/logout", {
        method: "POST"
      });
      onLogout();
    };
  
    return <button onClick={handleLogout}>Logout</button>;
  }
  
  export default Logout;
  