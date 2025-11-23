document.querySelector('.tags').addEventListener('click', e => {
    const {target} = e;
    if (!target.classList.contains('tag')) {
        return;
    }
    document.querySelectorAll('.tag').forEach(el => el.classList.remove('active'));
    target.classList.add('active');
    const tagCategory = target.getAttribute('data-tag-category');
    if (tagCategory === 'all') {
        document.querySelectorAll('.list-item').forEach(el => el.style.removeProperty('display'));
        return;
    }
    document.querySelectorAll('list-item-card').forEach(el => {
        if (el.getAttribute('tag').includes(tagCategory)) {
            el.style.removeProperty('display');
        } else {
            el.style.display = 'none';
        }
    });
})
