#!/usr/bin/env bash
shopt -s dotglob
(
    cd "$HOME/scom/conf/dotfiles" || exit
    for file in *; do
        ln -fs "$HOME/scom/conf/dotfiles/$file" "$HOME/$file"
    done
)
