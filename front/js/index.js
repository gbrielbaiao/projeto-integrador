function buscar() {
    const termo = document.getElementById('busca').value.toLowerCase();
    document.querySelectorAll('.card').forEach(card => {
        const texto = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = texto.includes(termo) ? '' : 'none';
    });
}