// src/components/Dashboard.js
import React, { useState } from "react";
import ContainerTable from "./ContainerTable";

function Dashboard() {
  const [containers, setContainers] = useState([]);

  return (
    <div>
      <ContainerTable containers={containers} />
    </div>
  );
}

export default Dashboard;
