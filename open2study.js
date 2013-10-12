
var casper = require('casper').create({
    pageSettings: {
      loadImages:  false,
      loadPlugins: false 
    },
    verbose: false
  }),
  user = casper.cli.args[0],
  pass = casper.cli.args[1],
  courseUrl = casper.cli.args[2]

casper.start('https://accounts.google.com/ServiceLogin', function () {
  this.fill('form', {
    'Email': user,
    'Passwd': pass
  }, true);
})

casper.thenOpen('https://login.open2study.com/simplesaml/saml2/idp/SSOService.php?source=google&IdPentityID=login.open2study.com&spentityid=https%3A%2F%2Fwww.open2study.com%2Fsimplesaml%2Fmodule.php%2Fsaml%2Fsp%2Fmetadata.php%2Fdefault-sp&RelayState=https://www.open2study.com/saml_login', function(){})

casper.thenOpen(courseUrl, function () {
  var links = this.evaluate(function() {
    var a = $('.jspPane .module li a')
    return Array.prototype.map.call(a, function(e){
      return {url: e.getAttribute('href'), title: e.firstChild.innerText}
    })
  });

  for (var i=0; i < links.length; i++) {
    var link = links[i];
    casper.thenOpen(link.url, function() {
      link.ylink = this.evaluate(function() {
        return $('#ytplayer').attr('src')
      });

      if (link != null && link.ylink)
        this.echo(link.ylink)
    })
  }
})

casper.run()
