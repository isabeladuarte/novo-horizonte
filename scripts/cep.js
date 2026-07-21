document.querySelector('#btnConsulta').addEventListener('click', function(){
    const cep = document.querySelector('#cep').value.replace(/\D/g, '');
    // condição para campo em branco
    if(cep != ""){
        const validaCep = /^[0-9]{8}$/;
        // condição para certificar que o cep tenha apenas numeros e até 8 caracteres
        if(validaCep.test(cep)){
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                let outLogradouro = "";
                outLogradouro += JSON.stringify(data.logradouro, null, 2);
                document.getElementById("logradouro").innerHTML = outLogradouro;

                let outBairro = "";
                outBairro += JSON.stringify(data.bairro, null, 2);
                document.getElementById("bairro").innerHTML = outBairro;

                let outLocalidade = "";
                outLocalidade += JSON.stringify(data.localidade, null, 2);
                document.getElementById("localidade").innerHTML = outLocalidade;

                let outUf = "";
                outUf += JSON.stringify(data.uf, null, 2);
                document.getElementById("uf").innerHTML = outUf;
            })
        }else{
            alert("CEP inválido");
        }
    }else{
        alert('Preencha o campo "CEP"');
    }

});
