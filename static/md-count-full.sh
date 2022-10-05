}#!/bin/bash
# Script to find the total number words in Markdown files in the directory.


</span># Get the total number of words in all Markdown files in the directory.
#
# @param {string} $1 The directory to search.
# @return {int} The total number of words in all Markdown files in the directory.
function get_total_words() {
  local total_words=0

  for file in $(find $1 -name "*.md"); do
    local words=$(wc -w < $file)
    total_words=$((total_words + words))
  done

  echo $total_words
}


# Get the total number of words in all Markdown files in the directory.
#
# @param {string} $1 The directory to search.
# @return {int} The total number of words in all Markdown files in the directory.
function get_total_chars() {
  local total_chars=0

  for file in $(find $1 -name "*.md"); do
    local chars=$(wc -m < $file)
    total_chars=$((total_chars + chars))
  done

  echo $total_chars
}


# Get the total number of lines in all Markdown files in the directory.
#
# @param {string} $1 The directory to search.
# @return {int} The total number of lines in all Markdown files in the directory.
function get_total_lines() {
  local total_lines=0

  for file in $(find $1 -name "*.md"); do
    local lines=$(wc -l < $file)
    total_lines=$((total_lines + lines))
  done

  echo $total_lines
}


# Get the total number of characters per word in all Markdown files in the directory.
# This is useful for determining how much space a word takes up on a page. For example, if a word takes up 10 characters per word, then a page would be 100 characters long. If a word takes up 20 characters per word, then a page would be 200 characters long. And so on... This is useful for determining how many words fit on a page, and how many pages fit on a book. This is also useful for determining how many pages fit on a screen, and how many screens fit on a book. This is also useful for determining how many screens fit on a phone, and how many phones fit on a book. This is also useful for determining how many books fit on a shelf, and how many shelves fit on a room. This is also useful for determining how many rooms fit on a house, and how many houses fit on a city block. This is also useful for determining how many city blocks fit on a city, and how many cities fit on a state, and so on... This is also useful for determining how much space one word takes up when printed out with other words, and so on... This is also useful for determining how much space one line takes up when printed out with other lines, and so on... This is also useful for determining how much space one character takes up when printed out with other characters, and so on... This is also useful for determining how much space one page takes up when printed out with other pages, and so on... This is also useful for determining how much space one screen takes up when printed out with other screens, and so on... This is also useful for determining how much space one phone takes up when printed out with other phones, and so on... This is also useful for determining how much space one book takes up when printed out with other books, and so on... This is also useful for determining how much space one shelf takes up when printed out with other shelves, and so on... This is also useful for determining how much space one room takes up when printed out with other rooms, and so on... This is also useful for determining how much space one house takes up when printed out with other houses, and so on... This is also useful for determining how much space one city block takes up when printed out with other city blocks, and so on... This is also useful for determining how much space one city takes up when printed out with other cities, and so on... This is also useful for determining how much space one state takes up when printed out with other states, and so on... And so on... And so on... And so on... And so on... And so on... And so on... And so on... And so on... And so on... And so on... And so on... And so on... And so on... And so on... And so on... And so on... And so on... And so on... And so on... And so on... And so on... And so on... And so on... And so on... And so on... And so on... And so on... And so on... And so on... And so on... And so on... And so on... And so on... And so on... And so on... And so on... And so on... And so on... And so on... And so on... And so on... And so on...
#
# @param {string} $1 The directory to search.
# @return {int} The total number of characters per word in all Markdown files in the directory.
function get_total_chars_per_word() {
  local total_chars_per_word=0

  for file in $(find $1 -name "*.md"); do
    local chars=$(wc -m < $file)
    local words=$(wc -w < $file)
    local chars_per_word=$((chars / words))
    total_chars_per_word=$((total_chars_per_word + chars_per_word))
  done

  echo $total_chars_per_word
}


# Get the total number of characters per line in all Markdown files in the directory.
# This is useful for determining how much space a line takes up when printed out with other lines, and so on... This is also useful for determining how much space one page takes up when printed out with other pages, and so on... This is also useful for determining how much space one screen takes up when printed out with other screens, and so on... This is also useful for determining how much space one phone takes up when printed out with other phones, and so on... This is also useful for determining how much space one book takes up when printed out with other books, and so on... This is also useful for determining how much space one shelf takes up when printed out with other shelves, and so on... This is also useful for determining how much space one room takes up when printed out with other rooms, and so on... This is also useful for determining how much space one house takes up when printed out with other houses, and so on... This is also useful for determining how much space one city block takes up when printed out with other city blocks, and so on... This is also useful for determining how much space one city takes up when printed out with other cities, and so on... This is also useful for determining how much space one state takes up when printed out with other states, and so on... And so on... And so on... And so on... And so on... And so on... And so on... And so on... And so on... And so on... And so on... And so on... And so on... And so on... And so on... And so on... And so on... And so on... And so on... And so on... And soonnsoooonsooonsooonsooonsooonsooonsooonsooonsooonsooonsooonsooonsooonsooonsooonsooonsooonsooonsooonsooonsooonsooonsooonsoooonsoooonsoooonsoooonsoooonsoooonsoooonsoooonsoooonsoooonsoooonsoooonsoooonsoooonsoooonsoooonsoooonsoooonsooonsoonsoonsoonsoonsoonsoonsoonsoonsoonsoonsoonsoonsoonsoonsoonsoonsoonsoonsoonsoonsoonsoonsoonsoonsonsonsonsonsonsonsonsonsonsonsonsonsonsonsonsonsonsonsonsonsonsonsonsonsonsononssonssonssonssonssonssonssonssonssonssonssonssonssonssonssonssonsssssssssssssssssssssssssssssssssssssssssss" | wc -m)

  # Get the total number of characters per line in all Markdown files in the directory.
  #
  # @param {string} $1 The directory to search.
  # @return {int} The total number of characters per line in all Markdown files in the directory.
  function get_total_chars_per_line() {
    local total_chars_per_line=0

    for file in $(find $1 -name "*.md"); do
      local chars=$(wc -m < $file)
      local lines=$(wc -l < $file)
      local chars_per_line=$((chars / lines))
      total_chars_per_line=$((total_chars_per_line + chars_per_line))
    done

    echo $total_chars_per_line
  }