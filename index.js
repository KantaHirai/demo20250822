document.addEventListener('DOMContentLoaded', () => {

    // --- 1. �X�N���[���ŗv�f���ӂ���ƕ\�� ---
    const timelineItems = document.querySelectorAll('.timeline-item');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // ��x�\��������Ď����~�߂�
            }
        });
    }, {
        threshold: 0.1 // 10%�������甭��
    });

    timelineItems.forEach(item => {
        observer.observe(item);
    });


    // --- 2. �ʐ^�N���b�N�Ń��[�_���\�� ---
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


    // --- 3. �莆�A�C�R���N���b�N�Ń��[�_���\�� ---
    const letterIcon = document.getElementById('letter-icon');
    const letterModal = document.getElementById('letter-modal');

    letterIcon.addEventListener('click', () => {
        letterModal.classList.add('is-open');
    });


    // --- 4. ���[�_������鏈�� (����) ---
    const closeButtons = document.querySelectorAll('.close-btn');
    const modals = document.querySelectorAll('.modal');

    // ����{�^���ŕ���
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.modal').classList.remove('is-open');
        });
    });

    // ���[�_���̊O�����N���b�N�ŕ���
    modals.forEach(modal => {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.classList.remove('is-open');
            }
        });
    });

});