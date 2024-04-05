const urlUF = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
const cidade = document.getElementById('city')
const uf = document.getElementById ("uf");

uf.addEventListener('change', async function(){
    const urlCidade = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/' +uf.value+ '/municipios'
    const request = await fetch(urlCidade)
    const response = await request.json()
    
    let options = ''
    response.forEach(function(cidades){
        options += '<option>'+cidades.nome+'</option>'
    })

    city.innerHTML = options
})

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