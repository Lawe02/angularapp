const PROXY_CONFIG = [
  {
    context: [
      "/crud
    ],
    target: "https://webapi20230820203350.azurewebsites.net/",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
