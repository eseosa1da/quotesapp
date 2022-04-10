#!/bin/bash
GITPATH=`pwd | cut -d '/' -f 6`
echo "Initializing Git"
git init
git remote add origin https://github.com/eseosa1da/react05.git
git checkout -b $GITPATH
git add .
git commit -m "initial commit"
git push -u origin $GITPATH
