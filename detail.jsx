const SERIES_TITLE = props.SERIES_TITLE || "Onchain African";

let rawData = fetch(
  "https://raw.githubusercontent.com/NEAR-Analytics/NEAR-Social/main/data/output_snoopy_pipeline_benchmark.json",
  {
    subscribe: true,
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  }
);

function createRegistry(data) {
  const registry = {};

  data.forEach((item) => {
    // Destructure necessary fields from each item
    const {
      nft_receiver_id,
      token_ids,
      series_title,
      mint_timestamp_utc,
      originated_from_transaction_hash,
    } = item;

    // If this is the first NFT for this receiver, initialize an array
    if (!registry[nft_receiver_id]) {
      registry[nft_receiver_id] = [];
    }

    // Add this NFT's info to the receiver's array
    registry[nft_receiver_id].push({
      token_ids,
      series_title,
      mint_timestamp_utc,
      originated_from_transaction_hash,
    });
  });

  return registry;
}

function transformDataToDesiredFormat(registry) {
  let transformedData = [];

  Object.entries(registry).forEach(([key, items]) => {
    items.forEach((item) => {
      // Create a new object for each item
      let transformedEntry = {};

      // Copy all key-value pairs from the original item to the new object
      Object.keys(item).forEach((itemKey) => {
        transformedEntry[itemKey] = item[itemKey];
      });

      // Optionally, add or transform any additional keys as needed
      transformedEntry["address"] = key; // Example of adding a new key

      transformedData.push(transformedEntry);
    });
  });

  return transformedData;
}

const rawdataRegistry = createRegistry(JSON.parse(rawData.body).data);

function filterDataBySeriesTitle(data, filterTitle) {
  // Filter data to only include items with the specified series_title
  const filteredData = data.filter((item) => item.series_title === filterTitle);

  return filteredData;
}

const nonAggData = transformDataToDesiredFormat(rawdataRegistry);

const tData = filterDataBySeriesTitle(nonAggData, SERIES_TITLE);

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

// Assume State is a global object with init and update methods
State.init({
  currentPage: 1,
  rowsPerPage: 10, // You can change this as needed.
  data: tData, // tData is your filtered or full dataset
});

function getPaginatedData() {
  const currentPage = state.currentPage;
  const rowsPerPage = state.rowsPerPage;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  return state.data.slice(startIndex, endIndex);
}

function updatePagination(newPage) {
  const totalPages = Math.ceil(state.data.length / state.rowsPerPage);
  // Ensure newPage is within the page limits
  if (newPage >= 1 && newPage <= totalPages) {
    State.update({ currentPage: newPage });
  }
}

// Use these functions in the onclick handlers for your Previous and Next buttons
function goToPrevPage() {
  const currentPage = state.currentPage;
  if (currentPage > 1) {
    updatePagination(currentPage - 1);
  }
}

function goToNextPage() {
  const currentPage = state.currentPage;
  const totalPages = Math.ceil(state.data.length / state.rowsPerPage);
  if (currentPage < totalPages) {
    updatePagination(currentPage + 1);
  }
}

const paginatedData = getPaginatedData();

return (
  <div>
    <Widget src="y3k.near/widget/apps.devSnoopy.menu" props={{}} />
    <div class="container my-5">
      <div class="row">
        <div class="col-md-12">
          <h2 class="text-center mb-4">{SERIES_TITLE} Event</h2>
        </div>
      </div>
      <div class="row text-center">
        <div class="col-md-6 mb-6">
          <div class="">
            <div class="card-body">
              <h3 class="card-title">🌟 New Account Ratio</h3>
              <Widget
                src="y3k.near/widget/apps.devSnoopy.components.drawChart"
                props={{}}
              />
            </div>
          </div>
        </div>
        <div class="col-md-6 mb-6">
          <div class="">
            <div class="card-body">
              <h3 class="card-title">🚀 Benchmark: New Account Ratio</h3>

              <Widget
                src="y3k.near/widget/apps.devSnoopy.components.drawChart"
                props={{}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={thStyle}>Address</th>
          <th style={thStyle}>Mint Timestamp UTC</th>
          <th style={thStyle}>Token IDs</th>
        </tr>
      </thead>
      <tbody>
        {paginatedData.map((item, index) => (
          <tr key={item.address} style={getRowStyle(index)}>
            <td style={tdStyle}>{item.address}</td>
            <td style={tdStyle}>{item.mint_timestamp_utc}</td>
            <td style={tdStyle}>{item.token_ids}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="text-center mt-4 bg-gray-800 p-4 rounded">
      <button
        onClick={goToPrevPage()}
        className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 active:bg-gray-500"
      >
        Previous
      </button>
      <span className="mx-2 text-white">
        Page {state.currentPage} of{" "}
        {Math.ceil(state.data.length / state.rowsPerPage)}
      </span>
      <button
        onClick={goToNextPage()}
        className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 active:bg-gray-500"
      >
        Next
      </button>
    </div>
  </div>
);
