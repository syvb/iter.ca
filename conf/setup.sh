#!/usr/bin/env bash
shopt -s dotglob

if [ -f ~/scom ]; then
scom=$HOME/scom
else
scom=$HOME/src/scom
fi
(
    cd "$scom/conf/dotfiles" || exit
    for file in *; do
        ln -fs "$scom/conf/dotfiles/$file" "$HOME/$file"
    done
)
