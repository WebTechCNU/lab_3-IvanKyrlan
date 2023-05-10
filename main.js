const images = [
	{
		src: './Photos/Photo-1.jpeg',
		alt: 'Товар 1',
		description: 'Кофта чоловіча',
		price: '390 грн',
		classname: 'male',
		category: 1,
		quantity: 310
	},

	{
		src: './Photos/Photo-2.jpeg',
		alt: 'Товар 2',
		description: 'Куртка жіноча',
		price: '490 грн',
		classname: 'female',
		category: 2,
		quantity: 159
	},

	{
		src: './Photos/Photo-3.jpeg',
		alt: 'Товар 3',
		description: 'Куртка чоловіча',
		price: '790 грн',
		classname: 'male',
		category: 2,
		quantity: 28
	},

	{
		src: './Photos/Photo-4.jpeg',
		alt: 'Товар 4',
		description: 'Штани чоловічі',
		price: '690 грн',
		classname: 'male',
		category: 1,
		quantity: 114
	},

	{
		src: './Photos/Photo-5.jpeg',
		alt: 'Товар 5',
		description: 'Джинси жіночі',
		price: '350 грн',
		classname: 'female',
		category: 1,
		quantity: 80
	},

	{
		src: './Photos/Photo-6.jpeg',
		alt: 'Товар 6',
		description: 'Кеди чоловічі',
		price: '990 грн',
		classname: 'male',
		category: 2,
		quantity: 97
	},

	{
		src: './Photos/Photo-7.jpeg',
		alt: 'Товар 7',
		description: 'Джинсовка жіноча',
		price: '550 грн',
		classname: 'female',
		category: 1,
		quantity: 13
	},

	{
		src: './Photos/Photo-8.jpeg',
		alt: 'Товар 8',
		description: 'Кросівки жіночі',
		price: '1990 грн',
		classname: 'female',
		category: 2,
		quantity: 300
	}
];

const imagesContainer = document.getElementById('images-container');
const showImagesBtn = document.getElementById('show-images-btn');
const bannerImg = document.getElementById('banner-image');

// Ціновий діапазон товарів
let rangeInput = document.querySelector('#range');
let sortedArray = images.sort(sortPrice);
let maxPrice = Number(sortedArray[sortedArray.length - 1].price.split(' ')[0]) + 1;
let minPrice = Number(sortedArray[0].price.split(' ')[0]) + 1;
rangeInput.min = minPrice;
rangeInput.max = maxPrice;
rangeInput.defaultValue = maxPrice;

// Функція для додавання зображення та опису до контейнеру
function addImageToContainer(image) {
	const imageCol = document.createElement('div');
	imageCol.classList.add('col-md-4', 'my-5', 'box');
	imageCol.classList.add(image.classname);
	imageCol.classList.add('product-box');

	const img = document.createElement('img');
	img.src = image.src;
	img.alt = image.alt;
	img.classList.add('w-75');
	img.classList.add('product-image');

	const description = document.createElement('p');
	description.textContent = image.description;
	description.classList.add('d-none');
	description.classList.add('m-3');
	description.classList.add('product-title');

	const price = document.createElement('p');
	price.textContent = image.price;
	price.classList.add('p-3');
	price.classList.add('price');

	const button = document.createElement('button');
	button.innerHTML = 'Купити';
	button.classList.add('btn');
	button.classList.add('btn-success');
	button.classList.add('add-cart');
	button.addEventListener("click", addCartClicked)

	imageCol.appendChild(img);
	imageCol.appendChild(description);
	imageCol.appendChild(price);
	imageCol.appendChild(button);
	imagesContainer.appendChild(imageCol);

	// Обробник події на клік для опису
	description.addEventListener('click', function () {
		description.classList.toggle('d-none');
	});

	// Обробник події на клік для зображення
	img.addEventListener('click', function () {
		description.classList.toggle('d-none');
	});

	button.addEventListener('click', function () {
		cart.classList.add('active');
	});

}

const filterButtons = document.getElementById('filter-btn');
const footer = document.getElementById('footer');
const goodsBtn = document.getElementById('goodsBtn');
let newsContainer = document.getElementById('news-container');

showImagesBtn.addEventListener('click', function () {
	showImagesBtn.classList.add('d-none');
	bannerImg.classList.add('d-none');
	footer.classList.remove('d-none');
	newsContainer.classList.add('d-none');

	filterButtons.classList.remove('d-none');
	images.forEach(function (image) {
		addImageToContainer(image);
	});
});

