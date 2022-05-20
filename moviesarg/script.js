let pagina = 1;
const btnAnterior = document.querySelector("#anterior");
const btnSiguiente = document.querySelector("#siguiente");

btnSiguiente.addEventListener("click", () => {
    if(pagina < 1000){
        pagina += 1;
        cargarPeliculas();
    }
})

btnAnterior.addEventListener("click", () => {
    if(pagina > 1){
        pagina -= 1;
        cargarPeliculas();
    }
})

enviar.addEventListener("click", (e) => {
    e.preventDefault();
    buscarPeliculas();
})

const cargarPeliculas = async ()=>{
    try {
    const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=eae3401c25d6e61559d8ad2bdf741a33&page=${pagina}`)
    const datos = await respuesta.json();

    console.log(datos)
    
    let peliculas = ``;
    datos.results.forEach(pelicula => {
        peliculas += `
        <div class="pelicula">
            <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" alt="poster">
            <h3 class="titulo">${pelicula.title}</h3>
            <p class="puntaje">Rating: <b>${pelicula.vote_average}</b></p>
        </div>`
        
    });

    document.getElementById('contenedor').innerHTML = peliculas;

    }
    catch (error){
    console.log(error)
    }
}

const buscarPeliculas = async ()=>{
    let value = document.getElementById("input-search").value;
    try {
    const respuesta = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=eae3401c25d6e61559d8ad2bdf741a33&language=en-US&query=${value}&page=${pagina}&include_adult=false`)
    const datos = await respuesta.json();

    console.log(datos)
    
    let peliculas = ``;
    datos.results.forEach(pelicula => {
        peliculas += `
        <div class="pelicula">
            <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" alt="poster">
            <h3 class="titulo">${pelicula.title}</h3>
            <p class="puntaje">Rating: <b>${pelicula.vote_average}</b></p>
        </div>`
        
    });

    document.getElementById('contenedor').innerHTML = peliculas;

    }
    catch (error){
    console.log(error)
    }
}

    

cargarPeliculas()