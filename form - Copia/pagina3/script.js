window.onload = function () {
  var isLoading = false;
  var loadingInterval;
  var videoPlayer = document.getElementById('videoPlayer');
  var connectButton = document.getElementById('connectButton');
  var loadingButton = document.getElementById('loadingButton');
  var videoContainer = document.getElementById('videoContainer');
  var audio = new Audio('./audio/conectando os dispositov.mp3');

  // Definindo o volume para 50%
  audio.volume = 0.5;

  function startLoading() {
    console.log('Botão clicado');
    if (!isLoading) {
      isLoading = true;
      connectButton.style.opacity = '0';
      loadingButton.style.display = 'inline-block';
      videoContainer.style.opacity = '1';
      videoContainer.style.visibility = 'visible';
      videoPlayer.play();
      audio.play();
      loadingInterval = setInterval(function () {
        loadingButton.innerHTML = 'Conectando.';
        setTimeout(function () {
          loadingButton.innerHTML = 'Conectando..';
        }, 500);
        setTimeout(function () {
          loadingButton.innerHTML = 'Conectando...';
        }, 1000);
      }, 1500);
    }
  }

  function onVideoEnded() {
    clearInterval(loadingInterval);
    connectButton.innerHTML = 'Conectado';
    connectButton.style.backgroundColor = '#2ecc71';
    connectButton.style.opacity = '1';
    loadingButton.style.display = 'none';
    videoPlayer.pause();
    audio.pause();
  }

  connectButton.classList.add('hovered');
  
  connectButton.addEventListener('mouseover', function () {
    connectButton.classList.add('hovered');
  });

  connectButton.addEventListener('mouseout', function () {
    connectButton.classList.remove('hovered');
  });

  connectButton.addEventListener('click', startLoading);
  videoPlayer.addEventListener('ended', onVideoEnded);
};