goodsBtn.addEventListener('click', function () {
	showImagesBtn.classList.add('d-none');
	bannerImg.classList.add('d-none');
	footer.classList.remove('d-none');
	newsContainer.classList.add('d-none');

	filterButtons.classList.remove('d-none');
	images.forEach(function (image) {
		addImageToContainer(image);
	});
});

// Вікно з підпискою
setTimeout(function () {
	// Перевірка, чи користувач вже підписаний на повідомлення
	if (localStorage.getItem('subscribed') !== 'true') {
		let subscribeModal = new bootstrap.Modal(document.getElementById('subscribeModal'));
		subscribeModal.show();
		document.getElementById('subscribeButton').addEventListener('click', function () {
			// Зберігаємо інформацію про підписку у локальному сховищі
			localStorage.setItem('subscribed', 'true');
			subscribeModal.hide();
			alert('Дякуємо за підписку!');
		});
	}
}, 10000);

let advertismentModal = new bootstrap.Modal(document.getElementById('advertismentModal'));
let closeButton = document.getElementById('closeButton');
let timerMessage = document.getElementById('timer-message')
let timerElement = document.getElementById('timer');
let seconds = 15;

// Кнопка Уверх
const btnUp = document.getElementById('btnUp');

// Вікно з рекламою
window.onscroll = function () { scrollFunction() };
function scrollFunction() {
	let hasSeenAd = localStorage.getItem("hasSeenAd");

	if ((!hasSeenAd || hasSeenAd !== "true") && document.documentElement.scrollTop > 1000) {
		advertismentModal.show();
		localStorage.setItem("hasSeenAd", "true");

		let timer = setInterval(function () {
			seconds--;
			timerElement.innerText = seconds;
			if (seconds === 0) {
				clearInterval(timer);
				closeButton.removeAttribute("disabled");
				timerElement.classList.add("d-none");
				timerMessage.classList.add("d-none");
			}
		}, 1000);
	}

	if (document.documentElement.scrollTop > 500) {
		btnUp.classList.remove('d-none');
	}
	else {
		btnUp.classList.add('d-none');
	}

	// Плавна анімація переходу догори
	btnUp.addEventListener('click', function () {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	});
}

// Фільтри
document.querySelector('div.filter-btn').addEventListener('click', (event) => {
	if (event.target.tagName !== 'LI') return false;

	let filterClass = event.target.dataset['f'];

	let filterProducts = document.querySelectorAll('.box');

	Array.from(filterProducts).forEach(elem => {
		elem.classList.remove('d-none');
		if (!elem.classList.contains(filterClass) && filterClass !== 'all') {
			elem.classList.add('d-none');
		}
	});
});

// Кошик
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

cartIcon.onclick = () => {
	cart.classList.add('active');
}

closeCart.onclick = () => {
	cart.classList.remove('active');
}

if (document.readyState == 'loading') {
	document.addEventListener('DOMContentLoaded', ready)
} else {
	ready();
}

function ready() {
	var removeCartButtons = document.getElementsByClassName('cart-remove');
	console.log(removeCartButtons);
	for (var i = 0; i < removeCartButtons.length; i++) {
		var button = removeCartButtons[i];
		button.addEventListener('click', removeCartItem);
	}

	// Зміна кількості товару
	var quantityInputs = document.getElementsByClassName('cart-quantity');
	for (var i = 0; i < quantityInputs.length; i++) {
		var input = quantityInputs[i];
		input.addEventListener('change', quantityChanged);
	}
	// Додавання товару в кошик
	var addCart = document.getElementsByClassName('add-cart');
	for (var i = 0; i < addCart.length; i++) {
		var button = addCart[i];
		button.addEventListener('click', addCartClicked);
	}
	// Кнопка Купити
	document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);
}
// Кнопка Купити
function buyButtonClicked() {
	alert('Ваше замовлення успішно оформлено');
	let cartContent = document.getElementsByClassName('cart-content')[0]
	while (cartContent.hasChildNodes()) {
		cartContent.removeChild(cartContent.firstChild);
	}
	updateTotal();
}

// Видалення товару з кошика
function removeCartItem(event) {
	var buttonClicked = event.target;
	buttonClicked.parentElement.remove();
	updateTotal();
}

// Зміна кількості товару
function quantityChanged(event) {
	var input = event.target;
	if (isNaN(input.value) || input.value <= 0) {
		input.value = 1;
	}
	updateTotal();
}

