const getData = async (url) => {
	const data = await fetch(url)
	if (!data.ok) {
		console.error('Error')
	}
	return await data.json()
}

let cart = localStorage.getItem('cart')
	? JSON.parse(localStorage.getItem('cart'))
	: {}


let favs = localStorage.getItem('favs')
? JSON.parse(localStorage.getItem('favs'))
: []
const wrapper = document.querySelector('.products__wrapper')

function renderItems() {
   wrapper.innerHTML = ""
   getData('https://fakestoreapi.com/products').then((products) => {
	products.forEach((product) => {
      function con() {
         if(favs.includes(product.id)) {
            return `<i onclick='removeWish(${product.id})' class="fa fa-heart active" aria-hidden="true"></i>`
         } else {
            return `<i onclick='addWish(${product.id})' data-id=${product.id} class="fa fa-heart " aria-hidden="true"></i>`
         }
      }
		const element = `
      <div  class="wrapper">
         ${con()}
         <div class="product-img">
         <img src="${product.image}" height="420" width="327">
         </div>
         <div class="product-info">
         <div class="product-text">
            <h1>${product.title}</h1>
            <h2><strong>category</strong>${product.category}</h2>
            <div class="raiting">
               <div class="rate">raiting: <span>${product.rating.rate}</span></div>
               <div class="count">
                  rait: 
                  <span> ${product.rating.count}</span>
               </div>
            </div>
            <p>${product.description}</p>
         </div>
         <div class="product-price-btn">
            <p><span class="price">${product.price}</span>$</p>
            <button  onclick='addCart(${product.id})' type="button">add cart</button>
         </div>
      
         </div>
      </div>
      `
		wrapper.insertAdjacentHTML('beforeend', element)
	})
})
}

renderItems()

function addStorage(store, data) {
	localStorage.setItem(store, JSON.stringify(data))
}

function openModal(triggerSel, modalSel, activeClass, exitSel, activatedFunc) {
	const trigger = document.querySelector(triggerSel)
	const modal = document.querySelector(modalSel)
	const exit = document.querySelector(exitSel)
	trigger.addEventListener('click', () => {
		modal.classList.add(activeClass)
	})
	exit.addEventListener('click', () => {
		modal.classList.remove(activeClass)
	})

}

openModal('.mycart', '.cart__modal', 'cart__modal_active', '.cart_exit')
openModal('.mywish', '.whistList__modal', 'whistList__modal__active', '.whistList__modal__exit')


function count() {
   
   document.querySelector('.itemsCount').textContent = Object.keys(cart).length + ' items';
}
count()

function addCart(id) {
	if (!cart.hasOwnProperty(id)) {
		if(confirm("mehsul sebete elave edilsin?")) {
         cart[id] = 1
         addStorage('cart', cart)
         renderCart()
         count()
         alert("mehsul elave edildi")
      }
	}
	
}

function removeFromCart() {
   document.addEventListener('click', (e) => {
      if(e.target.classList.contains('delete')) {
        if(confirm("mehsulu sebetden silmek istediyinizden eminsinizmi?")) {
         e.target.closest('.cartEl').remove()
         let id = e.target.getAttribute('data-id');

         if (cart.hasOwnProperty(id)) {
           
            delete cart[id]
            addStorage('cart', cart)
            count()
            empty()
            alert("mehsul silindi")
         }
        }
       
      }
      
   })
  
}
removeFromCart()

function renderCart() {
   document.querySelector('.cartlist').innerHTML = "";
   let sum = 0
	Object.keys(cart).forEach((productId) => {
		getData('https://fakestoreapi.com/products/' + productId).then((res) => {
         sum+=res.price
			const productElem = `
         <div class="cartEl row mb-4 d-flex justify-content-between align-items-center">
         <div class="col-md-2 col-lg-2 col-xl-2">
           <img
             src="${res.image}"
             class="img-fluid rounded-3" alt="Cotton T-shirt">
         </div>
         <div class="col-md-3 col-lg-3 col-xl-3">
           <h6 class="text-muted">${res.category}</h6>
           <h6 class="text-black mb-0">${res.title}</h6>
         </div>
         <div class="buttons col-md-3 col-lg-3 col-xl-2 d-flex">
           <button class="btn btn-link px-2">
             <i data-id = ${res.id} class="fas fa-minus"></i>
           </button>

           <input id="form1" min="0" name="quantity" value="${cart[res.id]}" type="text"
             class="form-control quantity form-control-sm" />

           <button class="btn btn-link px-2">
             <i data-id = ${res.id} class="fas fa-plus"></i>
           </button>
         </div>
         <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
           <h6 class="mb-0">€ ${res.price}</h6>
         </div>
         <div class="col-md-1 col-lg-1 col-xl-1 text-end">
           <div class="text-muted"><i data-id = ${res.id} style="cursor: pointer" class="delete fas fa-times"></i></div>
         </div>
       </div>
         `

         document.querySelector('.cartlist').insertAdjacentHTML('beforeend', productElem)
         document.querySelector('.itemsAll').textContent = 'umumi qiymet: ' + sum + '$'
		})
	})
}
renderCart()

