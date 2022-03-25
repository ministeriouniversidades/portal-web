$(document).ready(function () {
	// Call this function to add cookies configuration
	cookiesConfig();	
});
	
function cookiesConfig() {
	// Accept cookies selected by the user when click 'GUARDAR CONFIGURACIÓN' 
	$('#customize-cookies').click(function (ev) {
		ev.preventDefault();
		setCookie('usuario_mci', 'sesion_iniciada', 365);
		if($('#cookies-analitica')[0].checked){
			googleTagAnalitics();					
		}
	});
	// Accept all cookies when click 'PERMITIR TODAS' 
	$('#accept-cookies').click(function (ev) {
		ev.preventDefault();
		setCookie('usuario_mci', 'sesion_iniciada', 365);
		googleTagAnalitics();		
	});
	// Accept all cookies when click 'PERMITIR TODAS' on PopUp modal
	$('#accept-modal-cookies').click(function (ev) {
		ev.preventDefault();
		setCookie('usuario_mci', 'sesion_iniciada', 365);
		googleTagAnalitics();	
	});
}

// Read cookies
function readCookie(cname) {
	var nameEQ = cname + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}

//  Set cookie
function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = (exdays == '') ? '' : 'expires=' + d.toUTCString() + ';';
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

//  Delete cookie
function deleteCookie(cname) {
	if (readCookie(cname) != null) {
		document.cookie = cname + "= ;expires=Thu, 01-Jan-70 00:00:01 GMT; Path=/;domain={{ .Site.BaseURL }}";
	}
}

// Check if cookie is exist to display cookie-notice
if (readCookie('usuario_mci')==null){
	document.getElementById('cookie-notice').style.display = 'block';
}

// Call the google analytics gtag from gtag.js + need to chnage id* with your google analytics id
function googleTagAnalitics() {
	window.dataLayer = window.dataLayer || [];
	function gtag(){dataLayer.push(arguments);}
	gtag('js', new Date());
	gtag('config', 'G-W2SY010Y15');
}