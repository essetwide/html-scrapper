const { Navigation } = require('../index');

const scrapper = new Navigation({
    model: {
        addressee: { // OK
            name: "#DestRem tr:nth-child(1) > td:nth-child(1) > span",
            cpf: "#DestRem tr:nth-child(2) > td:nth-child(1) > span"
        },
        payee: {
            name: "#Emitente tr:nth-child(1) > td:nth-child(2) > span", // OK
            socialName: "#Emitente tr:nth-child(1) > td:nth-child(1) > span", // OK
            cnpj: "#Emitente tr:nth-child(2) > td:nth-child(1) > span", // OK
            phone: "#Emitente tr:nth-child(4) > td:nth-child(2) > span", // OK
            address: {
                street: "#Emitente tr:nth-child(2) > td:nth-child(2) > span", // REMOVER BRANCO
                neighborhood: "#Emitente tr:nth-child(3) > td:nth-child(1) > span", // OK
                city: "#Emitente tr:nth-child(4) > td:nth-child(1) > span", // REMOVER BRANCO
                state: "#Emitente tr:nth-child(5) > td:nth-child(1) > span", // OK
                cep: "#Emitente tr:nth-child(3) > td:nth-child(2) > span" // OK
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

                discount: "td > table:first-child tr:nth-child(3) > td:nth-child(1) > span",

                commercialEAN: "td > table:nth-of-type(2) tr:nth-child(2) > td:nth-child(1) > span",
                price: "td > table:nth-of-type(2) tr:nth-child(4) > td:nth-child(1) > span"
            },
            description: ".fixo-prod-serv-descricao span",
            amount: ".fixo-prod-serv-qtd span",
            unity: ".fixo-prod-serv-uc span",
            total: ".fixo-prod-serv-vb span",
        },
        payment: {
            value: "#Cobranca tr:nth-child(2) > td:nth-child(2) span", // OK
            mode: "#Cobranca tr:nth-child(2) > td:nth-child(1) span", // REMOVER BRANCO
            brand: "#Cobranca tr:nth-child(2) > td:nth-child(5) span" // TESTAR
        }
    }
});

scrapper.parse('https://www.sefaz.rs.gov.br/ASP/AAE_ROOT/NFE/SAT-WEB-NFE-COM_2.asp?chaveNFe=43180226571092000153653120000182811000245622&HML=false');