/* ==========================
   ハンバーガーメニュー
========================== */

const menuBtn =
document.getElementById("menuBtn");

const nav =
document.getElementById("nav");

if(menuBtn){

menuBtn.addEventListener("click",()=>{

nav.classList.toggle("show");

});

}

/* ==========================
   ダークモード
========================== */

const darkBtn =
document.getElementById("darkBtn");

if(localStorage.getItem("theme")==="dark"){

document.body.classList.add("dark");

}

if(darkBtn){

darkBtn.addEventListener("click",()=>{

document.body.classList.toggle("dark");

if(
document.body.classList.contains("dark")
){

localStorage.setItem(
"theme",
"dark"
);

}else{

localStorage.setItem(
"theme",
"light"
);

}

});

}

/* ==========================
   スクロールアニメーション
========================== */

const cards =
document.querySelectorAll(
".card,.group-card"
);

const observer =
new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add(
"show"
);

}

});

},

{
threshold:.1
}

);

cards.forEach(card=>{

observer.observe(card);

});

/* ==========================
   検索機能
========================== */

const searchInput =
document.getElementById("search");

if(searchInput){

searchInput.addEventListener(
"keyup",

()=>{

const keyword =
searchInput.value.toLowerCase();

document
.querySelectorAll(
".searchable"
)
.forEach(item=>{

const text =
item.innerText.toLowerCase();

item.style.display =
text.includes(keyword)
? ""
: "none";

});

}

);

}

/* ==========================
   PWA登録
========================== */

if(
"serviceWorker"
in navigator
){

window.addEventListener(

"load",

()=>{

navigator.serviceWorker.register(
"sw.js"
);

}

);

}