// const tData = props.dataRegistry || [];

function aggregateData(data, aggregateKey) {
  const aggregatedData = {};

  data.forEach((item) => {
    // Use the specified key for aggregation
    const key = item[aggregateKey];
    if (!aggregatedData[key]) {
      // Initialize with the first item of this series and set count to 1
      aggregatedData[key] = { ...item, count: 1 };
    } else {
      // Increment count for each occurrence
      aggregatedData[key].count += 1;
    }
  });

  return Object.values(aggregatedData);
}

// const tData = aggregateData(props.dataRegistry || []);
const tData = aggregateData(props.dataRegistry, "series_title");

function generateDynamicTableHeaders(tableData, thStyle) {
  // Check if tableData is an array and not empty
  if (!Array.isArray(tableData) || tableData.length === 0) {
    return null;
  }

  // Ensure the first element is an object
  const firstItem = tableData[0];
  if (typeof firstItem !== "object" || firstItem === null) {
    return null;
  }

  // Extract keys from the first object in the data array as column names
  const columnNames = Object.keys(firstItem);
  console.log(columnNames);

  return columnNames.map((columnName, index) => (
    <th key={index} style={thStyle}>
      {columnName.replace(/_/g, " ")}
    </th>
  ));
}

const tableStyle = {
  borderCollapse: "collapse",
  width: "100%",
  borderRadius: "0.25rem",
  overflow: "hidden",
};

const thStyle = {
  backgroundColor: "#000000", // Black background
  color: "#FFFFFF", // White text
  padding: "8px",
  textAlign: "left",
  borderBottom: "1px solid #e5e7eb",
};

const tdStyle = {
  padding: "8px",
  textAlign: "left",
  borderBottom: "1px solid #e5e7eb",
};

// Function to alternate row colors
const getRowStyle = (index) => ({
  backgroundColor: index % 2 === 0 ? "#f2f2f2" : "#e5e7eb", // Alternating colors
});

function formatCell(text) {
  return (
    <a
      href={
        "https://near.org/y3k.near/widget/apps.devSnoopy.detail?SERIES_TITLE=" +
        text
      }
      className="text-red-50 text-wrap "
    >
      {text}
    </a>
  );
}

return (
  <table style={tableStyle}>
    <thead>
      <tr>
        <th style={thStyle}>Address</th>
        <th style={thStyle}>Series Title</th>
        <th style={thStyle}>Mint Timestamp UTC</th>
        <th style={thStyle}>Originated From Transaction Hash</th>
        <th style={thStyle}>Token IDs</th>
        <th style={thStyle}>Count</th>
      </tr>
    </thead>
    <tbody>
      {tData.map((item, index) => (
        <tr key={item.address} style={getRowStyle(index)}>
          <td style={tdStyle}>{item.address}</td>
          <td style={tdStyle}>{formatCell(item.series_title)}</td>
          <td style={tdStyle}>{item.mint_timestamp_utc}</td>
          <td style={tdStyle}>{item.originated_from_transaction_hash}</td>
          <td style={tdStyle}>{item.token_ids}</td>
          <td style={tdStyle}>{item.count}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
