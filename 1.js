navigator.mediaDevices.getUserMedia({ audio: true })
  .then(stream => {
          isRecording.value = true;
          showAudioMaxBox.value = true
          audioChunks.value = [];
          const audioContext = new AudioContext();
          let silenceStart = Date.now();
          mediaRecorder.value = new MediaRecorder(stream);
          mediaRecorder.value.ondataavailable = function(e) {
            audioChunks.value.push(e.data);
          };


     mediaRecorder.value.onstop = async () => {
            const audioBlob = new Blob(audioChunks.value, { type: 'audio/mpeg' });
            const audioUrl = URL.createObjectURL(audioBlob);
            console.log('stop')
            audioBase64.value = await audioConvertBase64(audioBlob);
            console.log('audioBase64.value,,,',audioBase64.value)
          };

  mediaRecorder.value.start();

})
.catch(error => {
          console.log('无法访问麦克风:', error);
 });