
//==================== Initial rendering of category list and product list. =========
let ul = document.getElementById("ul");

fetch("http://localhost:8080/ecommerce/api/v1/categories")
.then(res => res.json())
.then(json => {
    json.map(cate => {
        ul.append(category_list(cate));
    })
})

function category_list(cate){
    let li = document.createElement('li');
    li.innerHTML = `<button onclick="callProducts(${cate.id})">${cate.name}</button>`;

    return li;
}

let productBody = document.getElementById("right");

fetch("http://localhost:8080/ecommerce/api/v1/products")
.then(res => res.json())
.then(json => {
    json.map(prod => {
        productBody.append(product_list(prod));
     })
 })
 
 function product_list(prod){
     let product = document.createElement('div');
     product.className = "product";
     product.setAttribute("id", "product");
     
     product.innerHTML = `
     <div class="prodImg"></div>
     <h4>${prod.name}</h4>
     <h4>Rs ${prod.price}</h4>
     `;
 
     return product;
 }
//**********************************************************************************







//================================= fetching the accessToken ======================
function togetToken(){

    fetch("http://localhost:8080/ecommerce/api/v1/auth/login")
    .then(res => res.json())
    .then(json => {
        let accessTokenId = json;
        console.log(accessTokenId);
        return;
    })
}

//**********************************************************************************








//============ Rendering the product as per the selected category ===================

function callProducts(id){
    removePreviousCategoryProd();
    fetch(`http://localhost:8080/ecommerce/api/v1/categories/${id}/products`)
    .then(res => res.json())
    .then(json => {
        json.map(prod => {
            productBody.append(product_list(prod));
        })
    })
}

function removePreviousCategoryProd(){
    while(true){
        const element = document.getElementById("product");
        if(element){
            element.remove();
        }else break;
    }
}

//**********************************************************************************







//==================================== Pop up ======================================

//create category button
document.querySelector("#show-create").addEventListener("click", function(){

    document.getElementById("formId").action = "/ecommerce/api/v1/categories";
    document.getElementById("formId").method = "POST";

    removeInputSections();

    let createCate = document.getElementById('formId');
    createCate.prepend(descriptionInput());
    createCate.prepend(nameInput());

    document.getElementById('form-h2').innerHTML = 'create a new category';
    document.querySelector(".popup").classList.add("active");

    document.getElementById('submit').innerHTML = 'Create';
});

//create product button
 document.querySelector("#createProd").addEventListener("click", function(){

    document.getElementById("formId").action = "/ecommerce/api/v1/products";
    document.getElementById("formId").method = "POST";

    removeInputSections();

    let createProd = document.getElementById('formId');
    createProd.prepend(descriptionInput());
    createProd.prepend(priceInput());
    createProd.prepend(nameInput());
    createProd.prepend(categoryIdInput());

    document.getElementById('form-h2').innerHTML = 'create a new product'
    document.querySelector(".popup").classList.add("active");

    document.getElementById('submit').innerHTML = 'Create';
});

//update product button
 document.querySelector("#updateProd").addEventListener("click", function(){
    document.getElementById("formId").action = "http://localhost:8080/ecommerce/api/v1/products/:id";
    document.getElementById("formId").method = "PUT";

    removeInputSections();

    let updateProd = document.getElementById('formId');
    updateProd.prepend(descriptionInput());
    updateProd.prepend(priceInput());
    updateProd.prepend(nameInput());
    updateProd.prepend(idInput());
    updateProd.prepend(categoryIdInput());

    document.getElementById('form-h2').innerHTML = 'update a product'
    document.querySelector(".popup").classList.add("active");

    document.getElementById('submit').innerHTML = 'Update';
});

//delete product button
 document.querySelector("#deleteProd").addEventListener("click", function(){

    document.getElementById("formId").action = "/ecommerce/api/v1/products/:id";
    document.getElementById("formId").method = "DELETE";

    removeInputSections();

    let deleteProd = document.getElementById('formId');
    deleteProd.prepend(idInput());

    document.getElementById('form-h2').innerHTML = 'delete a product'
    document.querySelector(".popup").classList.add("active");

    document.getElementById('submit').innerHTML = 'Delete';
});


//close pop up
document.querySelector(".popup .close-popup").addEventListener("click", function(){
    removeInputSections();
    document.querySelector(".popup").classList.remove("active");
});


//******************************Sing-up, Log-in and Log-out*******************************

