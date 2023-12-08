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

// State.init({
//   setSortConfig: { key: null, direction: "asc" },
//   currentPage: 1,
//   rowsPerPage: 10, // You can change this as needed.
// });

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

const dataRegistry = createRegistry(JSON.parse(rawData.body).data);

// console.log(JSON.parse(rawData.body));
// console.log(dataRegistry);
const tData = transformDataToDesiredFormat(dataRegistry);

return (
  <div>
    <Widget src="y3k.near/widget/apps.devSnoopy.menu" props={{}} />

    <div class="container my-5">
      <div class="row">
        <div class="col-md-12">
          <h2 class="text-center mb-4">
            Tracking NEAR Real-Time Engagement with NFTs
          </h2>
          <p class="text-center">
            Dive into the pulse of current events monitored through ShardDog
            NFTs and the DevSnoopy proxy contract. The table below provides a
            real-time snapshot of ongoing projects within our vibrant community.
          </p>
        </div>
      </div>
      <div class="row text-center">
        <div class="col-md-4 mb-4">
          <div class="card h-100">
            <div class="card-body">
              <h3 class="card-title">🌟 Explore Ongoing Events</h3>
              <p class="card-text">
                Get an in-depth view of each project. Click on any event to see
                live interactions, participant engagement, and more.
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-4">
          <div class="card h-100">
            <div class="card-body">
              <h3 class="card-title">🚀 Start Your Event</h3>
              <p class="card-text">
                Have an idea for an event? Launch your own and watch it grow.
                Utilize our platform to track engagement and NFT interactions.
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-4">
          <div class="card h-100">
            <div class="card-body">
              <h3 class="card-title">🔍 Deep Dive into Data</h3>
              <p class="card-text">
                Access detailed analytics for each event. Understand trends,
                track NFT flow, and gain insights to optimize your projects.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Widget
      src="y3k.near/widget/apps.devSnoopy.components.table"
      props={{ dataRegistry: tData }}
    />
  </div>
);
