/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')


/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName('skills__content'),
    skillsHeader = document.querySelectorAll('.skills__header')

function toggleSkills(){
    let itemClass = this.parentNode.className
    
    for(i = 0; i < skillsContent.length; i++){
        skillsContent[i].className = 'skills__content skills__close'
    }
    if(itemClass === 'skills__content skills__close'){
        this.parentNode.className = 'skills__content skills__open'
    }
}

skillsHeader.forEach((el) => {
    el.addEventListener('click', toggleSkills)
})

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll('[data-target]'),
tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target)
        
        tabContents.forEach(tabContent => {
            tabContent.classList.remove('qualification__active')
        })
        target.classList.add('qualification__active')
        
        tabs.forEach(tab => {
            tab.classList.remove('qualification__active')
        })
        tab.classList.add('qualification__active')
    })
})

/*==================== SERVICES MODAL ====================*/
const modalViews = document.querySelectorAll('.services__modal'),
    modalBtns = document.querySelectorAll('.services__button'),
    modalCloses = document.querySelectorAll('.services__modal-close')

let modal = function(modalClick){
    modalViews[modalClick].classList.add('active-modal')
}

modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener('click', () => {
        modal(i)
    })
})

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener('click', () => {
        modalViews.forEach((modalView) => {
            modalView.classList.remove('active-modal')
        })
    })
})

/*==================== PORTFOLIO SWIPER  ====================*/
let swiperPortfolio = new Swiper('.portfolio__container', {
    cssMode: true,
    loop: true,

    navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
    },
    pagination: {
    el: '.swiper-pagination',
    clickable: true,
    },
})

/*==================== TESTIMONIAL ====================*/
let swiperTestimonial = new Swiper('.testimonial__container', {
    loop: true,
    grabCursor: true,
    spaceBetween: 48,

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },
    breakpoints: {
        568: {
            slidesPerView: 2,
        },
    }
})


/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== CHANGE BACKGROUND HEADER ====================*/ 
function scrollHeader(){
    const nav = document.getElementById('header');
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader)

/*==================== SHOW SCROLL TOP ====================*/ 
function scrollTop(){
    let scrollTop = document.getElementById('scroll-top');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 200) scrollTop.classList.add('show-scroll'); else scrollTop.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollTop)

/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*=============== BATTERY ===============*/
initBattery()

function initBattery(){
    const batteryLiquid = document.querySelector('.battery__liquid'),
        batteryStatus = document.querySelector('.battery__status'),
        batteryPercentage = document.querySelector('.battery__percentage')
    
    navigator.getBattery().then((batt) =>{
        updateBattery = () =>{
            /* 1. We update the number level of the battery */
            let level = Math.floor(batt.level * 100)
            batteryPercentage.innerHTML = level+ '%'

            /* 2. We update the background level of the battery */
            batteryLiquid.style.height = `${parseInt(batt.level * 100)}%`

            /* 3. We validate full battery, low battery and if it is charging or not */
            if(level == 100){ /* We validate if the battery is full */
                batteryStatus.innerHTML = `Full battery <i class="ri-battery-2-fill green-color"></i>`
                batteryLiquid.style.height = '103%' /* To hide the ellipse */
            }
            else if(level <= 20 &! batt.charging){ /* We validate if the battery is low */
                batteryStatus.innerHTML = `Low battery <i class="ri-plug-line animated-red"></i>`
            }
            else if(batt.charging){ /* We validate if the battery is charging */
                batteryStatus.innerHTML = `Charging... <i class="ri-flashlight-line animated-green"></i>`
            }
            else{ /* If it's not loading, don't show anything. */
                batteryStatus.innerHTML = ''
            }
            
            /* 4. We change the colors of the battery and remove the other colors */
            if(level <=20){
                batteryLiquid.classList.add('gradient-color-red')
                batteryLiquid.classList.remove('gradient-color-orange','gradient-color-yellow','gradient-color-green')
            }
            else if(level <= 40){
                batteryLiquid.classList.add('gradient-color-orange')
                batteryLiquid.classList.remove('gradient-color-red','gradient-color-yellow','gradient-color-green')
            }
            else if(level <= 80){
                batteryLiquid.classList.add('gradient-color-yellow')
                batteryLiquid.classList.remove('gradient-color-red','gradient-color-orange','gradient-color-green')
            }
            else{
                batteryLiquid.classList.add('gradient-color-green')
                batteryLiquid.classList.remove('gradient-color-red','gradient-color-orange','gradient-color-yellow')
            }
        }
        updateBattery()

        /* 5. Battery status events */
        batt.addEventListener('chargingchange', () => {updateBattery()})
        batt.addEventListener('levelchange', () => {updateBattery()})
    })
}

// Toggle battery visibility
document.getElementById('toggleBattery').addEventListener('click', function() {
    document.querySelector('.battery-container').classList.toggle('show');
});

/*=============== CLOCK ===============*/
const hour = document.getElementById('clock-hour'),
    minutes = document.getElementById('clock-minutes')

const clock = () =>{
   // We get the Date object
let date = new Date()

   // We get the hours and minutes 
   // (current time) / 12(hours) * 360(deg circle)
   // (Current minute) / 60(minutes) * 360(deg circle)
   let hh = date.getHours() / 12 * 360,
       mm = date.getMinutes() / 60 * 360

   // We add a rotation to the elements
hour.style.transform = `rotateZ(${hh + mm / 12}deg)`
minutes.style.transform = `rotateZ(${mm}deg)`
}
setInterval(clock, 1000) // (Updates every 1s) 1000 = 1s 

/*=============== TIME AND DATE TEXT ===============*/
const dateDayWeek = document.getElementById('date-day-week'),
    dateMonth = document.getElementById('date-month'),
    dateDay = document.getElementById('date-day'),
    dateYear = document.getElementById('date-year'),
    textHour = document.getElementById('text-hour'),
    textMinutes = document.getElementById('text-minutes'),
    textAmPm = document.getElementById('text-ampm')

const clockText = () =>{

let date = new Date()


let dayWeek = date.getDay(),
    month = date.getMonth(),
    day = date.getDate(),
    year = date.getFullYear(),
    hh = date.getHours(),
    mm = date.getMinutes(),
    ampm


let daysWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']


dateDayWeek.innerHTML = `${daysWeek[dayWeek]}`
dateMonth.innerHTML = `${months[month]}`
dateDay.innerHTML = `${day}, `
dateYear.innerHTML = year


if(hh >= 12){
    hh = hh - 12
    ampm = 'PM'
} else{
    ampm = 'AM'
}

textAmPm.innerHTML = ampm


if(hh == 0){hh = 12}


if(hh < 10){hh = `0${hh}`}

textHour.innerHTML = `${hh}:`


if(mm < 10){mm = `0${mm}`}

textMinutes.innerHTML = mm
}
setInterval(clockText, 1000) 


document.getElementById('toggleClock').addEventListener('click', function() {
    document.querySelector('.ClockContainer').classList.toggle('show');
});

