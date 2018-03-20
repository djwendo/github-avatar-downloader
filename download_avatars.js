var request = require('request');
var fs = require('fs');
var token = require('./secrets');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    json: true,
    headers: {
      'User-Agent': 'request',
      'Authorization': token.GITHUB_TOKEN,
    }
  };

  request(options, function(err, res, data) {
    cb(err, data);
  });
}

var avatars = [];

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  result.forEach(function(contributor) {
    downloadImageByURL(contributor.avatar_url, contributor.login);
  });
});

function downloadImageByURL(url, filepath) {

    request.get(url)
           .on('error', function (err) {
             throw err;
           })
           .on('response', function (response) {
             console.log('Downloading image...');
           })
           .on('end', function() {
             console.log('Download complete.');
           })
           .pipe(fs.createWriteStream("./avatars/" + filepath + ".jpg"));
}




