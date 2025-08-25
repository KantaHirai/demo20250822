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
    const modalContent = photoModal.querySelector('.modal-content');
    const modalImage = document.getElementById('modal-image');
    const modalNote = document.getElementById('modal-note');

    photoWrappers.forEach(wrapper => {
        wrapper.addEventListener('click', () => {
            // 1. クリックされた写真の位置とサイズを取得
            const rect = wrapper.getBoundingClientRect();

            // 2. ポップアップの初期位置をクリックされた写真の位置に設定
            //    (window.scrollYを加えることで、スクロール量を考慮する)
            modalContent.style.top = `${rect.top + window.scrollY}px`;
            modalContent.style.left = `${rect.left}px`;
            modalContent.style.width = `${rect.width}px`;
            modalContent.style.height = `${rect.height}px`;

            // 3. 画像とメモの内容を設定
            const originalImageSrc = wrapper.querySelector('img').src;
            const note = wrapper.dataset.note;
            modalImage.src = originalImageSrc;
            modalNote.textContent = note;

            // 4. まず背景のオーバーレイを表示
            photoModal.classList.add('is-open');
            document.body.classList.add('body-no-scroll');

            // 5. 少し間を置いてから、最終的な表示位置とサイズにアニメーションさせる
            setTimeout(() => {
                // 画面の真ん中に、より大きく表示されるようにスタイルを設定
                const finalWidth = Math.min(window.innerWidth * 0.8, 600); // 最大600px
                modalContent.style.width = `${finalWidth}px`;
                modalContent.style.height = 'auto'; // 高さは自動調整
                modalContent.style.top = `${window.innerHeight / 2 + window.scrollY}px`;
                modalContent.style.left = `${window.innerWidth / 2}px`;
                // 中央に配置するための微調整
                modalContent.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 10); // わずかな遅延でアニメーションをトリガー
        });
    });

    // --- 3. 手紙アイコンクリックでモーダル表示 ---
    const letterIcon = document.getElementById('letter-icon');
    const letterModal = document.getElementById('letter-modal');
    const letterContent = letterModal.querySelector('.modal-content');

    letterIcon.addEventListener('click', () => {

        const rect = letterIcon.getBoundingClientRect();

        // 2. ポップアップの初期位置をアイコンの位置に設定
        letterContent.style.top = `${rect.top + window.scrollY}px`;
        letterContent.style.left = `${rect.left}px`;
        letterContent.style.width = `${rect.width}px`;
        letterContent.style.height = `${rect.height}px`;

        letterModal.classList.add('is-open');
        document.body.classList.add('body-no-scroll');

        // 4. 少し間を置いてから、最終的な表示位置とサイズにアニメーションさせる
        setTimeout(() => {
            const finalWidth = Math.min(window.innerWidth * 0.9, 500); // 最大500px
            letterContent.style.width = `${finalWidth}px`;
            letterContent.style.height = 'auto';
            letterContent.style.top = `${window.innerHeight / 2 + window.scrollY}px`;
            letterContent.style.left = `${window.innerWidth / 2}px`;
            letterContent.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 10);
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