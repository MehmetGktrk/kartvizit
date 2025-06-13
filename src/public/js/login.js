// Form elemanları
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const rememberCheckbox = document.getElementById('remember');
const notification = document.getElementById('notification');


function formatEmail(input){
    if(!input) return '';
    return input.trim().toLowerCase();
}

// Form gönderimi
loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Form verilerini al
    const email = formatEmail(emailInput.value);
    const password = passwordInput.value;
    const remember = rememberCheckbox.checked;
    
    // Basit validasyon
    if (!validateEmail(email)) {
        showNotification('Geçerli bir e-posta adresi giriniz!', 'error');
        return;
    }
    
    if (password.length < 6) {
        showNotification('Şifre en az 6 karakter olmalıdır!', 'error');
        return;
    }   
    
    const loginData = {
        email: email,
        password: password
    }

    try{

        const result = await post(loginData, '/api/auth/login');
        showNotification(result.message, result.code);



        if(result.code != 200){
            return;
        }

        let pageHref;
        

        if(result.role == 'admin'){
            pageHref = 'admin/dashboard';
        }

        else if(result.role == 'superAdmin'){
            pageHref = 'superAdmin/dashboard';
        }


        else if(result.role == 'user'){

            if(result.verified == true){
                pageHref = '/previewCard'
            }
            else{
                pageHref = '/pending'
            }
        }

        

        setTimeout(() => {
            window.location.href = pageHref;
        }, 1000);
    }catch(err){
        console.error(err);
        showNotification('İşlem sırasında bir hata oluştu', 'error');
        return;
    }
    
    
});


// Şifre göster/gizle
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.querySelector('.toggle-password i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.classList.remove('fa-eye');
        toggleBtn.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleBtn.classList.remove('fa-eye-slash');
        toggleBtn.classList.add('fa-eye');
    }
}

// Email validasyonu
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}




// Şifremi unuttum
document.querySelector('.forgot-password').addEventListener('click', function(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    
    if (!email) {
        showNotification('Lütfen e-posta adresinizi girin!', 'error');
        emailInput.focus();
        return;
    }
    
    if (!validateEmail(email)) {
        showNotification('Geçerli bir e-posta adresi giriniz!', 'error');
        return;
    }
    
    showNotification(`Şifre sıfırlama bağlantısı ${email} adresine gönderildi!`, 'success');
});