// Додавання в кошик
function addCartClicked(event) {
	var button = event.target;
	var shopProducts = button.parentElement;
	var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
	var price = shopProducts.getElementsByClassName('price')[0].innerText;
	var productImg = shopProducts.getElementsByClassName('product-image')[0].src;
	addProductToCart(title, price, productImg);
	updateTotal();
}

function addProductToCart(title, price, productImg) {
	let cartShopBox = document.createElement('div');
	cartShopBox.classList.add('cart-box');
	let cartItems = document.getElementsByClassName('cart-content')[0];
	let cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
	for (var i = 0; i < cartItemsNames.length; i++) {
		if (cartItemsNames[i].innerText.toLowerCase() == title.toLowerCase()) {
			alert('Ви вже додали цей товар у кошик');
			return;
		}
	}

	let cartBoxContent = `
					<img src="${productImg}" alt="" class="cart-img">
					<div class="detail-box">
						<div class="cart-product-title">${title}</div>
						<div class="cart-price">${price}</div>
						<input type="number" value="1" class="cart-quantity">
					</div>
					<i class="bi bi-trash-fill cart-remove"></i>`;

	cartShopBox.innerHTML = cartBoxContent;
	cartItems.append(cartShopBox);
	alert('Товар додано в кошик');
	cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
	cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
}

// Сума
function updateTotal() {
	var cartContent = document.getElementsByClassName('cart-content')[0]
	var cartBoxes = cartContent.getElementsByClassName('cart-box');
	var total = 0;
	for (var i = 0; i < cartBoxes.length; i++) {
		var cartBox = cartBoxes[i];
		var priceElement = cartBox.getElementsByClassName('cart-price')[0]
		var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0]
		var price = parseFloat(priceElement.innerText.replace('грн', ''));
		var quantity = quantityElement.value;
		total = total + price * quantity;
	}
	total = Math.round(total * 100) / 100;

	document.getElementsByClassName('total-price')[0].innerText = total + ' грн';
}

// Сортування товарів 
function sort(attribute) {
	imagesContainer.innerHTML = '';
	if (attribute == 'description') {
		images.sort(sortDescription);
	}
	else if (attribute == 'price') {
		images.sort(sortPrice);
	}
	images.forEach(function (image) {
		addImageToContainer(image);
	});
}

function sortDescription(a, b) {
	if (a.description < b.description) {
		return -1;
	}
	else if (a.description > b.description) {
		return 1;
	}
	else {
		return 0;
	}
}

function sortPrice(a, b) {
	if (Number(a.price.split(' ')[0]) < Number(b.price.split(' ')[0])) {
		return -1;
	}
	else if (Number(a.price.split(' ')[0]) > Number(b.price.split(' ')[0])) {
		return 1;
	}
	else {
		return 0;
	}
}

// Зміна цінового діапазону товарів
function changeRange() {
	let price = rangeInput.value;
	imagesContainer.innerHTML = '';
	document.querySelector('#text-range').innerHTML = price + ' грн';
	images.forEach(elem => {
		if (Number(elem.price.split(' ')[0]) < price) {
			addImageToContainer(elem);
		}
	});
}

// Новини
let newsArr = [
	{
		id: 1,
		title: "Святкові образи",
		text: "Наближаються свята, і ми готові допомогти вам створити найкращий образ на Різдво та Новий рік. У нас ви знайдете все необхідне для святкового настрою - від елегантних суконь до вечірнього одягу та аксесуарів. Оберіть свій образ для найкращих святкових фото та насолоджуйтесь святами в повному обсязі.",
		date: new Date(2022, 11, 17, 1, 10),
		img: './Photos/News-1.jpeg'

	},

	{
		id: 2,
		title: "Нові поставки взуття",
		text: "Перевірте нові моделі та виберіть ті, які підійдуть саме вам. З нашим взуттям ви будете виглядати стильно і відчувати себе комфортно.",
		date: new Date(2023, 1, 5, 1, 10),
		img: './Photos/News-2.jpeg'
	},

	{
		id: 3,
		title: "Розпродаж зимового одягу",
		text: "Знижки до -50% на зимову колекцію - це відмінна нагода поповнити свій гардероб якісним і теплим одягом від провідних брендів. Зробіть замовлення вже сьогодні та економте на покупках.",
		date: new Date(2023, 2, 1, 1, 10),
		img: './Photos/News-3.jpeg'
	},

	{
		id: 4,
		title: "Нова колекція весна-літо 2023",
		text: "Дізнайтеся про найяскравіші тенденції сезону, додайте до свого гардеробу нові луки, які підкреслять вашу унікальність.",
		date: new Date(2023, 4, 12, 1, 10),
		img: './Photos/News-4.jpeg'
	}
]

