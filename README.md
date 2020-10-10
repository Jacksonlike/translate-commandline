<div align="center">

# translate-commandline

A command line tool that you can translate everything!

[![NPM version](https://img.shields.io/npm/v/translate-commandline.svg?style=flat-square)](https://npmjs.org/package/translate-commandline) [![NPM downloads](http://img.shields.io/npm/dm/translate-commandline.svg?style=flat-square)](https://npmjs.org/package/translate-commandline)

![0eXJ8U.md.png](https://s1.ax1x.com/2020/09/29/0eXJ8U.png)

</div>

## Install

```bash
npm install -g translate-commandline
```

## Usage

```text
translate <words> [tag]
t <words> [tag]
```

It supports translation of many languages power by [cn.bing.com](https://cn.bing.com/translator/).

Supports language list:

| Tag     | language         |
| ------- | ---------------- |
| en      | English          |
| ru      | Русский          |
| tr      | Türkçe           |
| es      | Español          |
| ko      | 한국어           |
| sv      | Svenska          |
| it      | Italiano         |
| id      | Bahasa Indonesia |
| pl      | Polski           |
| ja      | 日本語           |
| fr      | Français         |
| he      | עברית            |
| hu      | Magyar           |
| vi      | Tiếng Việt       |
| th      | ไทย              |
| sk      | Slovenčina       |
| te      | తెలుగు           |
| uk      | Українська       |
| bg      | Български        |
| cs      | Čeština          |
| de      | Deutsch          |
| nl      | Nederlands       |
| nb      | Norsk            |
| fa      | فارسی            |
| ar      | العربية          |
| zh-Hant | 繁體中文         |
| zh-Hans | 简体中文         |

If `words` is English or Chinese, you can omit `into` parameter.

For example:

```bash
$ translate "day by day"
-  day by day  ~  cn.bing.com

日复一日  [ rì fù yí rì ]


$ translate 伤心 ko
-  伤心  ~  cn.bing.com

슬프다.
```

## Features

- [x] Translation of any languages
- [x] Support [cn.bing.com](https://cn.bing.com/translator/)
- [ ] Support [fanyi.youdao.com](http://fanyi.youdao.com/)
- [ ] Support [fanyi.baidu.com](https://fanyi.baidu.com/)
- [ ] Support [translate.google.cn](https://translate.google.cn/)
