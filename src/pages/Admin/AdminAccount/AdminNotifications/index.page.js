import React from "react";
import { Breadcrumb, DataTable,PageHeader } from "../../../../components";
import adminRouteMap from "../../../../routeControl/adminRouteMap";

function AdminNotifications() {
  const breadcrumb = [
    {
      path: `${adminRouteMap.DASHBOARD.path}`,
      name: "DASHBOARD",
    },
    {
      path: "#",
      name: "Notifications",
    },
  ];
  const customerData = [
    {
      id: 1,
      notifications: "Lorem ipsum dolor sit amet, consectetur adipi...",
      createddate: "11/05/2023, 04:41 PM"
    },
    {
      id: 2,
      notifications: "Lorem ipsum dolor sit amet, consectetur adipi...",
      createddate: "08/05/2023, 05:30 PM"
    },
    {
      id: 3,
      notifications: "Lorem ipsum dolor sit amet, consectetur adipi...",
      createddate: "11/05/2023, 04:41 PM"
    },
    {
      id: 4,
      notifications: "Lorem ipsum dolor sit amet, consectetur adipi...",
      createddate: "08/05/2023, 05:30 PM"
    },
    {
      id: 6,
      notifications: "Lorem ipsum dolor sit amet, consectetur adipi...",
      createddate: "11/05/2023, 04:41 PM"
    },
    {
      id: 7,
      notifications: "Lorem ipsum dolor sit amet, consectetur adipi...",
      createddate: "08/05/2023, 05:30 PM"
    },
    {
      id: 8,
      notifications: "Lorem ipsum dolor sit amet, consectetur adipi...",
      createddate: "11/05/2023, 04:41 PM"
    },
    {
      id: 9,
      notifications: "Lorem ipsum dolor sit amet, consectetur adipi...",
      createddate: "08/05/2023, 05:30 PM"
    },
    {
      id: 10,
      notifications: "Lorem ipsum dolor sit amet, consectetur adipi...",
      createddate: "08/05/2023, 05:30 PM"
    }
  ]
  
  const columns = [
    {
      dataField: "id",
      text: "S.No.",
      headerClasses: "w_70"
    },
    {
      dataField: "notifications",
      text: "Notifications",
    },
    {
      dataField: "createddate",
      text: "Created Date",
    },
  ];
  return (
    <>
      <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between">
          <PageHeader heading="Notifications">
            <Breadcrumb breadcrumb={breadcrumb} />
          </PageHeader>
        </div>
      </div>
      <DataTable
            hasLimit
            noOfPage="1"
            sizePerPage="10"
            page="1"
            count="100"
            tableData={customerData}
            tableColumns={columns}
            setSizePerPage=""
          />
    </>
  );
}

export default AdminNotifications;
