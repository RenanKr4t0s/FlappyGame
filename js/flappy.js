const main = document.querySelector('[tp-flappy]');

function novoElemento(tagName,className){
    const elem = document.createElement(tagName);
    elem.className = className;
    return elem
}
function Barreira(superior = false){
    this.elemento = novoElemento('div','pipe');
    const borda = novoElemento('div','pipe-border');
    const corpo = novoElemento('div','pipe-body');
    this.elemento.appendChild(superior ? corpo : borda);
    this.elemento.appendChild(superior ? borda : corpo);
    this.setAltura = altura => corpo.style.height = `${altura}px`
}

// const b = new Barreira(true);
// b.setAltura(200);
// main.appendChild(b.elemento);

function ParDeBarreiras(altura,abertura,x){
    this.elemento = novoElemento('div','two-pipes');
    this.superior = new Barreira(true);
    this.inferior = new Barreira(false);
    this.elemento.appendChild(this.superior.elemento);
    this.elemento.appendChild(this.inferior.elemento);
    this.sortearAbertura = ()=>{
        const alturaSuperior = Math.random()*(altura - abertura);
        const alturaInferior = altura - abertura - alturaSuperior;
        this.superior.setAltura(alturaSuperior);
        this.inferior.setAltura(alturaInferior);
    }
    this.getX = ()=>parseInt(this.elemento.style.left.split('px'));
    this.setX = x =>this.elemento.style.left= `${x}px`;
    this.getLargura = ()=> this.elemento.clientWidth;
    this.sortearAbertura();
    this.setX(x);
}

// const b = new ParDeBarreiras(600,300,1190);
// main.appendChild(b.elemento);

function BarreirasProntas(altura,largura,abertura,espaco,notificarPonto){
    this.pares = [
        new ParDeBarreiras(altura,abertura,largura),
        new ParDeBarreiras(altura,abertura,largura+espaco),
        new ParDeBarreiras(altura,abertura,largura+espaco*2),
        new ParDeBarreiras(altura,abertura,largura+espaco*3),
    ];
    const deslocamento = 3;

    this.animar = ()=>{
        this.pares.forEach(par=>{
            par.setX(par.getX()-deslocamento)
            if(par.getX()<par.getLargura()){
                par.setX(par.getX()+espaco*this.pares.length)
                par.sortearAbertura()
            }

            const meio = largura/2;
            const cruzouMeio = par.getX()+deslocamento>= meio && par.getX()< meio
            if(cruzouMeio) notificarPonto()
        })
    }
}
const barreiras = new BarreirasProntas (400,1500,200,400)
barreiras.pares.forEach(par =>
    main.appendChild(par.elemento)
)
setInterval(()=>{
    barreiras.animar()
}, 20)