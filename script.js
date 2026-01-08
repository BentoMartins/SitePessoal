document.addEventListener('DOMContentLoaded', function() {
    const filtroBtns = document.querySelectorAll('.filtro-btn');
    const certificados = document.querySelectorAll('.certificado-item');
    const verMaisBtn = document.getElementById('verMaisBtn');
    const verMaisTexto = verMaisBtn.querySelector('.ver-mais-texto');
    let expandido = false;

    function contarCertificadosCategoria(categoria) {
        let contador = 0;
        certificados.forEach(certificado => {
            const categoriaCertificado = certificado.getAttribute('data-categoria');
            const categoriasArray = categoriaCertificado ? categoriaCertificado.split(' ') : [];
            if (categoriasArray.includes(categoria)) {
                contador++;
            }
        });
        return contador;
    }

    function filtrarCertificados(categoria) {
        let contadorMostrarInicial = 0;
        const totalCertificados = contarCertificadosCategoria(categoria);
        
        if (totalCertificados <= 3) {
            verMaisBtn.style.display = 'none';
        } else {
            verMaisBtn.style.display = 'flex';
        }
        
        certificados.forEach(certificado => {
            const categoriaCertificado = certificado.getAttribute('data-categoria');
            const categoriasArray = categoriaCertificado ? categoriaCertificado.split(' ') : [];
            const isOcultoInicial = certificado.classList.contains('oculto-inicial');
            const isMostrarInicial = certificado.classList.contains('mostrar-inicial');
            const correspondeFiltro = categoriasArray.includes(categoria);
            
            const isCategoriaPrincipal = categoriasArray.length > 0 && categoriasArray[0] === categoria;
            
            if (correspondeFiltro) {
                if (!expandido && isOcultoInicial) {
                    certificado.style.display = 'none';
                } else if (!expandido && isMostrarInicial) {
                    if (categoriasArray.length > 1 && !isCategoriaPrincipal) {
                        certificado.style.display = 'none';
                    } else {
                        if (contadorMostrarInicial < 3) {
                            certificado.style.display = 'block';
                            contadorMostrarInicial++;
                            setTimeout(() => {
                                certificado.style.opacity = '1';
                                certificado.style.transform = 'scale(1)';
                            }, 10);
                        } else {
                            certificado.style.display = 'none';
                        }
                    }
                } else {
                    certificado.style.display = 'block';
                    setTimeout(() => {
                        certificado.style.opacity = '1';
                        certificado.style.transform = 'scale(1)';
                    }, 10);
                }
            } else {
                certificado.style.opacity = '0';
                certificado.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    certificado.style.display = 'none';
                }, 300);
            }
        });
    }

    filtroBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const categoria = this.getAttribute('data-categoria');

            filtroBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            expandido = false;
            verMaisTexto.textContent = 'Ver mais';
            verMaisBtn.classList.remove('expandido');

            filtrarCertificados(categoria);
        });
    });

    verMaisBtn.addEventListener('click', function() {
        expandido = !expandido;
        const categoriaAtiva = document.querySelector('.filtro-btn.active').getAttribute('data-categoria');
        
        if (expandido) {
            verMaisTexto.textContent = 'Ver menos';
            verMaisBtn.classList.add('expandido');
            
            certificados.forEach(certificado => {
                const categoriaCertificado = certificado.getAttribute('data-categoria');
                const categoriasArray = categoriaCertificado ? categoriaCertificado.split(' ') : [];
                const correspondeFiltro = categoriasArray.includes(categoriaAtiva);
                
                if (correspondeFiltro) {
                    certificado.style.display = 'block';
                    setTimeout(() => {
                        certificado.style.opacity = '1';
                        certificado.style.transform = 'scale(1)';
                    }, 10);
                }
            });
        } else {
            verMaisTexto.textContent = 'Ver mais';
            verMaisBtn.classList.remove('expandido');
            
            filtrarCertificados(categoriaAtiva);
        }
    });

    filtrarCertificados('java');

    const modalCertificado = document.getElementById('modalCertificado');
    const imagemModal = document.getElementById('imagemModal');
    const fecharModal = document.getElementById('fecharModal');
    const linksCertificados = document.querySelectorAll('.certificado-link');

    linksCertificados.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const imagemSrc = this.getAttribute('data-imagem');
            imagemModal.src = imagemSrc;
            modalCertificado.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    fecharModal.addEventListener('click', function() {
        modalCertificado.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    modalCertificado.addEventListener('click', function(e) {
        if (e.target === modalCertificado) {
            modalCertificado.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalCertificado.style.display === 'flex') {
            modalCertificado.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

