const CHAVE_PIX = "68.334.425/0001-70";

const NOME_RECEBEDOR = "NOVO HORIZONTE";

const CIDADE_RECEBEDOR = "SAO PAULO";



const botoesValor = document.querySelectorAll(".valor-btn");

const inputValor = document.querySelector("#valor-personalizado");

const botaoGerar = document.querySelector("#gerar-pix");

const modal = document.querySelector("#modal-pix");

const fecharModal = document.querySelector("#fechar-modal");

const valorExibido = document.querySelector("#valor-exibido");

const pixCode = document.querySelector("#pix-code");

const botaoCopiar = document.querySelector("#copiar-pix");

const mensagemCopiado = document.querySelector("#mensagem-copiado");

const canvas = document.querySelector("#qrcode");


botoesValor.forEach(botao => {

    botao.addEventListener("click", () => {

        const valor = botao.dataset.valor;

        inputValor.value = valor;

    });

});



botaoGerar.addEventListener("click", () => {

    let valor = parseFloat(inputValor.value);

    if (!valor || valor <= 0) {

        alert("Digite um valor válido para realizar a doação.");

        return;

    }


    const pixPayload = gerarPixPayload(
        CHAVE_PIX,
        NOME_RECEBEDOR,
        CIDADE_RECEBEDOR,
        valor
    );


    pixCode.value = pixPayload;


    valorExibido.textContent =
        valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });


    gerarQRCode(pixPayload);


    modal.classList.add("ativo");

});



fecharModal.addEventListener("click", () => {

    modal.classList.remove("ativo");

});


modal.addEventListener("click", (event) => {

    if (event.target === modal) {

        modal.classList.remove("ativo");

    }

});



botaoCopiar.addEventListener("click", async () => {

    await navigator.clipboard.writeText(
        pixCode.value
    );


    mensagemCopiado.classList.add("exibir");


    setTimeout(() => {

        mensagemCopiado.classList.remove("exibir");

    }, 2000);

});


function gerarQRCode(payload) {

    const qr = new QRious({

        element: canvas,

        value: payload,

        size: 250

    });

}



function gerarPixPayload(
    chave,
    nome,
    cidade,
    valor
) {

    nome = removerAcentos(nome)
        .substring(0, 25)
        .toUpperCase();

    cidade = removerAcentos(cidade)
        .substring(0, 15)
        .toUpperCase();


    let payload = "";

    payload += "000201";

    payload += montarCampo(
        "26",
        montarMerchantAccount(chave)
    );

    payload += "52040000";

    payload += "5303986";

    payload += montarCampo(
        "54",
        valor.toFixed(2)
    );

    payload += "5802BR";

    payload += montarCampo(
        "59",
        nome
    );

    payload += montarCampo(
        "60",
        cidade
    );

    payload += montarCampo(
        "62",
        montarTxid()
    );

    payload += "6304";

    payload += crc16(payload);


    return payload;

}


function montarMerchantAccount(chave) {

    let gui = montarCampo(
        "00",
        "BR.GOV.BCB.PIX"
    );

    let chavePix = montarCampo(
        "01",
        chave
    );

    return gui + chavePix;

}


function montarTxid() {

    return montarCampo(
        "05",
        "***"
    );

}


function montarCampo(id, valor) {

    return (
        id +
        valor.length.toString().padStart(2, "0") +
        valor
    );

}


function crc16(payload) {

    let crc = 0xFFFF;

    for (let i = 0; i < payload.length; i++) {

        crc ^= payload.charCodeAt(i) << 8;

        for (let j = 0; j < 8; j++) {

            if ((crc & 0x8000) !== 0) {

                crc =
                    (crc << 1) ^
                    0x1021;

            } else {

                crc <<= 1;

            }

            crc &= 0xFFFF;

        }

    }

    return crc
        .toString(16)
        .toUpperCase()
        .padStart(4, "0");

}



function removerAcentos(texto) {

    return texto.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

}