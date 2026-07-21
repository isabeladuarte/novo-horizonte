// Troca de campo no formulário
document.getElementById('next-field').addEventListener('click', function() {
    // Selecionando os campos do formulário
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const telefoneInput = document.getElementById('telefone');
    const idadeInput = document.getElementById('idade');
    const cepInput = document.getElementById('cep');

    // Selececionando as sessões do formulário para exibir/esconder
    const nomeField = document.querySelector('.nome-field');
    const emailField = document.querySelector('.email-field');
    const telefoneField = document.querySelector('.telefone-field');
    const idadeField = document.querySelector('.idade-field');
    const cepField = document.querySelector('.cep-field');

    while(nomeInput.value === '' && nomeField.style.display !== 'none') {
        alert('Preencha o campo nome!');
        nomeInput.focus();
        return;
    }

    while(nomeInput.value !== '' && nomeField.style.display !== 'none') {
        nomeField.style.display = 'none';
        emailField.style.display = 'block';
        emailInput.focus();
        return;
    }

    if (emailField.style.display !== 'none') { 
        emailField.style.display = 'none';
        telefoneField.style.display = 'block';
        telefoneInput.focus();
        return;
    }

    if (telefoneField.style.display !== 'none') {
        telefoneField.style.display = 'none';
        idadeField.style.display = 'block';
        idadeInput.focus();
        return;
    }

    while(idadeInput.value === '' && idadeField.style.display !== 'none') {
        alert('Preencha o campo idade!');
        idadeInput.focus();
        return;
    } 

    if (idadeInput.value < 14 || idadeInput.value > 20) {
        alert('Desculpe, você não pode se inscrever.');
        idadeInput.focus();
        return;
    } else {
        idadeField.style.display = 'none';
        cepField.style.display = 'block';
        cepInput.focus();
    }

});