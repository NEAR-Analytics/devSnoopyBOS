var series = [
  {
    data: [80],
    type: "bar",
    stack: "a",
    name: "a",

    label: {
      show: true,
    },
  },
  {
    data: [120],
    type: "bar",
    stack: "a",
    name: "b",

    label: {
      show: true,
    },
  },
];
const stackInfo = {};
for (let i = 0; i < series[0].data.length; ++i) {
  for (let j = 0; j < series.length; ++j) {
    const stackName = series[j].stack;
    if (!stackName) {
      continue;
    }
    if (!stackInfo[stackName]) {
      stackInfo[stackName] = {
        stackStart: [],
        stackEnd: [],
      };
    }
    const info = stackInfo[stackName];
    const data = series[j].data[i];
    if (data && data !== "-") {
      if (info.stackStart[i] == null) {
        info.stackStart[i] = j;
      }
      info.stackEnd[i] = j;
    }
  }
}
for (let i = 0; i < series.length; ++i) {
  const data = series[i].data;
  const info = stackInfo[series[i].stack];
  for (let j = 0; j < series[i].data.length; ++j) {
    // const isStart = info.stackStart[j] === i;
    const isEnd = info.stackEnd[j] === i;
    const topBorder = isEnd ? 20 : 0;
    const bottomBorder = 0;
    data[j] = {
      value: data[j],
      itemStyle: {
        borderRadius: [topBorder, topBorder, bottomBorder, bottomBorder],
      },
    };
  }
}

const fetchResult = fetch(
  "https://storage.googleapis.com/databricks-near-query-runner/output/total_fast_auth_by_date.json"
);

if (!fetchResult) {
  return "Loading data...";
}
if (!fetchResult.ok) {
  return "Failed to fetch data";
}

const parsed = JSON.parse(fetchResult.body);
const dataset = parsed.data
  .sort((a, b) => a.start_of_the_week - b.start_of_the_week)
  .map((row) => ({
    "Total Fast Auth Accounts": row.total_fast_auth_acounts,
    Date: new Date(row.start_of_the_week).toISOString().substring(0, 10),
  }));

const colsToShow = ["Total Fast Auth Accounts"];

const definition = {
  legend: {},

  grid: {
    containLabel: true,
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      // Use axis to trigger tooltip
      type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
    },
  },
  xAxis: {
    type: "category",
    data: ["Thu"],
  },
  yAxis: {
    type: "value",
  },
  series: series,
};

return (
  <div>
    <Widget src={`nearpavel.near/widget/EChart`} props={{ definition }} />
  </div>
);
