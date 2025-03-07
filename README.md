# Zettlr [_ˈset·lər_]
<a href="https://doi.org/10.5281/zenodo.2580173"><img src="https://zenodo.org/badge/DOI/10.5281/zenodo.2580173.svg" alt="DOI"></a> <a href="https://www.gnu.org/licenses/gpl-3.0"><img src="https://img.shields.io/badge/License-GPLv3-blue.svg" alt="License: GNU GPL v3"></a> <img alt="GitHub All Releases" src="https://img.shields.io/github/downloads/Zettlr/Zettlr/total.svg"> <a href="https://www.zettlr.com/download"><img alt="GitHub tag (latest by date)" src="https://img.shields.io/github/tag-date/Zettlr/Zettlr.svg?label=latest"></a>

![The central window of Zettlr](/resources/screenshots/zettlr_view.png)

With Zettlr, writing professional texts is easy and motivating: Whether you are a college student, a researcher, a journalist, or an author — Zettlr has the right tools for you. [Watch the video](https://www.youtube.com/watch?v=BJ27r6YGpAs) or continue reading to see what they are!

[Visit the Website.](https://zettlr.com/)

## Features

- File-agnostic writing: Enjoy **full control over your own files**
- Keep all your notes and texts **in one place** — searchable and accessible
- **Night Mode** support
- **Cite with Zettlr** using `citeproc` and your existing literature database
- **Code highlighting** for most contemporary programming languages
- Simple and beautiful **exports** with [Pandoc](https://pandoc.org/), [LaTeX](https://www.latex-project.org/), and [Textbundle](http://textbundle.org/)
- Support for state of the art knowledge management techniques (**Zettelkasten**)
- A revolutionary **search algorithm** with integrated heatmap

… and the best is: **Zettlr is [Open Source](https://en.wikipedia.org/wiki/Free_and_open-source_software)!**

## Get Zettlr

To install Zettlr, just [download the latest release](https://www.zettlr.com/download/) for your operating system! Currently supported are macOS, Windows, and Debian- and Fedora-based Linux systems. (And every other system _electron_ runs on, if you build the app yourself).

**Please also consider a [donation](https://paypal.me/hendrikerz)!**

## What next?

If you have downloaded Zettlr, [head over to our website](https://zettlr.com/docs) to get to know Zettlr. Refer to the [Quick Start Guide](https://zettlr.com/docs/quick-start), if you prefer to use software heads-on.

![The central window of Zettlr using the Night Theme](/resources/screenshots/zettlr_view_dark.png)

## Developing

Zettlr is an electron-based app, so to start developing, you'll need to have a [NodeJS](https://nodejs.org/)-stack on your computer installed. Make sure node and preferably [Yarn](https://yarnpkg.com/en/) are installed, which is the recommended package manager.

Then, simply clone the repository and install the dependencies on your local computer:

```bash
$ git clone https://github.com/Zettlr/Zettlr.git
$ cd Zettlr
$ yarn install # Or npm install
$ cd source
$ yarn install # Or npm install
```

_(Please note the second `yarn install`/`npm install` in the source directory. This is necessary to build the app locally.)_

There are four types of templates shipped with the app that need a rebuild once you change them: The stylesheets, which are written in [LESS](http://lesscss.org/), the HTML templates, written in [Handlebars.js](https://handlebarsjs.com/), and some components, written in [Vue.js](https://vuejs.org/). Additionally, the template for the [reveal.js](https://revealjs.com/)-presentations needs to be built prior to running the app. Whenever you make changes to any of these resources, you'll need to recompile them using an appropriate command:

```bash
$ yarn less # Or npm run less, this recompiles the stylesheets
$ yarn handlebars # Or npm run handlebars, this recompiles the templates
$ yarn wp:dev # Or npm run wp:dev, this recompiles the Vue components
$ yarn reveal:build # Or npm run reveal:build, needs to be run once
```

To dive deeper into the development process, have a look at our [full development documentation](https://docs.zettlr.com/get-involved).

## License

This software is licensed via the GNU GPL v3-License.

The brand (including name, icons and everything Zettlr can be identified with) is exluded and all rights reserved. If you want to fork Zettlr to develop another app, feel free but please change name and icons.
