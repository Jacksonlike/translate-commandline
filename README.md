<div align="center">

# translate-commandline

A command line tool that you can translate everything!

[![NPM version](https://img.shields.io/npm/v/translate-commandline.svg?style=flat-square)](https://npmjs.org/package/translate-commandline) [![NPM downloads](http://img.shields.io/npm/dm/translate-commandline.svg?style=flat-square)](https://npmjs.org/package/translate-commandline)

![0eXJ8U.md.png](https://s1.ax1x.com/2020/10/13/0hRGMn.png)

</div>

## Install

```bash
npm install -g translate-commandline
```

## Usage

```text
translate <words> [tag] [options]
t <words> [tag] [options]
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

Using "-p" or "--proception" option will play the English pronunciation if `word` is English and [`mplayer`](http://www.mplayerhq.hu/design7/dload.html) is installed.

For example:

```bash
$ translate "day by day"
-  day by day  ~  cn.bing.com

日复一日  [ rì fù yí rì ]


$ translate 伤心 ko
-  伤心  ~  cn.bing.com

슬프다.

$ t test -p
-  test   ~   cn.bing.com

test   美 [test]   英 [test]

  v.   试验；测试；检测；测验
  n.   试验；检测；考试；测验
 网络  检验；考验；睾酮(testosterone)

复数：tests  过去式：tested  现在分词：testing
```

## Features

- [x] Translation of any languages
- [x] Support [cn.bing.com](https://cn.bing.com/translator/)
- [x] Support play the English pronunciation
