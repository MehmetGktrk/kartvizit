












// Örnek veri
let cardsData = [
    {
        id: 1,
        name: 'Mehmet Göktürk',
        position: 'Yazılım Geliştirici',
        email: 'mehmet@example.com',
        phone: '+90 555 123 45 67',
        company: 'Tech Company',
        status: 'pending',
        views: 1234,
        desktopPercentage: 65,
        mobilePercentage: 35,
        createdAt: '15 Ocak 2024',
        avatar: 'https://via.placeholder.com/50'
    },
    {
        id: 2,
        name: 'Ayşe Yılmaz',
        position: 'Grafik Tasarımcı',
        email: 'ayse@example.com',
        phone: '+90 555 987 65 43',
        company: 'Creative Agency',
        status: 'approved',
        views: 2567,
        desktopPercentage: 45,
        mobilePercentage: 55,
        createdAt: '10 Ocak 2024',
        avatar: 'https://via.placeholder.com/50'
    }
];

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    loadDashboard();
    initializeCharts();
});

// Navigasyon başlatma
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Aktif sınıfını güncelle
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Sayfayı değiştir
            const page = this.getAttribute('data-page');
            showPage(page);
            
            // Sayfa başlığını güncelle
            updatePageTitle(page);
            
            // Mobilde sidebar'ı kapat
            if (window.innerWidth <= 1024) {
                document.querySelector('.sidebar').classList.remove('active');
            }
        });
    });
}

// Sayfa gösterme
function showPage(pageName) {
    // Tüm sayfaları gizle
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => page.classList.remove('active'));
    
    // İstenen sayfayı göster
    const targetPage = document.getElementById(pageName);
    if (targetPage) {
        targetPage.classList.add('active');
        
        // Sayfa özel yükleme fonksiyonları
        switch(pageName) {
            case 'dashboard':
                loadDashboard();
                break;
            case 'cards':
                loadCards();
                break;
            case 'pending':
                loadPendingCards();
                break;
            case 'statistics':
                loadStatistics();
                break;
            case 'users':
                loadUsers();
                break;
        }
    }
}

// Sayfa başlığını güncelle
function updatePageTitle(page) {
    const titles = {
        dashboard: 'Genel Bakış',
        cards: 'Kartvizitler',
        pending: 'Onay Bekleyenler',
        statistics: 'İstatistikler',
        users: 'Kullanıcılar',
        settings: 'Ayarlar'
    };
    
    document.getElementById('pageTitle').textContent = titles[page] || 'Admin Panel';
}

// Sidebar toggle
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
}

// Dashboard yükleme
function loadDashboard() {
    // Dashboard verileri yüklenecek
    console.log('Dashboard yüklendi');
}

