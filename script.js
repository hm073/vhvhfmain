// 현재 슬라이드 위치 추적
let isScrolling = false;
let currentSlide = 0;
const totalSlides = document.querySelectorAll(".slide").length;
const scrollableContent = document.querySelector(".scrollable-content");
const fixedSideContent = document.getElementById("fixed-side");


// 슬라이드 이동 함수
function scrollToSlide(slideIndex) {
    const slideHeight = document.querySelector(".slide").offsetHeight; // 각 슬라이드의 높이 (100vh)
    scrollableContent.scrollTo({
        top: slideIndex * slideHeight, // 슬라이드 위치로 스크롤 이동
        behavior: "smooth", // 부드러운 스크롤
    });

    // 슬라이드에 맞는 고정 영역 내용 업데이트
    // updateFixedSideContent(slideIndex);
}

// 슬라이드에 맞는 고정 영역 내용 업데이트 함수
// function updateFixedSideContent(slideIndex) {
//     const slides = document.querySelectorAll(".slide");
//     const currentSlideElement = slides[slideIndex];

//     // 고정 영역에 내용을 업데이트
//     if (currentSlideElement.classList.contains("slide1")) {
//         fixedSideContent.innerHTML = `<h3>메뉴</h3><p>ABOUT, INFORMATION, SKILL, EMAIL 메뉴가 있습니다.</p>`;
//     } else if (currentSlideElement.classList.contains("slide2")) {
//         // #about 슬라이드의 내용을 고정 영역에 추가
//         const aboutContent = document.createElement("div");
//         aboutContent.classList.add("about-content");
//         aboutContent.innerHTML = `
//             <h3>ABOUT</h3>
//             <p>이름: 홍길동 (Hong Gil Dong)<br>나이: 00세 (2001.02.03)<br>주소: 경기도 고양시 일산동구 중앙로</p>
//         `;
//         fixedSideContent.appendChild(aboutContent); // about 내용을 고정 영역에 추가
//     } else if (currentSlideElement.classList.contains("slide3")) {
//         fixedSideContent.innerHTML = `
//             <h3>ABOUT</h3>
//             <p>이름: 홍길동 (Hong Gil Dong)<br>나이: 00세 (2001.02.03)<br>주소: 경기도 고양시 일산동구 중앙로</p>
//         `;
//     } else if (currentSlideElement.classList.contains("slide4")) {
//         fixedSideContent.innerHTML = `
//             <h3>ABOUT</h3>
//             <p>이름: 홍길동 (Hong Gil Dong)<br>나이: 00세 (2001.02.03)<br>주소: 경기도 고양시 일산동구 중앙로</p>
//         `;
//     } else if (currentSlideElement.classList.contains("slide5")) {
//         fixedSideContent.innerHTML = `
//             <h3>ABOUT</h3>
//             <p>이름: 홍길동 (Hong Gil Dong)<br>나이: 00세 (2001.02.03)<br>주소: 경기도 고양시 일산동구 중앙로</p>
//         `;
//     }
// }

// 스크롤 이벤트 리스너
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

// 각 a 태그 클릭 시 해당 슬라이드로 부드럽게 이동하는 이벤트 추가
document.querySelectorAll("a").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault(); // 기본 클릭 동작을 방지 (페이지 이동을 막기 위해)

        // 클릭된 a 태그의 href 값에서 id를 추출
        const targetId = this.getAttribute("href").substring(1); // #about -> about

        // 해당 id를 가진 슬라이드 요소 찾기
        const targetSlide = document.getElementById(targetId);

        if (targetSlide) {
            // 슬라이드의 index를 계산하여 스크롤
            const slideIndex = Array.from(document.querySelectorAll(".slide")).indexOf(targetSlide);
            scrollToSlide(slideIndex);
        }
    });
});
