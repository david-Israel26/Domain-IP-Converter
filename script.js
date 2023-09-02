//Funcion que recibe el dominio como parametro
async function fetchIPAddress(domain) {
  const response = await fetch(
    `https://cloudflare-dns.com/dns-query?name=${domain}&type=A`,
    {
      headers: {
        //Contenido esperado -> JSON
        accept: 'application/dns-json',
      },
    }
  );
  const responseObject = await response.json();
  for (const record of responseObject.Answer) {
    return record.data;
  }
  return null;
}

//Obteniendo la referencia a la caja de texto
//Obten el elemento html con id domain y asignalo a la variable domain
let domain = document.getElementById('domain');
//Obten el elemento html con id ip y asignalo a la variable ipSpan
let ipSpan = document.getElementById('ip');
//Obten el elemento html con id convert y asignalo a la variable convertBtn
let convertBtn = document.getElementById('convert');

//Evento click utilizando callbacks con una arrow function
convertBtn.addEventListener('click', async (event) => {
  //Espera a obtener el valor del dominio
  const ipAddress = await fetchIPAddress(domain.value);
  //Envialo a la consola
  console.log(`Data: ${ipAddress}`);
  //En caso de algun error mostrar el mensaje
  ipSpan.innerText = !ipAddress
    ? 'something went wrong in fetchIPAddress'
    : ipAddress;
});
