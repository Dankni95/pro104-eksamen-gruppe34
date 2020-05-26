function newPage(page) {
	setLocalStorage(`currentPage`, `${page}`);
	document.location.href = "MainPage/mainpage.html";
}

function frontPage() {
	removeStorage("currentPage");
}