function newPage(page) {
	addStorage("current_page", page);
	console.log(getStorage("current_page") || "h");
	document.location.href = "/TaskPage/index.html";
}

function frontPage() {
	removeStorage("current_page");
}