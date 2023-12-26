//

var sectionBlks;

var navBar;
var navBarMobile;
var navBarCloned = false;

// active the nav button which corresponding section is in the viewport
function activeNavBtn() {
	const nav = document.querySelector("header#index-header nav#menu");
	const navMobile = document.querySelector("header#index-header nav#mobile-menu");
	async function judgeAndSet(b) {
		let id = b.getAttribute("id");
		let navBtn = document.querySelector('header#index-header nav#menu ul li a[js-data-id="'+id+'"]');
		let navBtnMobile = document.querySelector('header#index-header nav#mobile-menu ul li a[js-data-id="'+id+'"]');
		let topDiff = window.scrollY - b.offsetTop;
		if (topDiff >= window.innerHeight/3*-1 && topDiff < window.innerHeight/3*2) {
			if (id === "home") {
				nav.classList.add("in-home");
				if (navMobile) {
					navMobile.classList.add("in-home");
				}
			}
			navBtn.classList.add("active");
			if (navBtnMobile) {
				navBtnMobile.classList.add("active");
			}
		} else {
			if (id === "home") {
				nav.classList.remove("in-home");
				if (navMobile) {
					navMobile.classList.remove("in-home");
				}
			}
			navBtn.classList.remove("active");
			if (navBtnMobile) {
				navBtnMobile.classList.remove("active");
			}
		}
	}
	for (let i = 0; i < sectionBlks.length; i++) {
		judgeAndSet(sectionBlks[i])
	}
}

function clickEvent4NavButtons(bs) {
	for (let i = 0; i < bs.length; i++) {
		let b = bs[i];
		let anchor = b.getAttribute("href").match(/(\/|^)#([A-Za-z0-9_\.-]*)$/)[2];
		if (anchor === "") {
			anchor = "home";
		}
		b.setAttribute("js-data-id", anchor);
		anchor = "#" + anchor;
		b.addEventListener("click", function(e){
			e.preventDefault();
			let target = document.querySelector(anchor);
			target.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
		})
	}
}

function switchNavBar() {
	if (navBar && navBarMobile) {
		if (window.innerWidth < 800) {
			// mobile view
			if (!navBarCloned) {
				let menus = navBar.querySelector("#menus").cloneNode(true);
				let dropdownBtn = navBar.querySelector("#dropdown-btn").cloneNode(true);
				let langList = navBar.querySelector("#lang-list").cloneNode(true);
				menus.setAttribute("id", "c-menus");
				dropdownBtn.setAttribute("id", "c-dropdown-btn");
				langList.setAttribute("id", "c-lang-list");
				navBarMobile.appendChild(menus);
				navBarMobile.appendChild(dropdownBtn);
				navBarMobile.appendChild(langList);
				let navButtonsMobile = document.querySelectorAll("header#index-header nav#mobile-menu ul li a");
				clickEvent4NavButtons(navButtonsMobile);
				dropdownBtn.addEventListener("click", function(e) {
					e.preventDefault();
					menus.classList.toggle("expanded");
				});
				menus.addEventListener("click", function(e) {
					menus.classList.remove("expanded");
				});
				navBarCloned = true;
			}
			navBar.style.setProperty("display", "none");
			navBarMobile.style.removeProperty("display");
		} else {
			navBar.style.removeProperty("display");
			navBarMobile.style.setProperty("display", "none");
		}
	}
}

window.addEventListener("DOMContentLoaded", function(){
	// section block minimum height
	sectionBlks = document.querySelectorAll("body >section.section-block");
	for (let i = 0; i < sectionBlks.length; i++) {
		sectionBlks[i].style.setProperty("min-height", window.innerHeight + "px");
	}

	// nav button
	let navButtons = document.querySelectorAll("header#index-header nav#menu ul li a");
	clickEvent4NavButtons(navButtons);
	

	// check section is in viewport
	activeNavBtn();

	// prepare for mobile nav bar
	navBar = document.querySelector("header nav#menu");
	navBarMobile = document.querySelector("header nav#mobile-menu");
	switchNavBar();
});

window.addEventListener("scroll", function(){
	activeNavBtn();
});

window.addEventListener("resize", function(){
	for (let i = 0; i < sectionBlks.length; i++) {
		sectionBlks[i].style.setProperty("min-height", window.innerHeight + "px");
	}
	activeNavBtn();
	switchNavBar();
});

window.addEventListener("load", function(){
	switchNavBar();
});
