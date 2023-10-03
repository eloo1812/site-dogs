var request = new XMLHttpRequest();
request.open ("get", "https://dog.ceo/api/breeds/image/random");
request.send ();

//acima estamos esperando pela resposta do servidor q deu success//


window.addEventListener("load", () => {
    const loadingScreen = document.querySelector(".loading-screen");
    loadingScreen.style.display = "none";
  });

document.addEventListener('DOMContentLoaded', function () {
    const breedSelect = document.getElementById('breed');
    const generateButton = document.getElementById('generate');
    const dogImage = document.getElementById('dog-image');
    const breedInfo = document.getElementById('breed-info');

    // Carrega a lista de raças de cachorro no menu suspenso
    fetch('https://api.thedogapi.com/v1/breeds')
        .then(response => response.json())
        .then(data => {
            data.forEach(breed => {
                const option = document.createElement('option');
                option.value = breed.id;
                option.textContent = breed.name;
                breedSelect.appendChild(option);
            });
        });

    // Função para carregar uma imagem aleatória da raça selecionada
    function loadRandomDogImage() {
        const selectedBreedId = breedSelect.value;
        fetch(`https://api.thedogapi.com/v1/images/search?breed_id=${selectedBreedId}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const imageUrl = data[0].url;
                    dogImage.src = imageUrl;
                }
            });
    }

    // Define um evento de clique para o botão "Gerar Cachorrinho"
    generateButton.addEventListener('click', loadRandomDogImage);
    

    // Carrega uma imagem aleatória quando a página é carregada pela primeira vez
    loadRandomDogImage();

    // Evento de alteração do menu suspenso para mostrar informações da raça
    breedSelect.addEventListener('change', function () {
        const selectedBreedId = breedSelect.value;
        fetch(`https://api.thedogapi.com/v1/breeds/${selectedBreedId}`)
            .then(response => response.json())
            .then(data => {
                breedInfo.innerHTML = `
                    <h2>Informações sobre a raça</h2>
                    <p><strong>Nome:</strong> ${data.name}</p>
                    <p><strong>Expectativa de Vida:</strong> ${data.life_span}</p>
                    <p><strong>Temperamento:</strong> ${data.temperament}</p>
                    <p><strong>Origem:</strong> ${data.origin}</p>
                `;
            });
    });
    window.addEventListener("scroll", function () {
        const scrollTop = window.scrollY;
        const parallaxElement = document.querySelector(".parallax-element");
        parallaxElement.style.transform = `translateY(${scrollTop * 0.4}px)`;
    });
});
