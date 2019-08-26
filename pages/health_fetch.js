import React, { Component } from 'react';
import { healthCheckFetch } from '../api';

class Health extends Component {
  static async getInitialProps(ctx) {
    const host = process.browser ? window.location.host : ctx.req.headers.host;
    try {
      const healthCheckRes = await healthCheckFetch(host);
      console.log(healthCheckRes);
      return { status: healthCheckRes };
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
