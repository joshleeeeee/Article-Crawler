# Article crawler

## Introduction

> A script for my dear brother

Article crawlers are used to crawl a deal of articles of websit and merge them into a PDF.

Currently only `5118.com` crawler strategy.

## Dependencies

- typescript 4.7.4
- puppeteer 15.3.2
- easy-pdf-merge 0.2.6

## Usage

### Requirement

- Node.js 14+ 
- cnpm (You can: `npm install -g cnpm`)
### Quick start

1. Clone the Git repository locally

``` bash
git clone https://github.com/Ysat619/Article-Crawler.git
```

2. Go to the repository folder

```
cd Article-Crawler
```

3. Install node.js dependency.

``` bash
cnpm install
```

**Please make sure the installation is complate successful.** You can use `npm list` to check installation was successful.

4. Run project

``` bash
# compile typescript project
npm run build

# run crawler
npm run serve
```

## TODO
- Optimize crawler speed. Considider using multi-thread.
- ...

## Disclaimers
The applications involved in this article are for learning and exchange purposes only, and may not be used for any commercial purposes. The data comes from public content on the Internet, and no private and privileged information (personal information, etc.) is obtained. I have no responsibility for any legal disputes arising from this! It is prohibited to use the technology in this article or the source code of the Github project associated with this article for any purpose.