document.querySelector(".sign-up").addEventListener("click", function(){

    document.getElementById("formId").action = "/ecommerce/api/v1/auth/signup";
    document.getElementById("formId").method = "POST";

    removeInputSections();

    let SignUp_details = document.getElementById('formId');
    SignUp_details.prepend(roles());
    SignUp_details.prepend(pswd());
    SignUp_details.prepend(emailId());
    SignUp_details.prepend(username());

    document.getElementById('form-h2').innerHTML = 'Sign up'
    document.querySelector(".popup").classList.add("active");

    document.getElementById('submit').innerHTML = 'Sign Up';
});

document.querySelector(".log-in").addEventListener("click", function(){

    document.getElementById("formId").action = "/ecommerce/api/v1/auth/login";
    document.getElementById("formId").method = "POST";

    removeInputSections();

    let SignIn_details = document.getElementById('formId');
    SignIn_details.prepend(pswd());
    SignIn_details.prepend(username());

    document.getElementById('form-h2').innerHTML = 'log-in'
    document.querySelector(".popup").classList.add("active");

    document.getElementById('submit').innerHTML = 'log-in';

});

document.querySelector(".log-out").addEventListener("click", function(){

    document.getElementById("formId").action = "/ecommerce/api/v1/auth/logout";
    document.getElementById("formId").method = "POST";

    document.querySelector(".sign-up").classList.remove("sign-up-deactive");
    document.querySelector(".log-in").classList.remove("log-in-deactive");
    document.querySelector(".log-out").classList.remove("log-out-active");
});


document.querySelector(".log-in").addEventListener("submit", function(){
    document.querySelector(".sign-up").classList.add("sign-up-deactive");
    document.querySelector(".log-in").classList.add("log-in-deactive");
    document.querySelector(".log-out").classList.add("log-out-active");
});
document.querySelector(".log-out").addEventListener("submit", function(){
    document.querySelector(".sign-up").classList.remove("sign-up-deactive");
    document.querySelector(".log-in").classList.remove("log-in-deactive");
    document.querySelector(".log-out").classList.remove("log-out-active");
});


//==================================================================================









//**********************************************************************************







//===================================================================================
function nameInput(){
    let div = document.createElement('div');
    div.className = "form-element";
    div.setAttribute('id','form-element');

    div.innerHTML = `
    <label for="name">name</label>
    <input name="name", type="text" id="name" placeholder="enter name">
    `;

    return div;
}
function descriptionInput(){
    let div = document.createElement('div');
    div.className = "form-element";
    div.setAttribute('id','form-element');

    div.innerHTML = `
    <label for="description">description</label>
    <input name="description", type="text" id="description" placeholder="enter description">
    `;
    
    return div;
}
function priceInput(){
    let div = document.createElement('div');
    div.className = "form-element";
    div.setAttribute('id','form-element');

    div.innerHTML = `
    <label for="price">price</label>
    <input name="price", type="text" id="price" placeholder="enter price">
    `;
    
    return div;
}
function idInput(){
    let div = document.createElement('div');
    div.className = "form-element";
    div.setAttribute('id','form-element');

    div.innerHTML = `
    <label for="id">id</label>
    <input name="id", type="text" id="id" placeholder="enter id">
    `;
    
    return div;
}

function categoryIdInput(){
    let div = document.createElement('div');
    div.className = "form-element";
    div.setAttribute('id','form-element');

    div.innerHTML = `
    <label for="categoryId">categoryId</label>
    <input name="categoryId", type="text" id="categoryId" placeholder="enter categoryId">
    `;
    
    return div;
}

function username(){
    let div = document.createElement('div');
    div.className = "form-element";
    div.setAttribute('id','form-element');

    div.innerHTML = `
    <label for="username">username</label>
    <input name="username", type="text" id="username" placeholder="enter username">
    `;
    
    return div;
}

function emailId(){
    let div = document.createElement('div');
    div.className = "form-element";
    div.setAttribute('id','form-element');

    div.innerHTML = `
    <label for="email">email</label>
    <input name="email", type="text" id="email" placeholder="enter email id">
    `;
    
    return div;
}

function pswd(){
    let div = document.createElement('div');
    div.className = "form-element";
    div.setAttribute('id','form-element');

    div.innerHTML = `
    <label for="password">password</label>
    <input name="password", type="text" id="password" placeholder="enter password">
    `;
    
    return div;
}

function roles(){
    let div = document.createElement('div');
    div.className = "form-element";
    div.setAttribute('id','form-element');

    div.innerHTML = `
    <label for="roles">roles</label>
    <input name="roles", type="text" id="roles" placeholder="enter roles">
    `;
    
    return div;
}

function removeInputSections(){
   while(document.contains(document.getElementById("form-element"))){
       document.getElementById("form-element").remove();
   }  
   return; 
}
//**********************************************************************************
