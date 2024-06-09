document.addEventListener('DOMContentLoaded', () => {
    loadEntries();

    document.getElementById('entryForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const entryText = document.getElementById('entryText').value;
        if (entryText.trim() === '') return;

        const date = new Date();
        const dateString = date.toDateString() + ' ' + date.toLocaleTimeString();

        const entry = {
            text: entryText,
            date: dateString
        };

        saveEntry(entry);
        displayEntry(entry);
        document.getElementById('entryText').value = '';
    });

    document.getElementById('deleteEntriesButton').addEventListener('click', function() {
        if (confirm('Are you sure you want to delete all entries?')) {
            deleteEntries();
        }
    });
});

function saveEntry(entry) {
    const entries = getEntries();
    entries.unshift(entry);
    localStorage.setItem('gratidiaryEntries', JSON.stringify(entries));
}

function getEntries() {
    const entries = localStorage.getItem('gratidiaryEntries');
    return entries ? JSON.parse(entries) : [];
}

function loadEntries() {
    const entries = getEntries();
    entries.forEach(entry => displayEntry(entry));
}

function displayEntry(entry) {
    const entryContainer = document.createElement('div');
    entryContainer.className = 'entry';

    const entryDate = document.createElement('div');
    entryDate.className = 'entry-date';
    entryDate.textContent = entry.date;

    const entryContent = document.createElement('div');
    entryContent.textContent = entry.text;

    entryContainer.appendChild(entryDate);
    entryContainer.appendChild(entryContent);

    document.getElementById('entries').prepend(entryContainer);
}

function deleteEntries() {
    localStorage.removeItem('gratidiaryEntries');
    document.getElementById('entries').innerHTML = '';
}
