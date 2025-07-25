fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const list = document.getElementById('product-list');
        data.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.nama} - Rp${item.harga}`;
            list.appendChild(li);
        });
    })
    .catch(error => {
        console.error('Gagal memuat data:', error);
    });