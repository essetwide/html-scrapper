const { HTMLScrapper } = require('../index');

function removeBlank(elt) {
    return elt.text().replace(/\\n/g, ' ').replace(/\s+/g, ' ').trim();
}

function toNumber(elt) {
    return parseFloat(elt.text().replace(',', '.'));
}

const scrapper = new HTMLScrapper({
    model: {
        addressee: { // OK
            name: "#DestRem tr:nth-child(1) > td:nth-child(1) > span",
            cpf: "#DestRem tr:nth-child(2) > td:nth-child(1) > span"
        },
        payee: {
            name: "#Emitente tr:nth-child(1) > td:nth-child(2) > span",
            socialName: "#Emitente tr:nth-child(1) > td:nth-child(1) > span",
            cnpj: "#Emitente tr:nth-child(2) > td:nth-child(1) > span",
            phone: "#Emitente tr:nth-child(4) > td:nth-child(2) > span",
            address: {
                street: {
                    _$: "#Emitente tr:nth-child(2) > td:nth-child(2) > span",
                    _formatter: removeBlank,
                },
                neighborhood: "#Emitente tr:nth-child(3) > td:nth-child(1) > span",
                city: {
                    _$: "#Emitente tr:nth-child(4) > td:nth-child(1) > span",
                    _formatter: removeBlank,
                },
                state: "#Emitente tr:nth-child(5) > td:nth-child(1) > span",
                cep: "#Emitente tr:nth-child(3) > td:nth-child(2) > span"
            }
        },
        products: { // OK
            _scope: "#Prod .toggle.box",
            _merge: {
                _scope: "#Prod .toggable.box",
                code: "td > table:first-child tr:nth-child(1) > td:nth-child(1) > span",
                ncm: "td > table:first-child tr:nth-child(1) > td:nth-child(2) > span",
                cest: "td > table:first-child tr:nth-child(1) > td:nth-child(3) > span",

                cfop: "td > table:first-child tr:nth-child(2) > td:nth-child(2) > span",

                discount: {
                    _$: "td > table:first-child tr:nth-child(3) > td:nth-child(1) > span",
                    _formatter: toNumber,
                },

                commercialEAN: "td > table:nth-of-type(2) tr:nth-child(2) > td:nth-child(1) > span",
                price: {
                    _$: "td > table:nth-of-type(2) tr:nth-child(4) > td:nth-child(1) > span",
                    _formatter: toNumber,
                }
            },
            description: ".fixo-prod-serv-descricao span",
            amount: {
                _$: ".fixo-prod-serv-qtd span",
                _formatter: toNumber
            },
            unity: ".fixo-prod-serv-uc span",
            total: {
                _$: ".fixo-prod-serv-vb span",
                _formatter: toNumber,
            },
        },
        payment: {
            value: {
                _$: "#Cobranca tr:nth-child(2) > td:nth-child(2) span",
                _formatter: toNumber,
            }, // OK
            mode: {
                _$: "#Cobranca tr:nth-child(2) > td:nth-child(1) span",
                _formatter: removeBlank,
            },
            brand: {
                _$: "#Cobranca tr:nth-child(2) > td:nth-child(5) span",
                _formatter: removeBlank
            }
        }
    }
});

scrapper.parse('https://www.sefaz.rs.gov.br/ASP/AAE_ROOT/NFE/SAT-WEB-NFE-COM_2.asp?chaveNFe=43180226571092000153653120000182811000245622&HML=false');