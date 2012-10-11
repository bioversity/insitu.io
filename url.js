importPackage(java.net);
importPackage(java.io);
importPackage(java.lang);

exports = url = {
  openConnection: function(u) {
    var u = new URL(u)
    var connection = u.openConnection()
    return connection
  },
  getResponse: function(conn) {
    var answer = new StringBuffer();
    var reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
    var line;
    while ((line = reader.readLine()) != null) {
        answer.append(line);
    }
    reader.close();

    return answer.toString();
  },
  setPost: function(connection, data) {
    connection.setDoOutput(true);
    connection.setRequestMethod("POST");

    // write data
    var writer = new OutputStreamWriter(connection.getOutputStream());

    // write parameters for POST
    writer.write(data);
    writer.flush();
  },
  get: function(u) {
    var conn = url.openConnection(u)
    return url.getResponse(conn)
  },
  post: function(u, data) {
    var conn = url.openConnection(u)
    url.setPost(conn, data)
    return url.getResponse(conn)
  },
  fetchUrl: function(u) {
    var bytes = com.google.appengine.api.urlfetch.URLFetchServiceFactory.getURLFetchService().fetch( new URL(u) ).getContent()
    return bytes
  },

  tests: {
    getRequest: function() {
      var html = url.get('http://google.com')
      if(!html) throw 'error getting url'
    },
    getWithValidContent: function() {
      var html = url.get('http://google.com')
      if(html.indexOf('Google') == -1) throw 'word Google not found in google.com'
    },
    postRequest: function() {
      var html = url.post('http://thumbtool.phpotdel.ru/')
      if(!html) throw 'error posting'
    },
    postWithValidContent: function() {
      var q = 'query=http://facebook.com&results_needed=1&op=Get it!'
      var html = url.post('http://thumbtool.phpotdel.ru/', q)
      if(html.indexOf('thumb-small') == -1) throw 'thumbnail not found - maybe thumbtool.phpotdel.ru is down?'
    }
  }
};
