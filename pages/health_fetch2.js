import fetch from 'isomorphic-unfetch';
import React, { Component } from 'react';

class Health extends Component {
  static async getInitialProps(ctx) {
    const protocol =
      process.env.NODE_ENV !== 'production' ? 'http://' : 'https://';
    const host = process.browser ? window.location.host : ctx.req.headers.host;
    const url = `${protocol}${host}/api/health`;
    console.log('url is: ', url);
    try {
      const healthCheckRes = await fetch(url);
      const status = await healthCheckRes.json();
      return { status };
    } catch (err) {
      console.log(err);
      return { status: err, error: true };
    }
  }

  render() {
    return (
      <div>
        {this.props.error && <h2>ERROR</h2>}
        <p>Status: {JSON.stringify(this.props.status)}</p>
      </div>
    );
  }
}

export default Health;
