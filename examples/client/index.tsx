import React from "react";
import ReactDOM from "react-dom";
import Hello from "../shared/components/hello";

const initialData = document.getElementById("initial-data");
if (!initialData) {
  throw new Error("initial data missing");
}
const count = initialData.dataset.count || 0;
ReactDOM.render(<Hello count={+count} />, document.getElementById("root"));