function sortNews(a, b) {
	if (a.date < b.date) {
		return -1;
	}
	if (a.date > b.date) {
		return 1;
	}
	return 0;
}

function loadToCenter(id) {
	let news = newsArr.find(elem => elem.id == id);
	let mainContainer = document.querySelector("#news-item");
	mainContainer.innerHTML = "<h3>" + news.title + "</h3> <p>" + news.date.toDateString() + "</p> <img src = " + news.img + " class='w-75 m-3 rounded'><p class='m-3'>" + news.text + "</p>"
}

let newsIndex = 0;
let intervalID;

function loadNews() {
	let newsSorted = newsArr.sort(sortNews);
	let newsContainer = document.querySelector("#news-list");
	let todayDate = new Date();
	let currentMonth = todayDate.getMonth();
	let out = "";
	newsSorted.forEach((elem) => {
		if (elem.date.getMonth() == currentMonth) {
			out +=
				'<a href=#news-item onclick=loadToCenter(' +
				elem.id +
				') class="list-group-item list-group-item-action bg-secondary border-light active"> <div class="d - flex w - 100 justify - content - between"> <h5>' +
				elem.title +
				"</h5> <small>" +
				elem.date.toDateString() +
				"</small> </div> </a>";
		} else {
			out +=
				'<a href=#news-item onclick=loadToCenter(' +
				elem.id +
				') class="list-group-item list-group-item-action"> <div class="d - flex w - 100 justify - content - between"> <h5>' +
				elem.title +
				"</h5> <small>" +
				elem.date.toDateString() +
				"</small> </div> </a>";
		}
	});
	newsContainer.innerHTML = out;

	newsIndex = newsSorted.length - 1;
	loadToCenter(newsSorted[newsIndex].id);
	intervalID = setInterval(changeNews, 10000);
}

function changeNews() {
	let newsSorted = newsArr.sort(sortNews);
	let newsCount = newsSorted.length;
	newsIndex = (newsIndex + 1) % newsCount;
	loadToCenter(newsSorted[newsIndex].id);
}

loadNews();

// Графіки
// Кругова діаграма
const maleProducts = images.filter((item) => item.classname === 'male').length;
const femaleProducts = images.filter((item) => item.classname === 'female').length;

new Chart("pieChart", {
	type: 'pie',
	data: {
		labels: ['Чоловічі товари', 'Жіночі товари'],
		datasets: [{
			data: [maleProducts, femaleProducts],
			backgroundColor: [
				'rgba(54, 162, 235, 0.6)',
				'rgba(255, 99, 132, 0.6)'
			]
		}]
	},
	options: {
		title: {
			display: true,
			text: 'Популярність товарів за типом'
		}
	}
});

// Гістограма
const prices = images.map((item) => parseFloat(item.price));
new Chart("barChart", {
	type: 'bar',
	data: {
		labels: images.map((item) => item.description),
		datasets: [{
			label: 'Ціна, грн',
			data: prices,
			backgroundColor: 'rgba(54, 162, 235, 0.6)'
		}]
	},
	options: {
		title: {
			display: true,
			text: 'Популярність товарів за ціною'
		},
	}
});

// Лінійний графік
const maleProductsCount = [];
const femaleProductsCount = [];
images.forEach((item, index) => {
	const maleCount = images.slice(0, index + 1).filter((item) => item.classname === 'male').length;
	const femaleCount = images.slice(0, index + 1).filter((item) => item.classname === 'female').length;
	maleProductsCount.push(maleCount);
	femaleProductsCount.push(femaleCount);
});

new Chart("lineChart", {
	type: 'line',
	data: {
		labels: images.map((item) => item.description),
		datasets: [{
			label: 'Чоловічі товари',
			data: maleProductsCount,
			borderColor: 'rgba(255, 99, 132, 0.6)',
			fill: false
		}, {
			label: 'Жіночі товари',
			data: femaleProductsCount,
			borderColor: 'rgba(54, 162, 235, 0.6)',
			fill: false
		}]
	},
	options: {
		title: {
			display: true,
			text: 'Популярність товарів за типом'
		},
	}
});

function showGraph(chartId) {
	document.getElementById('pieChart').classList.add('d-none');
	document.getElementById('barChart').classList.add('d-none');
	document.getElementById('lineChart').classList.add('d-none');
	document.getElementById(chartId).classList.remove('d-none');
}
