# html-scrapper

A HTML to JSON scrapper based on a Headless Browser navigation.

## Usage

``` js
import { Navigation } from '@essetwide/html-scrapper';

const scrapper = new Navigation({
    model: {
        addressee: {
            name: "#DestRem tr:nth-child(1) > td:nth-child(1) > span"
            cpf: "#DestRem tr:nth-child(2) > td:nth-child(1) > span"
        },
        payee: {
            name: "#Emitente tr:nth-child(1) > td:nth-child(2) > span",
            socialName: "#Emitente tr:nth-child(1) > td:nth-child(1) > span",
            cnpj: "#Emitente tr:nth-child(2) > td:nth-child(1) > span",
            phone: "#Emitente tr:nth-child(4) > td:nth-child(2) > span",
            address: {
                street: "#Emitente tr:nth-child(2) > td:nth-child(2) > span",
                neighborhood: "#Emitente tr:nth-child(3) > td:nth-child(1) > span",
                city: "#Emitente tr:nth-child(4) > td:nth-child(1) > span",
                state: "#Emitente tr:nth-child(5) > td:nth-child(1) > span",
                cep: "#Emitente tr:nth-child(3) > td:nth-child(2) > span"
            }
        },
        products: {
            _scope: "#Prod .toggle.box"
            _merge: {
                _scope: "#Prod .toggable.box"
            }
            code: "td > table:first-child tr:nth-child(1) > td:nth-child(1) > span",
            ncm: "td > table:first-child tr:nth-child(1) > td:nth-child(2) > span",
            cest: "td > table:first-child tr:nth-child(1) > td:nth-child(3) > span",
            cfop: "td > table:first-child tr:nth-child(2) > td:nth-child(2) > span",
            discount: "td > table:first-child tr:nth-child(3) > td:nth-child(1) > span",
            comercialEAN: "td > table:nth-of-type(2) > tbody > tr:nth-of-type(2) > td:nth-child(1) > span",
            price: "td > table:nth-of-type(2) > tbody > tr:nth-of-type(4) > td:nth-child(1) > span"
        },
        payment: {
            value: "#Cobranca tr:nth-child(2) > td:nth-child(2) span",
            mode: "#Cobranca tr:nth-child(2) > td:nth-child(1) span",
            brand: "#Cobranca tr:nth-child(2) > td:nth-child(5) span"
        }
    },
    beforeOpen: function(jsdomWindow) {
        jsdomWindow.
    }
});

scrapper.parse();
```