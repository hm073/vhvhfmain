// 현재 슬라이드 위치 추적
let isScrolling = false;
let currentSlide = 0;
const totalSlides = document.querySelectorAll(".slide").length;
const scrollableContent = document.querySelector(".scrollable-content");

window.addEventListener("wheel", function (e) {
    if (isScrolling) return;
    isScrolling = true;

    if (e.deltaY > 0) {
        // 아래로 스크롤 (다음 슬라이드)
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            scrollToSlide(currentSlide);
        }
    } else {
        // 위로 스크롤 (이전 슬라이드)
        if (currentSlide > 0) {
            currentSlide--;
            scrollToSlide(currentSlide);
        }
    }

    // 스크롤 이벤트가 끝난 후 잠시 대기
    setTimeout(() => {
        isScrolling = false;
    }, 600); // 0.6초 대기 (부드러운 전환을 위한 시간)
});

// 슬라이드 이동 함수
function scrollToSlide(slideIndex) {
    const slideHeight = document.querySelector(".slide").offsetHeight; // 각 슬라이드의 높이 (100vh)
    scrollableContent.scrollTo({
        top: slideIndex * slideHeight, // 슬라이드 위치로 스크롤 이동
        behavior: "smooth", // 부드러운 스크롤
    });
}

// Array.from(document.querySelector(".slide1").children).forEach(anchor => {
//     anchor.addEventListener('click', function(e) {
//         e.preventDefault();
//         // alert(anchor)

//         const targetId = this.getAttribute("href").substring(1);
//         const targetElement = document.getElementById(targetId);
//         // alert(targetElement)

//         window.scrollTo({
//             top: targetElement.offsetTop,
//             behavior: 'smooth'
//         });
//     });
// });