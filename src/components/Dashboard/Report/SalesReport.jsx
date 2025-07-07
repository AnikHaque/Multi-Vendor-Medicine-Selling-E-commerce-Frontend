import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import dayjs from "dayjs";

export default function SalesReport() {
  const [sales, setSales] = useState([]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const fetchSales = async () => {
    try {
      const token = localStorage.getItem("token");
      const params = {};
      if (start && end) {
        params.startDate = start;
        params.endDate = end;
      }

      const res = await axios.get("https://multi-vendor-medicine-selling-e-com.vercel.app/api/sales", {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
      setSales(res.data);
    } catch (err) {
      console.error("Failed to fetch sales:", err);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const exportToCSV = () => {
    const ws = XLSX.utils.json_to_sheet(sales);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sales Report");
    const blob = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([blob]), "sales_report.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableData = sales.map((sale) => [
      sale.customer.name,
      sale.userEmail,
      sale.line_items.map((li) => li.name).join(", "),
      sale.amount_total,
      dayjs(sale.createdAt).format("YYYY-MM-DD"),
    ]);
    doc.autoTable({
      head: [["Buyer", "Seller", "Medicine", "Total Price", "Date"]],
      body: tableData,
    });
    doc.save("sales_report.pdf");
  };

  const columns = [
    { name: "Buyer", selector: (row) => row.customer?.name || "Guest", sortable: true },
    { name: "Buyer Email", selector: (row) => row.userEmail, sortable: true },
    {
      name: "Medicines",
      selector: (row) => row.line_items.map((li) => li.name).join(", "),
    },
    { name: "Total", selector: (row) => `$${row.amount_total}`, sortable: true },
    {
      name: "Date",
      selector: (row) => dayjs(row.createdAt).format("YYYY-MM-DD"),
      sortable: true,
    },
  ];

  return (
    <div className="p-6 mt-20">
      <h2 className="text-2xl font-bold mb-4">Sales Report</h2>

      <div className="flex gap-4 mb-4">
        <input
          type="date"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className="border px-3 py-2"
        />
        <input
          type="date"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          className="border px-3 py-2"
        />
        <button
          onClick={fetchSales}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Filter
        </button>
        <button
          onClick={exportToCSV}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Export XLSX
        </button>
        <button
          onClick={exportToPDF}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Export PDF
        </button>
      </div>

      <DataTable columns={columns} data={sales} pagination />
    </div>
  );
}
