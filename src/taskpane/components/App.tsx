import * as React from "react";
import Wizard from "./wizard";
import { AppProps } from "../models/AppProps";

/* global require */

export default class App extends React.Component<AppProps> {
  render() {
    return (
      <div className="ms-welcome">
        <Wizard></Wizard>
      </div>
    );
  }
}
