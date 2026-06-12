function cadastrar() {
    const nome = document.getElementById('nome').value.trim();
    const sobrenome = document.getElementById('sobrenome').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();
    const confirmar = document.getElementById('confirmar').value.trim();
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