// Form elemanları
const registerForm = document.getElementById('registerForm');
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const firmaSelect = document.getElementById('firmaSelect');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const termsCheckbox = document.getElementById('terms');
const passwordStrength = document.getElementById('passwordStrength');
const notification = document.getElementById('notification');


document.addEventListener("DOMContentLoaded", async function(){
    const result = await get('/api/auth/getCompanies');
    console.log(result);


    setFirma(result.data)
})

function setFirma(companies) {
    
    const firmaSelectBody = document.getElementById('firmaSelect');
    firmaSelectBody.innerHTML = '';

    companies.forEach(company => {
        const optionHTML = `<option value="${company}">${company}</option>`;

        firmaSelectBody.innerHTML += optionHTML;
    });
      
    
}

// Şifre gücü kontrolü
passwordInput.addEventListener('input', function() {
    const password = this.value;
    const strength = checkPasswordStrength(password);
    
    if (password.length > 0) {
        passwordStrength.classList.add('show');
        passwordStrength.className = `password-strength show ${strength}`;
    } else {
        passwordStrength.classList.remove('show');
    }
});


function formatName(input){
    if (!input) return '';

    return input
    .trim()
    .split(' ')
    .filter(word => word !== '') // birden fazla boşluğu temizler
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function formatSurname(input){
    if(!input) return '';

    return input.trim().toUpperCase();
}

function formatEmail(input){
    if(!input) return '';
    return input.trim().toLowerCase();
}

// Form gönderimi
registerForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Form verilerini al
    const formData = {
        firstName: formatName(firstNameInput.value),
        lastName: formatSurname(lastNameInput.value),
        email: formatEmail(emailInput.value),
        phone: phoneInput.value.trim(),
        firma: firmaSelect.value,
        password: passwordInput.value,
        confirmPassword: confirmPasswordInput.value,
        terms: termsCheckbox.checked,
    };
    
    // Validasyon
    const validationError = validateForm(formData);
    if (validationError) {
        showNotification(validationError, 'error');
        return;
    }

    const newUser = {
        name: formData.firstName,
        surname: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        firma: firmaSelect.value,
        password: formData.password,
    }

    try{
        const result = await post(newUser, '/api/auth/register');

        console.log(result);

        showNotification(result.message, result.code);

        if(result.code != 200){
            return;
        }


        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);

    }catch(err){
        console.error(err);
        showNotification('İşlem sırasında bir hata oluştu', 'error');
        return;
    }

});

// Form validasyonu
function validateForm(data) {
    // Ad kontrolü
    if (data.firstName.length < 2) {
        return 'Ad en az 2 karakter olmalıdır!';
    }
    
    // Soyad kontrolü
    if (data.lastName.length < 2) {
        return 'Soyad en az 2 karakter olmalıdır!';
    }
    
    // Email kontrolü
    if (!validateEmail(data.email)) {
        return 'Geçerli bir e-posta adresi giriniz!';
    }
    
    // Telefon kontrolü
    if (!validatePhone(data.phone)) {
        return 'Geçerli bir telefon numarası giriniz!';
    }
    
    // Şifre kontrolü
    if (data.password.length < 6) {
        return 'Şifre en az 6 karakter olmalıdır!';
    }
    
    // Şifre eşleşme kontrolü
    if (data.password !== data.confirmPassword) {
        return 'Şifreler eşleşmiyor!';
    }
    
    // Kullanım koşulları kontrolü
    if (!data.terms) {
        return 'Kullanım koşullarını kabul etmelisiniz!';
    }
    
    return null;
}


// Şifre göster/gizle
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const toggleBtn = input.nextElementSibling.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        toggleBtn.classList.remove('fa-eye');
        toggleBtn.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        toggleBtn.classList.remove('fa-eye-slash');
        toggleBtn.classList.add('fa-eye');
    }
}

// Şifre gücü kontrolü
function checkPasswordStrength(password) {
    let strength = 0;
    
    // Uzunluk kontrolü
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    
    // Karakter çeşitliliği kontrolü
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    
    if (strength <= 2) return 'weak';
    if (strength <= 4) return 'medium';
    return 'strong';
}

// Email validasyonu
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Telefon validasyonu
function validatePhone(phone) {
    // Basit telefon numarası kontrolü
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10;
}

// Telefon numarası formatlama
phoneInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    let formattedValue = '';
    
    if (value.startsWith('90')) {
        value = value.substring(2);
    }
    
    if (value.length > 0) {
        formattedValue = '+90 ';
        if (value.length > 0) {
            formattedValue += value.substring(0, 3);
        }
        if (value.length > 3) {
            formattedValue += ' ' + value.substring(3, 6);
        }
        if (value.length > 6) {
            formattedValue += ' ' + value.substring(6, 8);
        }
        if (value.length > 8) {
            formattedValue += ' ' + value.substring(8, 10);
        }
    }
    
    e.target.value = formattedValue;
});





// Kullanım koşulları ve gizlilik politikası
document.querySelectorAll('.link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        showNotification('Bu sayfa henüz hazır değil!', 'error');
    });
});

