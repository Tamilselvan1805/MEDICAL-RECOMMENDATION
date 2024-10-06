
document.addEventListener('DOMContentLoaded', function() {
    // Main page functionality
    const contactLink = document.getElementById('contactLink');
    const dropdownContent = document.getElementById('dropdownContent');

    if (contactLink) {
        contactLink.addEventListener('click', function() {
            dropdownContent.classList.toggle('show');
        });
    }

    // FAQ page functionality
    let faqQuestions = document.getElementsByClassName('faq-question');

    if (faqQuestions.length > 0) {
        for (let i = 0; i < faqQuestions.length; i++) {
            faqQuestions[i].addEventListener('click', function() {
                this.nextElementSibling.classList.toggle('show');
            });
        }
    }
});






