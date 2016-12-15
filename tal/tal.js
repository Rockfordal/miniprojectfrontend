// var voice = 0; // UK English Male
var voice = 2; // US English Male
var text = "Hello there";

speech = new SpeechSynthesisUtterance(text);
speech.voice = speechSynthesis.getVoices()[voice];
speechSynthesis.speak(speech);
