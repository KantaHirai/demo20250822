// ページの読み込みが完了したら、中の処理を実行する
document.addEventListener('DOMContentLoaded', () => {

    document.body.classList.add('is-loaded');

    // --- 1. スクロールで要素をふわっと表示 ---
    const timelineItems = document.querySelectorAll('.timeline-item');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    timelineItems.forEach(item => {
        observer.observe(item);
    });

    // --- 2. 写真クリックでモーダル表示 ---
    const photoWrappers = document.querySelectorAll('.photo-wrapper');
    const photoModal = document.getElementById('photo-modal');
    const modalImage = document.getElementById('modal-image');
    const modalNote = document.getElementById('modal-note');

    photoWrappers.forEach(wrapper => {
        wrapper.addEventListener('click', () => {
            const originalImageSrc = wrapper.querySelector('img').src;
            const note = wrapper.dataset.note;

            modalImage.src = originalImageSrc;
            modalNote.textContent = note;
            photoModal.classList.add('is-open');
        });
    });

    // --- 3. 手紙アイコンクリックでモーダル表示 ---
    const letterIcon = document.getElementById('letter-icon');
    const letterModal = document.getElementById('letter-modal');

    letterIcon.addEventListener('click', () => {
        letterModal.classList.add('is-open');
    });

    // --- 4. モーダルを閉じる処理 (共通) ---
    const closeButtons = document.querySelectorAll('.close-btn');
    const modals = document.querySelectorAll('.modal');

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.modal').classList.remove('is-open');
        });
    });

    modals.forEach(modal => {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.classList.remove('is-open');
            }
        });
    });

    // --- 5. 花びらを生成する処理 ---
    const petalContainer = document.getElementById('petal-container');
    if (petalContainer) { // petalContainerが存在する場合のみ実行
        const numberOfPetals = 30; // 花びらの数

        for (let i = 0; i < numberOfPetals; i++) {
            createPetal();
        }

        function createPetal() {
            const petal = document.createElement('div');
            petal.classList.add('petal');

            const size = Math.random() * 10 + 5;
            const startPosition = Math.random() * 100;
            const fallDuration = Math.random() * 5 + 8;
            const fallDelay = Math.random() * 10;

            petal.style.width = `${size}px`;
            petal.style.height = `${size}px`;
            petal.style.left = `${startPosition}vw`;
            petal.style.animationDuration = `${fallDuration}s`;
            petal.style.animationDelay = `${fallDelay}s`;

            if (Math.random() > 0.5) {
                petal.style.animationName = 'fall, sway-left';
            } else {
                petal.style.animationName = 'fall, sway-right';
            }

            petalContainer.appendChild(petal);
        }

        const style = document.createElement('style');
        style.textContent = `
            @keyframes sway-left {
                0% { margin-left: 0px; }
                100% { margin-left: -50px; }
            }
            @keyframes sway-right {
                0% { margin-left: 0px; }
                100% { margin-left: 50px; }
            }
        `;
        document.head.appendChild(style);
    }
});