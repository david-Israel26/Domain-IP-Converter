//Funcion que recibe el dominio como parametro
async function fetchIPAddress(domain) {
  const response = await fetch(
    `https://cloudflare-dns.com/dns-query?name=${domain}&type=A`,
    {
      headers: {
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
let domain = document.getElementById('domain');
let ipSpan = document.getElementById('ip');
let convertBtn = document.getElementById('convert');

convertBtn.addEventListener('click', async (event) => {
  const ipAddress = await fetchIPAddress(domain.value);
  console.log(`Data: ${ipAddress}`);
  ipSpan.innerText = !ipAddress
    ? 'something went wrong in fetchIPAddress'
    : ipAddress;
});