// Kartvizitler yükleme
function loadCards() {
    const cardsGrid = document.getElementById('cardsGrid');
    cardsGrid.innerHTML = '';
    
    // Örnek kartvizit verileri
    const cards = [
        {
            id: 1,
            name: 'Mehmet Göktürk',
            position: 'Yazılım Geliştirici',
            email: 'mehmet@example.com',
            phone: '+90 555 123 45 67',
            company: 'Tech Company',
            status: 'approved',
            views: 1234,
            avatar: 'https://via.placeholder.com/100'
        },
        {
            id: 2,
            name: 'Ayşe Yılmaz',
            position: 'Grafik Tasarımcı',
            email: 'ayse@example.com',
            phone: '+90 555 987 65 43',
            company: 'Creative Agency',
            status: 'approved',
            views: 2567,
            avatar: 'https://via.placeholder.com/100'
        },
        {
            id: 3,
            name: 'Ali Demir',
            position: 'Proje Yöneticisi',
            email: 'ali@example.com',
            phone: '+90 555 456 78 90',
            company: 'Business Corp',
            status: 'pending',
            views: 892,
            avatar: 'https://via.placeholder.com/100'
        }
    ];
    
    cards.forEach(card => {
        const cardHTML = `
            <div class="card-item" data-id="${card.id}">
                <div class="card-header">
                    <img src="${card.avatar}" alt="${card.name}" class="card-avatar">
                    <div class="card-status ${card.status}">
                        ${getStatusIcon(card.status)}
                        ${getStatusText(card.status)}
                    </div>
                </div>
                <div class="card-body">
                    <h3>${card.name}</h3>
                    <p class="card-position">${card.position}</p>
                    <p class="card-company">${card.company}</p>
                    <div class="card-stats">
                        <span><i class="fas fa-eye"></i> ${formatNumber(card.views)}</span>
                        <span><i class="fas fa-envelope"></i> ${card.email}</span>
                    </div>
                </div>
                <div class="card-footer">
                    <button class="btn btn-sm btn-primary" onclick="viewCard(${card.id})">
                        <i class="fas fa-eye"></i> Görüntüle
                    </button>
                    <button class="btn btn-sm btn-secondary" onclick="editCard(${card.id})">
                        <i class="fas fa-edit"></i> Düzenle
                    </button>
                </div>
            </div>
        `;
        cardsGrid.innerHTML += cardHTML;
    });
}

// Bekleyen kartvizitler yükleme
function loadPendingCards() {
    const pendingList = document.getElementById('pendingList');
    pendingList.innerHTML = '';
    
    // Örnek bekleyen kartvizitler
    const pendingCards = [
        {
            id: 4,
            name: 'Zeynep Kaya',
            position: 'İnsan Kaynakları Uzmanı',
            email: 'zeynep@example.com',
            phone: '+90 555 111 22 33',
            company: 'HR Solutions',
            createdAt: '2 saat önce',
            avatar: 'https://via.placeholder.com/60'
        },
        {
            id: 5,
            name: 'Can Özkan',
            position: 'Satış Müdürü',
            email: 'can@example.com',
            phone: '+90 555 444 55 66',
            company: 'Sales Pro',
            createdAt: '5 saat önce',
            avatar: 'https://via.placeholder.com/60'
        }
    ];
    
    pendingCards.forEach(card => {
        const cardHTML = `
            <div class="pending-card" data-id="${card.id}">
                <div class="pending-card-header">
                    <div class="user-info">
                        <img src="${card.avatar}" alt="${card.name}" class="user-avatar">
                        <div>
                            <h3>${card.name}</h3>
                            <p>${card.position} - ${card.company}</p>
                        </div>
                    </div>
                    <span class="time-badge">${card.createdAt}</span>
                </div>
                <div class="pending-card-details">
                    <div class="detail-item">
                        <i class="fas fa-envelope"></i>
                        <span>${card.email}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-phone"></i>
                        <span>${card.phone}</span>
                    </div>
                </div>
                <div class="pending-card-actions">
                    <button class="btn btn-success" onclick="approveCard(${card.id})">
                        <i class="fas fa-check"></i> Onayla
                    </button>
                    <button class="btn btn-danger" onclick="rejectCard(${card.id})">
                        <i class="fas fa-times"></i> Reddet
                    </button>
                    <button class="btn btn-secondary" onclick="viewCard(${card.id})">
                        <i class="fas fa-eye"></i> İncele
                    </button>
                </div>
            </div>
        `;
        pendingList.innerHTML += cardHTML;
    });
}

// İstatistikler yükleme
function loadStatistics() {
    updateCharts();
}

