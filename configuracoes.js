const urlUF = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
const cidade = document.getElementById('city');
const ufSelect = document.getElementById('uf');
const cityList = document.getElementById('cityList');

ufSelect.addEventListener('change', async function(){
    const uf = this.value;
    const urlCidade = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`;
    const request = await fetch(urlCidade);
    const response = await request.json();
    
    cityList.innerHTML = ''; 

    response.forEach(function(cidade){
        const option = document.createElement('option');
        option.value = cidade.nome;
        cityList.appendChild(option);
    });
});


window.addEventListener('load', async ()=>{
    const request = await fetch(urlUF);
    const response = await request.json();


    const options = document.createElement("optgroup");
    options.setAttribute('label', 'ufs')
    response.forEach(function(uf){
        console.log(uf.sigla)
        options.innerHTML += '<option>'+uf.sigla+'</option>'
    })

    uf.append(options)
})
