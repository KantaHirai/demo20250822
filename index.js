document.addEventListener('DOMContentLoaded', () => {

    // --- 1. スクロールで要素をふわっと表示 ---
    const timelineItems = document.querySelectorAll('.timeline-item');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // 一度表示したら監視を止める
            }
        });
    }, {
        threshold: 0.1 // 10%見えたら発動
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

    // 閉じるボタンで閉じる
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.modal').classList.remove('is-open');
        });
    });

    // モーダルの外側をクリックで閉じる
    modals.forEach(modal => {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.classList.remove('is-open');
            }
        });
    });

});