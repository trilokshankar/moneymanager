function Logout({ onLogout }) {
    const handleLogout = async () => {
      await fetch("https://mongodb-production-9fea.up.railway.app/logout", {
        method: "POST"
      });
      onLogout();
    };
  
    return <button onClick={handleLogout}>Logout</button>;
  }
  
  export default Logout;
  