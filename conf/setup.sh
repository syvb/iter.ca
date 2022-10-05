#!/usr/bin/env bash
shopt -s dotglob
(
    cd "$HOME/smitop-blog/conf/dotfiles" || exit
    for file in *; do
        ln -fs "$HOME/smitop-blog/conf/dotfiles/$file" "$HOME/$file"
    done
)
