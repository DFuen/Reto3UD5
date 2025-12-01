async function buscar() {
    const id = document.getElementById('identificador').value.trim();
    const mensajeError = document.getElementById('mensajeError');
    const resultado = document.getElementById('resultado');
    
    mensajeError.textContent = '';
    mensajeError.classList.remove('visible');
    resultado.innerHTML = '';
    
    const validacion = /^\d{1,2}$/;
    
    if (!id) {
        mensajeError.textContent = 'El campo es obligatorio';
        mensajeError.classList.add('visible');
        return;
    }
    
    if (!validacion.test(id)) {
        mensajeError.textContent = 'Escribe un número de 1 o 2 cifras (1-99)';
        mensajeError.classList.add('visible');
        return;
    }
    
    resultado.innerHTML = '<div class="cargando">Cargando...</div>';
    
    try {
        const respuesta = await fetch(`https://www.swapi.tech/api/people/${id}/`);
        
        if (!respuesta.ok) {
            throw new Error(`Personaje con ID ${id} no encontrado`);
        }
        
        const datos = await respuesta.json();
        const personaje = datos.result.properties;
        
        resultado.innerHTML = `
            <div class="character-card">
                <h2>${personaje.name}</h2>
                <div class="character-info">
                    <div class="info-item">
                        <span class="label">Altura:</span>
                        <span class="value">${personaje.height} cm</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Masa:</span>
                        <span class="value">${personaje.mass} kg</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Género:</span>
                        <span class="value">${personaje.gender}</span>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('identificador').value = '';
        
        
    } catch (error) {
        resultado.innerHTML = '';
        mensajeError.textContent = error.message;
        mensajeError.classList.add('visible');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const botonBuscar = document.getElementById('botonBuscar');
    if (botonBuscar) {
        botonBuscar.addEventListener('click', buscar);
    }
    
    const inputId = document.getElementById('identificador');
    if (inputId) {
        inputId.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                buscar();
            }
        });
    }
});