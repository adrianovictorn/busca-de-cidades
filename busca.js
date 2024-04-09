const ufSearchButton = document.getElementById('ufSearchButton');
const citySearchButton = document.getElementById('citySearchButton');
const resultsDiv = document.getElementById('results');

ufSearchButton.addEventListener('click', async () => {
    const ufInput = document.getElementById('ufInput').value.trim().toUpperCase();
    if (!ufInput) {
        alert('Por favor, insira a sigla do estado (UF) para buscar.');
        return;
    }

    try {
        const estadosResponse = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
        const estadosData = await estadosResponse.json();
        const estado = estadosData.find(estado => estado.sigla === ufInput);
        if (estado) {
            const municipiosResponse = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado.id}/municipios`);
            const municipiosData = await municipiosResponse.json();
            const municipios = municipiosData.map(municipio => municipio.nome);
            displayResults(municipios);
        } else {
            displayResults(['UF não encontrado']);
        }
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        alert('Ocorreu um erro ao buscar os dados. Por favor, tente novamente mais tarde.');
    }
});

citySearchButton.addEventListener('click', async () => {
    const cityInput = document.getElementById('cityInput').value.trim();
    if (!cityInput) {
        alert('Por favor, insira o nome do município para buscar.');
        return;
    }

    try {
        const municipiosResponse = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/municipios`);
        const municipiosData = await municipiosResponse.json();
        const cidade = municipiosData.find(municipio => municipio.nome.toLowerCase() === cityInput.toLowerCase());
        if (cidade) {
            displayResults([cidade.nome]);
            alert('Municipio encontrado com Sucesso !')
        } else {
            displayResults(['Município não encontrado']);
        }
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        alert('Ocorreu um erro ao buscar os dados. Por favor, tente novamente mais tarde.');
    }
});

function displayResults(results) {
    resultsDiv.innerHTML = '';

    const resultList = document.createElement('ul');
    results.forEach(result => {
        const resultItem = document.createElement('li');
        resultItem.textContent = result;
        resultList.appendChild(resultItem);
    });
    resultsDiv.appendChild(resultList);
}