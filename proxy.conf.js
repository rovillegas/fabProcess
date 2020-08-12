module.exports = {
  "/alfresco": {
    "target": "http://ec2-34-240-17-146.eu-west-1.compute.amazonaws.com",
    "secure": false,
    "changeOrigin": true,
    // workaround for REPO-2260
    onProxyRes: function (proxyRes, req, res) {
      const header = proxyRes.headers['www-authenticate'];
      if (header && header.startsWith('Basic')) {
        proxyRes.headers['www-authenticate'] = 'x' + header;
      }
    }
  },
  "/activiti-app": {
    "target": "http://ec2-34-240-17-146.eu-west-1.compute.amazonaws.com",
    "secure": false,
    "changeOrigin": true
  }
};
