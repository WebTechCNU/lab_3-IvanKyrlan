const images = [
	{
		src: './Photos/Photo-1.jpeg',
		alt: 'Товар 1',
		description: 'Кофта чоловіча',
		price: '390 ₴',
		classname: 'male'
	},

	{
		src: './Photos/Photo-2.jpeg',
		alt: 'Товар 2',
		description: 'Куртка жіноча',
		price: '490 ₴',
		classname: 'female'
	},

	{
		src: './Photos/Photo-3.jpeg',
		alt: 'Товар 3',
		description: 'Куртка чоловіча',
		price: '790 ₴',
		classname: 'male'
	},

	{
		src: './Photos/Photo-4.jpeg',
		alt: 'Товар 4',
		description: 'Штани чоловічі',
		price: '690 ₴',
		classname: 'male'
	},

	{
		src: './Photos/Photo-5.jpeg',
		alt: 'Товар 5',
		description: 'Джинси жіночі',
		price: '350 ₴',
		classname: 'female'
	},

	{
		src: './Photos/Photo-6.jpeg',
		alt: 'Товар 6',
		description: 'Кеди чоловічі',
		price: '990 ₴',
		classname: 'male'
	},

	{
		src: './Photos/Photo-7.jpeg',
		alt: 'Товар 7',
		description: 'Джинсовка жіноча',
		price: '550 ₴',
		classname: 'female'
	},

	{
		src: './Photos/Photo-8.jpeg',
		alt: 'Товар 8',
		description: 'Кросівки жіночі',
		price: '1990 ₴',
		classname: 'female'
	}
];

const imagesContainer = document.getElementById('images-container');
const showImagesBtn = document.getElementById('show-images-btn');
const bannerImg = document.getElementById('banner-image');

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
		alert('Товар додано в кошик');
		cart.classList.add('active');
	});
}

const filterButtons = document.getElementById('filter-btn');
const footer = document.getElementById('footer');
const goodsBtn = document.getElementById('goodsBtn');

showImagesBtn.addEventListener('click', function () {
	showImagesBtn.classList.add('d-none');
	bannerImg.classList.add('d-none');
	footer.classList.remove('d-none');

	filterButtons.classList.remove('d-none');
	images.forEach(function (image) {
		addImageToContainer(image);
	});
});

goodsBtn.addEventListener('click', function () {
	showImagesBtn.classList.add('d-none');
	bannerImg.classList.add('d-none');
	footer.classList.remove('d-none');

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

//Кнопка Уверх
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

	//Плавна анімація переходу догори
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

//Кнопки для фільтрів
let buttons = document.querySelectorAll('.btn-outline-secondary');

function handleClick(event) {
	let target = event.target;

	if (!target.classList.contains('active')) {
		buttons.forEach(function (button) {
			button.classList.remove('active');
		});

		target.classList.add('active');
	}
}

buttons.forEach(function (button) {
	button.addEventListener('click', handleClick);
});

//Кошик
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

	//Зміна кількості товару
	var quantityInputs = document.getElementsByClassName('cart-quantity');
	for (var i = 0; i < quantityInputs.length; i++) {
		var input = quantityInputs[i];
		input.addEventListener('change', quantityChanged);
	}
	//Додавання товару в кошик
	var addCart = document.getElementsByClassName('add-cart');
	for (var i = 0; i < addCart.length; i++) {
		var button = addCart[i];
		button.addEventListener('click', addCartClicked);
	}
	// Кнопка Купити
	document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);
}
//Кнопка Купити
function buyButtonClicked() {
	alert('Ваше замовлення успішно оформлено');
	let cartContent = document.getElementsByClassName('cart-content')[0]
	while (cartContent.hasChildNodes()) {
		cartContent.removeChild(cartContent.firstChild);
	}
	updateTotal();
}

//Видалення товару з кошика
function removeCartItem(event) {
	var buttonClicked = event.target;
	buttonClicked.parentElement.remove();
	updateTotal();
}

//Зміна кількості товару
function quantityChanged(event) {
	var input = event.target;
	if (isNaN(input.value) || input.value <= 0) {
		input.value = 1;
	}
	updateTotal();
}

//Додавання в кошик
function addCartClicked(event) {
	var button = event.target;
	var shopProducts = button.parentElement;
	var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
	var price = shopProducts.getElementsByClassName('price')[0].innerText;
	var productImg = shopProducts.getElementsByClassName('product-image')[0].src;
	addProductToCart(title, price, productImg);
	updateTotal();
	// let cart = document.querySelector("#cart");
	// let newElem = "<div>Item : " + title + "; price: " + price + "; </div>";
	// cart.innerHTML += newElem;
}

function addProductToCart(title, price, productImg) {
	let cartShopBox = document.createElement('div');
	cartShopBox.classList.add('cart-box');
	let cartItems = document.getElementsByClassName('cart-content')[0];
	let cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
	for (var i = 0; i < cartItemsNames.length; i++) {
		if (cartItemsNames[i].innerText == title) {
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
	cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
	cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
}
//Сума
function updateTotal() {
	var cartContent = document.getElementsByClassName('cart-content')[0]
	var cartBoxes = cartContent.getElementsByClassName('cart-box');
	var total = 0;
	for (var i = 0; i < cartBoxes.length; i++) {
		var cartBox = cartBoxes[i];
		var priceElement = cartBox.getElementsByClassName('cart-price')[0]
		var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0]
		var price = parseFloat(priceElement.innerText.replace('₴', ''));
		var quantity = quantityElement.value;
		total = total + price * quantity;
	}
	total = Math.round(total * 100) / 100;

	document.getElementsByClassName('total-price')[0].innerText = total + ' ₴';
}