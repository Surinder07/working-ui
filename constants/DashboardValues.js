export const DashboardCardValues = [
  {
    id: 1,
    heading: "Company Holidays",
    subHeading: "Current Week",
    banner: "1 Holiday",
    url: "/icons/dashboardIcon/Holiday.svg",
  },
  {
    id: 2,
    heading: "Acitve Employees",
    subHeading: "Current Week",
    banner: "256",
    url: "/icons/dashboardIcon/ActiveEmployees.svg",
  },
  {
    id: 3,
    heading: "Active Locations",
    subHeading: "Current Week",
    banner: "5+",
    url: "/icons/dashboardIcon/ActiveLocation.svg",
  },
  {
    id: 4,
    heading: "Pending Requests",
    subHeading: "",
    banner: "50+",
    url: "/icons/dashboardIcon/PendingRequests.svg",
  },
];

export const DashboardInvoicesHeader = [{ name: "Invoice ID" }, { name: "Service " }, { name: "Start Date" }, { name: "End Date" }, { name: "Billing Date" }, { name: "Amount" }, { name: "Status" }];

export const DashboardInvoicesValues = [
  { id: 1, invoicesId: 8977890, service: "xyzabc", startDate: "01/01/2023", endDate: "02/01/2023", billingDate: "03/01/2023", amount: "$960", status: "PAID" },
  { id: 2, invoicesId: 8977898, service: "xyzfbc", startDate: "02/01/2023", endDate: "03/01/2023", billingDate: "05/01/2023", amount: "$965", status: "DUE" },
  { id: 3, invoicesId: 8977890, service: "xyzabc", startDate: "01/01/2023", endDate: "04/01/2023", billingDate: "06/01/2023", amount: "$960", status: "PAID" },
];
