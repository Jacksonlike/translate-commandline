<div align="center">

# translate-commandline

A command line tool that you can translate everything!

</div>

## Install

```bash
npm install -g translate-commandline
```

## Usage

```text
translate <words> [into]
```

or

```text
t <words> [into]
```

`translate-commandline` supports translation of any languages power by [cn.bing.com](https://cn.bing.com/translator/).

If `words` is English or Chinese, you can omit `into` parameter.

For example:

```bash
$ translate "day by day"
-  day by day   ~   cn.bing.com

日复一日  [ rì fù yí rì ]


$ translate 伤心 ko
-  伤心   ~   cn.bing.com

슬프다.
```

## Features

- [x] Translation of any languages
- [x] Support [cn.bing.com](https://cn.bing.com/translator/)
- [ ] Support [fanyi.youdao.com](http://fanyi.youdao.com/)
- [ ] Support [fanyi.baidu.com](https://fanyi.baidu.com/)
- [ ] Support [translate.google.cn](https://translate.google.cn/)