// Kullanıcılar yükleme
function loadUsers() {
    const usersTableBody = document.getElementById('usersTableBody');
    usersTableBody.innerHTML = '';
    
    // Örnek kullanıcılar
    const users = [
        {
            id: 1,
            name: 'Mehmet Göktürk',
            email: 'mehmet@example.com',
            registrationDate: '15 Ocak 2024',
            status: 'active',
            avatar: 'https://via.placeholder.com/40'
        },
        {
            id: 2,
            name: 'Ayşe Yılmaz',
            email: 'ayse@example.com',
            registrationDate: '10 Ocak 2024',
            status: 'active',
            avatar: 'https://via.placeholder.com/40'
        },
        {
            id: 3,
            name: 'Ali Demir',
            email: 'ali@example.com',
            registrationDate: '20 Ocak 2024',
            status: 'inactive',
            avatar: 'https://via.placeholder.com/40'
        }
    ];
    
    users.forEach(user => {
        const rowHTML = `
            <tr>
                <td>
                    <div class="user-cell">
                        <img src="${user.avatar}" alt="${user.name}" class="user-avatar-small">
                        <span>${user.name}</span>
                    </div>
                </td>
                <td>${user.email}</td>
                <td>${user.registrationDate}</td>
                <td>
                    <span class="status-badge ${user.status}">
                        ${user.status === 'active' ? 'Aktif' : 'Pasif'}
                    </span>
                </td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="editUser(${user.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteUser(${user.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
        usersTableBody.innerHTML += rowHTML;
    });
}

// Grafikleri başlat
let viewsChart, usersChart, devicesChart;

function initializeCharts() {
    // Görüntülenme grafiği
    const viewsCtx = document.getElementById('viewsChart');
    if (viewsCtx) {
        viewsChart = new Chart(viewsCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'],
                datasets: [{
                    label: 'Görüntülenme',
                    data: [1200, 1900, 1500, 2500, 2200, 3000, 2800],
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    // Kullanıcı artış grafiği
    const usersCtx = document.getElementById('usersChart');
    if (usersCtx) {
        usersChart = new Chart(usersCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz'],
                datasets: [{
                    label: 'Yeni Kullanıcılar',
                    data: [65, 89, 120, 81, 156, 195],
                    backgroundColor: '#764ba2'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    // Cihaz dağılımı grafiği
    const devicesCtx = document.getElementById('devicesChart');
    if (devicesCtx) {
        devicesChart = new Chart(devicesCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Masaüstü', 'Mobil', 'Tablet'],
                datasets: [{
                    data: [55, 35, 10],
                    backgroundColor: ['#667eea', '#764ba2', '#a78bfa']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
}

// Grafikleri güncelle
function updateCharts() {
    if (viewsChart) viewsChart.update();
    if (usersChart) usersChart.update();
    if (devicesChart) devicesChart.update();
}

// Tarih filtreleri
document.querySelectorAll('.date-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.date-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        // Grafikleri güncelle
        updateCharts();
    });
});

// Durum ikonunu getir
function getStatusIcon(status) {
    switch(status) {
        case 'pending': return '<i class="fas fa-clock"></i>';
        case 'approved': return '<i class="fas fa-check-circle"></i>';
        case 'rejected': return '<i class="fas fa-times-circle"></i>';
        default: return '';
    }
}

// Durum metnini getir
function getStatusText(status) {
    switch(status) {
        case 'pending': return 'Beklemede';
        case 'approved': return 'Onaylı';
        case 'rejected': return 'Reddedildi';
        default: return '';
    }
}

// Sayı formatlama
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Kart işlemleri
function viewCard(id) {
    window.open('index.html', '_blank');
}

function editCard(id) {
    console.log('Kart düzenleniyor:', id);
}

function approveCard(id) {
    showNotification('Kartvizit onaylandı!', 'success');
    // Sayfayı yenile
    loadPendingCards();
}

function rejectCard(id) {
    showNotification('Kartvizit reddedildi!', 'error');
    // Sayfayı yenile
    loadPendingCards();
}

// Kullanıcı işlemleri
function editUser(id) {
    console.log('Kullanıcı düzenleniyor:', id);
}

function deleteUser(id) {
    if (confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?')) {
        showNotification('Kullanıcı silindi!', 'success');
        loadUsers();
    }
}

// Filtreleme
function filterCards() {
    const status = document.getElementById('statusFilter').value;
    console.log('Filtreleme:', status);
    // Filtreleme mantığı eklenecek
}

function searchCards() {
    const searchTerm = document.getElementById('searchInput').value;
    console.log('Arama:', searchTerm);
    // Arama mantığı eklenecek
}

// Sayfalama
let currentPage = 1;
const itemsPerPage = 9;

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        loadCards();
    }
}

function nextPage() {
    currentPage++;
    loadCards();
}

// Çıkış yap
function logout() {
    if (confirm('Çıkış yapmak istediğinizden emin misiniz?')) {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    }
}

// Modal kapat
function closeStatsModal() {
    const modal = document.getElementById('statsModal');
    modal.classList.remove('active');
}

// Bildirim göster
function showNotification(message, type = 'success') {
    // Mevcut bildirimleri kaldır
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(n => n.remove());
    
    // Yeni bildirim oluştur
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 2000;
        animation: slideIn 0.3s ease;
        font-weight: 500;
        background: ${type === 'success' ? '#16a34a' : 
                     type === 'error' ? '#dc2626' :
                     '#f59e0b'};
        color: white;
    `;
    
    document.body.appendChild(notification);
    
    // 3 saniye sonra kaldır
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Animasyonlar için CSS ekle
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .card-item {
        background: white;
        border-radius: 16px;
        padding: 20px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        transition: all 0.3s ease;
    }
    
    .card-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 16px;
    }
    
    .card-avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        object-fit: cover;
    }
    
    .card-status {
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 4px;
    }
    
    .card-status.approved {
        background: rgba(22, 163, 74, 0.1);
        color: #16a34a;
    }
    
    .card-status.pending {
        background: rgba(245, 158, 11, 0.1);
        color: #f59e0b;
    }
    
    .card-body h3 {
        font-size: 18px;
        margin-bottom: 4px;
    }
    
    .card-position {
        color: #6b7280;
        font-size: 14px;
        margin-bottom: 2px;
    }
    
    .card-company {
        color: #9ca3af;
        font-size: 13px;
        margin-bottom: 12px;
    }
    
    .card-stats {
        display: flex;
        gap: 16px;
        font-size: 13px;
        color: #6b7280;
    }
    
    .card-stats i {
        color: #667eea;
    }
    
    .card-footer {
        display: flex;
        gap: 8px;
        margin-top: 16px;
        padding-top: 16px;
        border-top: 1px solid #e5e7eb;
    }
    
    .btn-sm {
        padding: 6px 12px;
        font-size: 13px;
    }
    
    .btn-secondary {
        background: #f3f4f6;
        color: #374151;
    }
    
    .btn-secondary:hover {
        background: #e5e7eb;
    }
    
    .pending-card {
        background: white;
        border-radius: 16px;
        padding: 20px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }
    
    .pending-card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
    }
    
    .time-badge {
        background: #f3f4f6;
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 12px;
        color: #6b7280;
    }
    
    .pending-card-details {
        display: flex;
        gap: 20px;
        margin-bottom: 16px;
    }
    
    .detail-item {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        color: #6b7280;
    }
    
    .detail-item i {
        color: #667eea;
    }
    
    .pending-card-actions {
        display: flex;
        gap: 8px;
    }
    
    .user-cell {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    
    .user-avatar-small {
        width: 32px;
        height: 32px;
        border-radius: 50%;
    }
    
    .status-badge {
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 500;
    }
    
    .status-badge.active {
        background: rgba(22, 163, 74, 0.1);
        color: #16a34a;
    }
    
    .status-badge.inactive {
        background: rgba(220, 38, 38, 0.1);
        color: #dc2626;
    }
`;
document.head.appendChild(style);

// Responsive için event listener
window.addEventListener('resize', function() {
    if (window.innerWidth > 1024) {
        document.querySelector('.sidebar').classList.remove('active');
    }
}); 