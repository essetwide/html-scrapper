const { JSDOM } = require('jsdom');
const cheerio = require('cheerio');

class HTMLScrapper {

  constructor({ model, beforeOpen }) {
    this.model = model;
    this.beforeOpen = beforeOpen;
  }

  parse(url) {
    console.log('Parsing: ', url);

    return JSDOM.fromURL(url)
      .then(dom => {
        if (this.beforeOpen) this.beforeOpen(dom.window);
        const $ = cheerio.load(dom.serialize());

        let model = {};

        const parseIntoObject = (key, inModel, outModel, scope) => {
          if (typeof inModel[key] === 'object') {
            if (key === '_merge') {
              for (let mergeKey in inModel['_merge']) {
                parseIntoObject(mergeKey, inModel['_merge'], outModel, inModel['_merge']['_scope']);
              }
            }
            if (inModel[key]['_formatter'] && inModel[key]['_$']) {
              if (!!scope) {
                  const list = $(scope);
                  for (let i = 0; i < list.length; i++) {
                      outModel[i] = outModel[i] || {};
                      outModel[i][key] = inModel[key]['_formatter']($(inModel[key]['_$'], list[i]));
                  }
              } else outModel[key] = inModel[key]['_formatter']($(inModel[key]['_$']));
            } else for (let innerKey in inModel[key]) {
              if (innerKey !== '_scope' && key !== '_merge') {
                outModel[key] = outModel[key] || (!!inModel[key]['_scope'] ? [] : {});
                parseIntoObject(innerKey, inModel[key], outModel[key], inModel[key]['_scope']);
              }
            }
          } else {
            if (scope) {
              const list = $(scope);
              for (let i = 0; i < list.length; i++) {
                outModel[i] = outModel[i] || {};
                outModel[i][key] = $(inModel[key], list[i]).text();
              }
            } else outModel[key] = $(inModel[key]).text();

            console.log(key, scope, inModel[key], '=', outModel[key]);
            console.log('\n');
          }
        };

        for (let key in this.model) {
          parseIntoObject(key, this.model, model);
        }

        console.log(JSON.stringify(model, ' ', 2));
        return model;
      });
  }
}

module.exports = HTMLScrapper;
