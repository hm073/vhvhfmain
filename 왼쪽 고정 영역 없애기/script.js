// 현재 슬라이드 위치 추적
let isScrolling = false;
let currentSlide = 0;
const totalSlides = document.querySelectorAll(".slide").length;
const scrollableContent = document.querySelector(".scrollable-content");
const fixedSide = document.querySelector(".fixed-side");
const draggableSide = document.querySelector(".draggable-side");

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

    // 슬라이드 전환에 따라 고정된 영역 숨기기 및 확장
    handleSlideTransition();

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

// 슬라이드 전환 시 고정 영역 숨기기 및 드래그 영역 확장 처리
function handleSlideTransition() {
    if (currentSlide >= 1) {
        // 두 번째 슬라이드 이상일 때, 고정된 영역 숨기기
        fixedSide.classList.add("hidden");
        draggableSide.classList.add("expanded");
    } else {
        // 첫 번째 슬라이드일 때, 고정된 영역 보이기
        fixedSide.classList.remove("hidden");
        draggableSide.classList.remove("expanded");
    }
}

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
            currentSlide = slideIndex; // 슬라이드의 index를 현재 슬라이드로 설정
            scrollToSlide(slideIndex);

            // 슬라이드 전환에 따라 고정 영역 숨기기 및 드래그 영역 확장
            handleSlideTransition();
        }
    });
});