importPackage(com.google.appengine.api.blobstore);

exports = {
  service: BlobstoreServiceFactory.getBlobstoreService(),
  blobInfoFactory: new BlobInfoFactory()
}
