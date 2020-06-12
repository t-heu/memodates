module.exports = {
  apps : [{
    name: "backend",
    script: "./dist/app.js",
    // watch: ["dist"],
    // ignore_watch : ["node_modules", "src"],
    // watch_options: {
    //   "followSymlinks": false
    // },
    instances: "max",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}
//command: pm2-runtime start ecosystem.config.js --env production