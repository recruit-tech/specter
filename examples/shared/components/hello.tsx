import React, { useState, useEffect } from "react";
import Client, { Request, Response } from "@specter/client";

const client = new Client({
  base: "/xhr",
  fetchOption: {},
});

export default class Hello extends React.Component<{count: number}, {count: number}> {
  constructor(props: {count: number}) {
    super(props);
    this.state = {
      count: props.count,
    };
  }

  static async countup(): Promise<number> {
    const request = new Request<{}, {}, null>("counter", {
       headers: {},
       query: {},
       body: null,
    });
    const count = (await client.update<Response<{}, { count: number }>>(request)).body.count;
    return count;
  }

  async onClick() {
    const count = await Hello.countup();
    this.setState({ count });
  }

  render() {
    return (<div>Hello world {this.state.count}<input type="button" value="countup" onClick={this.onClick.bind(this)}/></div>);
  }

}