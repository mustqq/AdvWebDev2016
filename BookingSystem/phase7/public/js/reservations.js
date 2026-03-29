document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem('token');
    if (token) {
        const logoutBtn = document.getElementById('logoutBtn');
        if(logoutBtn) logoutBtn.classList.remove('hidden');
    }

    fetchReservations();

    document.getElementById('btnCreate').addEventListener('click', () => handleFormSubmit('POST'));
    document.getElementById('btnUpdate').addEventListener('click', () => handleFormSubmit('PUT'));
    document.getElementById('btnDelete').addEventListener('click', handleDelete);
    document.getElementById('btnClear').addEventListener('click', resetForm);
    
    const logoutBtn = document.getElementById('logoutBtn');
    if(logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('token');
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.location.href = '/login';
        });
    }
});

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
};

async function fetchReservations() {
    try {
        const res = await fetch('/api/reservations', { headers: getHeaders() });
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        
        const reservations = data.data || data; 
        renderList(Array.isArray(reservations) ? reservations : []);
    } catch (err) {
        showMessage('error', 'Could not load reservations.');
    }
}

function renderList(reservations) {
    const list = document.getElementById('reservationList');
    list.innerHTML = '';

    if (reservations.length === 0) {
        list.innerHTML = '<p class="text-sm text-black/50">No reservations found.</p>';
        return;
    }

    reservations.forEach(res => {
        const div = document.createElement('div');
        div.className = 'p-4 border rounded-2xl cursor-pointer hover:border-brand-blue hover:shadow-sm transition-all bg-black/5';
        
        // Handle both camelCase and snake_case API responses
        const rId = res.resourceId || res.resource_id;
        const uId = res.userId || res.user_id;
        const sTime = res.startTime || res.start_time;
        
        let dateStr = "Invalid Date";
        if (sTime) {
            dateStr = new Date(sTime).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });
        }
        
        div.innerHTML = `
            <div class="font-semibold text-sm">Resource: ${rId} | User: ${uId}</div>
            <div class="text-xs text-black/60 mt-1">${dateStr}</div>
            <div class="text-xs mt-1 inline-block px-2 py-0.5 rounded-full bg-white border border-black/10">${res.status || 'active'}</div>
        `;
        div.onclick = () => loadIntoForm(res);
        list.appendChild(div);
    });
}

function loadIntoForm(res) {
    document.getElementById('reservationId').value = res.id;
    
    // Safely load data regardless of API property names
    document.getElementById('resourceId').value = res.resourceId || res.resource_id || '';
    document.getElementById('userId').value = res.userId || res.user_id || '';
    
    // Format dates for datetime-local
    const formatForInput = (dateString) => {
        if (!dateString) return '';
        const d = new Date(dateString);
        if (isNaN(d.getTime())) return ''; // Prevent breaking the input field
        d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
        return d.toISOString().slice(0, 16);
    };

    document.getElementById('startTime').value = formatForInput(res.startTime || res.start_time);
    document.getElementById('endTime').value = formatForInput(res.endTime || res.end_time);
    document.getElementById('note').value = res.note || '';
    document.getElementById('status').value = res.status || 'active';

    document.getElementById('btnCreate').classList.add('hidden');
    document.getElementById('btnUpdate').classList.remove('hidden');
    document.getElementById('btnDelete').classList.remove('hidden');
    
    showMessage('info', `Loaded reservation #${res.id} for editing.`);
}

function resetForm() {
    document.getElementById('reservationForm').reset();
    document.getElementById('reservationId').value = '';
    
    document.getElementById('btnCreate').classList.remove('hidden');
    document.getElementById('btnUpdate').classList.add('hidden');
    document.getElementById('btnDelete').classList.add('hidden');
    
    document.getElementById('formMessage').classList.add('hidden');
}

async function handleFormSubmit(method) {
    const id = document.getElementById('reservationId').value;
    const url = method === 'PUT' ? `/api/reservations/${id}` : '/api/reservations';
    
    const resourceId = parseInt(document.getElementById('resourceId').value);
    const userId = parseInt(document.getElementById('userId').value);
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    
    if (!resourceId || !userId || !startTime || !endTime) {
        showMessage('error', 'Please fill in all required fields.');
        return;
    }

    // Always send as camelCase (what the POST route expects)
    const payload = {
        resourceId,
        userId,
        startTime: new Date(startTime).toISOString(),
        endTime: new Date(endTime).toISOString(),
        note: document.getElementById('note').value,
        status: document.getElementById('status').value
    };

    try {
        const res = await fetch(url, {
            method: method,
            headers: getHeaders(),
            body: JSON.stringify(payload)
        });

        if (res.ok || res.status === 201) {
            showMessage('success', `Reservation successfully ${method === 'POST' ? 'created' : 'updated'}!`);
            resetForm();
            fetchReservations();
        } else {
            const errData = await res.json().catch(() => ({}));
            showMessage('error', errData.error || `Failed to ${method === 'POST' ? 'create' : 'update'} reservation.`);
        }
    } catch (err) {
        showMessage('error', 'Network error occurred.');
    }
}

async function handleDelete() {
    const id = document.getElementById('reservationId').value;
    if (!id) return;

    if (!confirm('Are you sure you want to delete this reservation?')) return;

    try {
        const res = await fetch(`/api/reservations/${id}`, {
            method: 'DELETE',
            headers: getHeaders()
        });

        if (res.ok || res.status === 204) {
            showMessage('success', 'Reservation successfully deleted!');
            resetForm();
            fetchReservations();
        } else {
            showMessage('error', 'Failed to delete reservation.');
        }
    } catch (err) {
        showMessage('error', 'Network error occurred.');
    }
}

function showMessage(type, text) {
    const el = document.getElementById('formMessage');
    el.textContent = text;
    el.className = "mt-6 rounded-2xl border px-4 py-3 text-sm whitespace-pre-line";
    
    if (type === 'success') el.classList.add('border-emerald-200', 'bg-emerald-50', 'text-emerald-900');
    else if (type === 'error') el.classList.add('border-rose-200', 'bg-rose-50', 'text-rose-900');
    else if (type === 'info') el.classList.add('border-amber-200', 'bg-amber-50', 'text-amber-900');
}