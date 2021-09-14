#!/bin/bash
for branch in `git branch | grep 'master' -v` ; do git branch -d $branch ; done
