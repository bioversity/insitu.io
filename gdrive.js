importPackage(java.net);
importPackage(java.io);
importPackage(java.lang);
importPackage(com.google.appengine.api.appidentity);


exports = gdrive = function() {
};

gdrive.prototype.getData = function() {
  return secrets.web.client_id;
}
gdrive.prototype.createShortUrl = function() {
    var result = '';
    try {
        var scopes = new java.util.ArrayList();
        scopes.add("https://www.googleapis.com/auth/drive");
        scopes.add("https://www.googleapis.com/auth/drive.file");
        scopes.add("https://www.googleapis.com/auth/urlshortener");
        var appIdentity = AppIdentityServiceFactory.getAppIdentityService();
        var accessToken = appIdentity.getAccessToken(scopes);
        // The token asserts the identity reported by appIdentity.getServiceAccountName()

        // send request
        //var url = new URL("http://insitu-io.appspot.com/read-headers");
        var url = new URL("https://www.googleapis.com/drive/v2/files");
        //var url = new URL("https://www.googleapis.com/urlshortener/v1/url/history");
        var connection = url.openConnection();
        //connection.setDoOutput(true);
        //connection.setRequestMethod("GET");
        connection.addRequestProperty("Content-Type", "application/json");
        connection.addRequestProperty("Authorization", "Bearer " + accessToken.getAccessToken());
        //var writer = new OutputStreamWriter(connection.getOutputStream());

        // write parameters for POST
        //writer.write('{"longUrl": "http://lucaa.org"}');
        //writer.flush();

        // get the response 
        var answer = new StringBuffer();
        var reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        var line;
        while ((line = reader.readLine()) != null) {
            answer.append(line);
        }
        //writer.close();
        reader.close();

        result = answer.toString();
    } catch (e) {
        // Error handling elided.
        throw e;
    }
    return result;
}
