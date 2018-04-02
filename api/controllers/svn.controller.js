// const Deploy = require('../models/deploy');
const fs = require('fs');
const moment = require('moment');

var config = require('../../config.json');
var convert = require('xml-js');


exports.getLastRevision = function(req,res) {
     const { exec } = require('child_process');
     let svnCommand = 'svn inf '+config.svnRepository+' --xml';

     exec(svnCommand, (err, stdout, stderr) => {
      if (err) {
        // node couldn't execute the command
        return;
      }

      var options = {ignoreComment: true, alwaysChildren: true, compact: true};
      var result = convert.xml2js(stdout, options); // or convert.xml2json(xml, options)

     res.json(result);

     });

};

exports.getRevisionLog = function(req, res) {
     const { exec } = require('child_process');
     let svnDiffCommand = 'svn log --limit 5 '+config.svnRepository+' --xml';

     exec(svnDiffCommand, (err, stdout, stderr) => {
      if (err) {
        // node couldn't execute the command
        return;
      }

      var options = {ignoreComment: true, alwaysChildren: true, compact: true};
      var result = convert.xml2js(stdout, options); // or convert.xml2json(xml, options)
      console.log(result);

      res.json(result);


     });

};

exports.getLog = function(req, res) {
     const { exec } = require('child_process');
     let svnDiffCommand = 'svn log --limit 20 https://svn:8443/svn/intl/ --xml';

     exec(svnDiffCommand, (err, stdout, stderr) => {
      if (err) {
        // node couldn't execute the command
        return;
      }
      res.set('Content-Type', 'text/xml');
      res.send(stdout);
     });
};

exports.getRevision = function(req, res) {

     let revisionNum = req.params.revision;
     let svnCommand = 'svn log -v -r '+revisionNum+' '+config.svnRepository+' --xml'
     const { exec } = require('child_process');

     exec(svnCommand, (err, stdout, stderr) => {
      if (err) {
        // node couldn't execute the command
        return;
      }
      console.log(stdout);
      var options = {ignoreComment: true, alwaysChildren: true, compact: true};
     var result = convert.xml2js(stdout, options); // or convert.xml2json(xml, options)
     console.log(result);

     res.json(result);

     });
};
