let Style = styled.div`



                `;
const menustyles = {
  menuwrap: {
    backgroundColor: "white",
    backgroundImage:
      "url('https://ipfs.near.social/ipfs/bafkreiabzsf7xpkkpayjcg4ztoulzxekkl2rsfoowj6pycygvaynpwmmp4')",
    backgroundSize: "450px",
    backgroundRepeat: "repeat",
    padding: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid black",
  },
  ul: {
    margin: "0",
    listStyleType: "none",
    display: "flex",
    padding: "5px",
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  li: {
    margin: "10px",
    boxSizing: "border-box",
    borderRadius: "5px",
  },
  a: {
    color: "white", // White text for better visibility
    backgroundColor: "rgba(0,0,0,0.7)", // Semi-transparent black background on buttons
    fontSize: "18px",
    fontWeight: "bold",
    padding: "10px 20px", // Increased padding for a larger button area
    lineHeight: "1.5",
    textDecoration: "none",
    borderRadius: "5px", // Matching border-radius with li elements
    textShadow: "1px 1px 2px rgba(0,0,0,0.9)", // Darker text shadow for depth
    boxShadow: "2px 2px 4px rgba(0,0,0,0.2)", // Subtle box shadow for 3D effect
    transition: "background-color 0.3s", // Smooth transition for hover effect
  },
  "a:hover": {
    backgroundColor: "rgba(255,255,255,0.8)", // Lighter background on hover for interactivity
    color: "black", // Text color change on hover for better visibility
  },
};

return (
  <Style>
    <div className="paw-print-background" style={menustyles.menuwrap}>
      <Widget src="mob.near/widget/ProfileImage" props={{}} />{" "}
      <ul style={menustyles.ul}>
        <li style={menustyles.li}>
          <a
            href="https://near.org/y3k.near/widget/apps.devSnoopy.main"
            style={menustyles.a}
          >
            Home
          </a>
        </li>
        <li style={menustyles.li}>
          <a
            href="https://near.org/y3k.near/widget/apps.devSnoopy.main"
            style={menustyles.a}
          >
            Start
          </a>
        </li>
        <li style={menustyles.li}>
          <a href="#" style={menustyles.a}>
            My Events
          </a>
        </li>
        <li style={menustyles.li}>
          <a href="#" style={menustyles.a}>
            Tutorial
          </a>
        </li>
        <li style={menustyles.li}>
          <a href="#" style={menustyles.a}>
            About
          </a>
        </li>
      </ul>
    </div>
  </Style>
);
