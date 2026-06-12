function cadastrar() {
    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirmar = document.getElementById('confirmar').value;
    const erro = document.getElementById('erro');

    if (!nome || !sobrenome || !telefone || !email || !senha || !confirmar) {
    erro.textContent = 'Preencha todos os campos.';
    erro.style.display = 'block';
    return;
    }
    if (senha !== confirmar) {
    erro.textContent = 'As senhas não coincidem.';
    erro.style.display = 'block';
    return;
    }
    erro.style.display = 'none';
    alert('Cadastro realizado com sucesso!');
}