function renderFavs() {
   document.querySelector('.whistList__modal__box').innerHTML = "";

	favs.forEach((productId) => {
		getData('https://fakestoreapi.com/products/' + productId).then((res) => {

			const productElem = `
         <div class="cartEl row mb-4 d-flex justify-content-between align-items-center">
         <div class="col-md-2 col-lg-2 col-xl-2">
           <img
             src="${res.image}"
             class="img-fluid rounded-3" alt="Cotton T-shirt">
         </div>
         <div class="col-md-3 col-lg-3 col-xl-3">
           <h6 class="text-muted">${res.category}</h6>
           <h6 class="text-black mb-0">${res.title}</h6>
         </div>
      
         <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
           <h6 class="mb-0">€ ${res.price}</h6>
         </div>
         <div class="col-md-1 col-lg-1 col-xl-1 text-end">
           <div class="text-muted"><i data-id = ${res.id} style="cursor: pointer" class="deletefavs fas fa-times"></i></div>
         </div>
       </div>
         `

         document.querySelector('.whistList__modal__box').insertAdjacentHTML('beforeend', productElem)
        
		})
	})
   emptyFav()
}
renderFavs()

function increase() {
   document.addEventListener('click', (e) => {
      if(e.target.classList.contains('fa-plus')) {
         let id = e.target.getAttribute('data-id');
         if (cart.hasOwnProperty(id)) {
            e.target.closest('.buttons').querySelector('.quantity').value = +e.target.closest('.buttons').querySelector('.quantity').value + 1;
           
            cart[id]+=1
            addStorage('cart', cart)
            count()
        
        
         }
       
      }
      
   })

}

increase()


function empty() {
   if(Object.keys(cart).length<1) {
      document.querySelector('.itemsCount').textContent = "mehsul yoxdur";
      document.querySelector('.itemsAll').textContent = ""
   } 
 
}
empty()


function emptyFav() {
   if(favs.length<1) {
      document.querySelector('.whistList__modal__box__empty').textContent = "mehsul yoxdur";
   } else {
      document.querySelector('.whistList__modal__box__empty').textContent = "";
   }
}
emptyFav()
function decrase() {
   document.addEventListener('click', (e) => {
      if(e.target.classList.contains('fa-minus')) {
         let id = e.target.getAttribute('data-id');
         if (cart.hasOwnProperty(id)) {
            if(+e.target.closest('.buttons').querySelector('.quantity').value > 1) {
               e.target.closest('.buttons').querySelector('.quantity').value = +e.target.closest('.buttons').querySelector('.quantity').value - 1;
               cart[id]-=1
               addStorage('cart', cart)
               count()
               
            }

        
         }
       
      }
      
   })
   
}

decrase()








function removeFavs() {
   document.addEventListener('click', (e) => {
      if(e.target.classList.contains('deletefavs')) {
        if(confirm("mehsulu favorilerden silmek istediyinizden eminsinizmi?")) {
         e.target.closest('.cartEl').remove()
         let id = e.target.getAttribute('data-id');

         if (favs.includes(+id)) {
           
            favs = favs.filter(el => el != id)
            addStorage('favs', favs)
            renderItems()
            emptyFav()
            alert("mehsul silindi")
         }
        }
       
      }
      
   })
}
removeFavs()


function removeWish(id) {


      if (favs.includes(+id)) {
         if(confirm("mehsul favorilerden silinsin?")) {
            favs = favs.filter(el => el != id)
            addStorage('favs', favs)
            renderItems()
            renderFavs()
            emptyFav()
            alert("mehsul silindi")
         }
      }
	
}

function addWish(id) {
   if (!favs.includes(id)) {
		if(confirm("mehsul favorilere elave edilsin?")) {
         favs.push(id)
         addStorage('favs', favs)
         renderFavs()
         renderItems()
         alert("mehsul elave edildi")
         document.querySelector("")
      }
	}
}