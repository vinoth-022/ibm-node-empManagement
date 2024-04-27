import Search from "../components/ControlPanel/Control/Search";

const columns = [
    {
        Header: "Employee ID",
        accessor: "employeeId",
        disableFilters: true,
    },
    {
        Header: "First Name",
        accessor: "firstname",
        Filter: Search, // Assuming Search is a custom filter component
    },
    {
        Header: "Last Name",
        accessor: "lastname",
        Filter: Search, // Assuming Search is a custom filter component
    },
    {
        Header: "Email",
        accessor: "email",
        Filter: Search, // Assuming Search is a custom filter component
    },
    {
        Header: "Address",
        accessor: "address",
        Filter: Search, // Assuming Search is a custom filter component
    },
    {
        Header: "Salary",
        accessor: "salary",
        disableFilters: true,
    },
];


export default columns;