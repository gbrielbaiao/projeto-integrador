function entrar() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const erro = document.getElementById('erro');
    if (!email || !senha) {
        erro.style.display = 'block';
        return;
    }
    erro.style.display = 'none';
    alert('Login realizado com sucesso!');
}