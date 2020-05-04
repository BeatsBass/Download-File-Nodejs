'use strict'

const Fs = require('fs')
const Path = require('path')
const Axios = require('axios')

async function descargarArchivo(url) {
    Axios({
        url,
        method: 'GET',
        responseType: 'stream',
    }).then(response => {
        const name = response.headers['content-disposition'];
        const v = name.replace("filename=", '');
        const writer = Fs.createWriteStream(v);
        response.data.pipe(writer);
    });
}

const links = ["http://link.springer.com/openurl?genre=book&isbn=978-1-4612-1844-9", "http://link.springer.com/openurl?genre=book&isbn=978-3-540-77974-2", "http://link.springer.com/openurl?genre=book&isbn=978-1-4471-6684-9", "http://link.springer.com/openurl?genre=book&isbn=978-3-319-63588-0", "http://link.springer.com/openurl?genre=book&isbn=978-3-319-55444-0"]

const cambiar = () => {
    const salida = links.map(e => {
        const d = e.indexOf('openurl')
        const a = e.indexOf('bn=') + 3;
        const id = e.slice(a);
        const ini = e.slice(0, d);
        const ty = 'pdf';
        const link = ini + `content/${ty}/10.1007%2F${id}.${ty}`;
        return link
    })
    return salida;
}
const uu = cambiar();

async function Main(url) {
    await descargarArchivo(url).then(function (data) {
        console.log("ya");
    });
}
console.log(uu)
for (let i in uu) {
    Main(uu[i])
}