insitu.io
=========

## Abstract

There's a lot of information about in-situ conservation all over the internet. When a user wants to lookup this data, they're confronted with the daunting task of having to go through many different websites and many different search engines before they find what they need.

The idea of insitu.io is to allow people to aggregate all of this data into a central place. If, for example, you have 5 different in-situ resources, you can submit them directly to insitu.io. They will then be part of a more central database, and other people can take advantage of these in-situ resources you have.

This is to be considered a [Minimum Viable Product](http://en.wikipedia.org/wiki/Minimum_viable_product). We need to have something out there that people can start using and see what sort of feedback we can get. Since our audience might not be that large, we need to put in place a system that allows us to understand *who* is using our product. I am thinking about a simple form, asking users simple questions about how they're going to use our data.

## Features

* Allow people to search and explore in-situ related data.
* Allow anyone to submit content quickly and easily. Easy signup form so that we can record and see who's using our product.

## How?

A user goes to http://insitu-io.appspot.com/ and they can immediately submit content through a SUBMIT button. A little form pops open, and they can either choose to upload a file (image, PDF, excel, etc.), or they can choose to submit a link.

The content is uploaded in the background into a Google Drive account, using the Google Drive API. This allows us to get metadata of the files, things such as the thumbnail images, and it allows us to use the [Drive search API](https://developers.google.com/drive/v2/reference/files/list) so that we can search inside PDF files for example. All of the Drive functionality is given to us for free, so taht we don't have to worry about processing the files ourselves.

The app is meant to be a simple interface around a Google Drive account.

Here's a first prototype screen to show you how it may look:

![](https://raw.github.com/bioversity/insitu.io/master/screen1.png)

## Links

* [Changelog](insitu.io/wiki/Changelog)
