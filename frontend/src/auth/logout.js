function Logout({ onLogout }) {
    const handleLogout = async () => {
      await fetch("https://todo-production-c449.up.railway.app/logout", {
        method: "POST"
      });
      onLogout();
    };
  
    return <button onClick={handleLogout}>Logout</button>;
  }
  
  export default Logout;
  