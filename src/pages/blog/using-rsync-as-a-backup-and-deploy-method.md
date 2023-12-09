---
title: Using rsync as a Backup Method
description:
publishDate: 2018-06-30
layout: ../../layouts/Post.astro
---

## Using `rsync` as a Backup Method

I like [`rsync`](https://rsync.samba.org/). It's an amazing little Unix utility that allows the user to sync files across two drives/folder structures. I use it personally for backuping up photos and other important documents to a mounted USB drive on my personal laptop. I then (periodically) update the drive by running my `rsync` script.

Here is an example script. This script runs a backup on [Dropbox](https://www.dropbox.com) `Code`, `Documents`, `Sites` and `Photos` directories but you of course could set the path to whatever you'd like to backup. I'm also using the `//localhost/c$/Users/$(whoami)` path since I am on Windows using [Git Bash](https://superuser.com/questions/1053633/what-is-git-bash-for-windows-anyway) so you'll probably want to change that too.

```bash
#!/bin/bash

rsync \
    --size-only \
    --delete \
    --recursive \
    --delete-excluded \
    --verbose \
    --exclude node_modules \
    --exclude .dropbox \
    --exclude .meteor/local \
    //localhost/c$/Users/$(whoami)/Dropbox/Code \
    //localhost/c$/Users/$(whoami)/Dropbox/Documents \
    //localhost/c$/Users/$(whoami)/Dropbox/Sites \
    //localhost/c$/Users/$(whoami)/Dropbox/Photos \
    //localhost/s$/ \
    | tee //localhost/s$/backup.log
```

This script will also use `tee` to pipe the output to a `backup.log` file.

### Using `rsync` for code deployment

We can also use `rsync` for code deployment. This works best with HTML/PHP style deployments where we only need to change the files on the server which have changed locally. We can [setup SSH keys and configuration](https://gist.github.com/jonathanbell/bbb4468cf7bc6c0bb585d3b9c751e37d) so that we can just call the name of the server inside our Bash script. Checkout this example `rsync-local-prod.bash` script which I wrote that could be used for updating a WordPress website:

```bash
rsync -rv --size-only --delete --exclude-from=.rsyncignore . servername:/home/user/public_html/
```

The neat thing is you can also [point `rsync` to an excludes file](https://www.thegeekstuff.com/2011/01/rsync-exclude-files-and-folders/?utm_source=feedburner) (notice the `--exclude-from=.rsyncignore` option above).

The `.rsyncignore` could look something like this:

```bash
# rysnc specific ignores
.rsyncignore
rsync*.bash
rsync*.sh

# Exclude my `workfiles` directory off of the root of the tree
/workfiles/

# Exclude common webserver files
/cgi-bin/

# Exclude node_modules and .git folders anywhere in the tree
node_modules
.git

# Wordpress stuff
wp-config.php
cache
supercache

# Exclude WP media directory
uploads
```

This way you don't have to list all those ignores inside the same script, you just add them to your `.rsyncignore` file. It works in the same way a `.gitignore` file works.

So go ahead, and give `rsync` a try today and break away from those FTP woes! I'm sure that you'll love it.
