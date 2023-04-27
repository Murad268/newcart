const getData = async (url) => {
   const data = await fetch(url);
   if(!data.ok) {
      console.error ("Error")
   } 
   return await data.json();
}



const wrapper = document.querySelector('.products__wrapper');
getData('https://fakestoreapi.com/products').then(products => {
   products.forEach(product => {
      const element = 
      `
      <div class="wrapper">
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
            <button onclick='addCart(${product.id})' type="button">add cart</button>
         </div>
         </div>
      </div>
      `
      wrapper.insertAdjacentHTML("beforeend", element)
   })
})


function addCart(id) {
  
   let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
   if(!cart.hasOwnProperty(id)) {
      alert("elave edildi")
      cart[id] = 1
   }
   localStorage.setItem('cart', JSON.stringify(cart));
   empty()
}

function openModal(triggerSel, modalSel, activeClass, exitSel, activatedFunc) {
   const trigger = document.querySelector(triggerSel);
   const modal = document.querySelector(modalSel);
   const exit = document.querySelector(exitSel);
   trigger.addEventListener('click', () => {
      modal.classList.add(activeClass)
      activatedFunc()
   })
   exit.addEventListener('click', () => {
      modal.classList.remove(activeClass)
   })
   empty()
}

openModal('.mycart', '.cart__modal', 'cart__modal_active', '.cart_exit', cartItems);




function cartItems() {
   document.querySelector(".cart__modal__box").innerHTML = ''
   let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
   let sum = 0
   let spinner = 
      `
      <div class="spinner-border" role="status">
         <span class="visually-hidden">Loading...</span>
      </div>
      `
      document.querySelector('.cart__modal__box').insertAdjacentHTML('beforeend', spinner)
   Object.keys(cart).forEach(el => {
      
      getData('https://fakestoreapi.com/products/'+el).then(res =>  {
         document.querySelector('.spinner-border').remove()
         const div1 = document.createElement('div');
         div1.classList.add('cart__modal__box__el');


         const div2 = document.createElement('div');
         div2.classList.add('cart__modal__box__el__img');

         const img = document.createElement('img');
         img.src = res.image;
         img.alt = '';


         div2.appendChild(img);


         const div3 = document.createElement('div');
         div3.classList.add('cart__modal__box__el__name');
         div3.textContent = res.title;


         


         const div7 = document.createElement('div');
         div7.classList.add('cart__modal__box__el__minus');
         div7.textContent = '-';
         const div8 = document.createElement('div');
         div7.classList.add('delete');
         div8.textContent = 'delete'
         div8.addEventListener('click', (e) => {
            e.target.parentElement.remove()
            deleteFromCart(res.id)
         })
         sum += +res.price
        div9 = document.createElement('div');
        div9.classList.add("all_price");
       
       
         div1.appendChild(div2);
         div1.appendChild(div3);
  
         div1.appendChild(div8)
         div1.appendChild(div9)
         document.querySelector('.cart__modal__box').appendChild(div1)
         document.querySelector('.all_price').textContent = sum+" $"
      });   
   })
   empty()
}




function increase() {
   document.addEventListener('click', (e) => {
      if(e.target.classList.contains('cart__modal__box__el__plus')) {
         e.target.parentElement.querySelector('.cart__modal__box__el__cur').textContent = +e.target.parentElement.querySelector('.cart__modal__box__el__cur').textContent + 1
      }
   })

}

increase()



function decrease() {
   document.addEventListener('click', (e) => {
      if(e.target.classList.contains('cart__modal__box__el__minus')) {
         if( +e.target.parentElement.querySelector('.cart__modal__box__el__cur').textContent > 0) {
            e.target.parentElement.querySelector('.cart__modal__box__el__cur').textContent = +e.target.parentElement.querySelector('.cart__modal__box__el__cur').textContent - 1
         }
        
      }
   })
}

decrease()


function deleteFromCart(id) {
  
   let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
   
      delete cart[id]
  
   localStorage.setItem('cart', JSON.stringify(cart));
    alert('silindi')
   empty()
}


function empty() {
   
  
   let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
   if(Object.keys(cart).length < 1) {
      let empty = document.createElement('div');
      empty.classList.add('empty');
      document.querySelector('.cart__modal__box').appendChild(empty)
      document.querySelector(".empty").textContent = "Siyahi bosdur"
   } else {
      document.querySelector(".empty").textContent = ""
   }
}

empty()