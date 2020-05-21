function darkmode(){
var options = {
    bottom: '64px', 
    right: '32px',  
    time: '1s', 
    mixColor: '#fff',
    backgroundColor: '#fff',  
    buttonColorDark: '#100f2c',  
    buttonColorLight: '#fff', 
    saveInCookies: false, 
    label: '🌓', 
    autoMatchOsTheme: true 
  }
  

  const darkmode = new Darkmode(options);
  darkmode.showWidget();
  document.getElementById("CbBtn").onclick = darkmode();
}