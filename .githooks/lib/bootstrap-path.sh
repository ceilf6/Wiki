#!/bin/sh

# GUI/非登录 shell 常丢失 Homebrew 等包管理器 PATH，导致 git hooks 找不到 git-lfs。
ensure_lab_tool_path() {
  add_path_dir() {
    case ":$PATH:" in
      *":$1:"*)
        ;;
      *)
        PATH="$1${PATH:+:$PATH}"
        ;;
    esac
  }

  for dir in \
    /opt/homebrew/bin \
    /opt/homebrew/sbin \
    /usr/local/bin \
    /usr/local/sbin \
    /opt/local/bin \
    /opt/local/sbin
  do
    [ -d "$dir" ] && add_path_dir "$dir"
  done

  export PATH
}
