// Sample data 
let books = [{
    id: 1,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "9780446310789",
    status: "Available",
    dueDate: null
},
{
    id: 2,
    title: "1984",
    author: "George Orwell",
    isbn: "9780451524935",
    status: "Checked Out",
    dueDate: "2023-06-15"
},
{
    id: 3,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    isbn: "9780141439518",
    status: "Available",
    dueDate: null
},
];
let members = [{
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    memberID: "M001",
    booksBorrowed: 2,
    membershipExpiry: "2023-12-31"
},
{
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    memberID: "M002",
    booksBorrowed: 1,
    membershipExpiry: "2023-09-30"
},
{
    id: 3,
    name: "Alice Johnson",
    email: "alice@example.com",
    memberID: "M003",
    booksBorrowed: 0,
    membershipExpiry: "2024-03-31"
},
];

// DOM elements 
const totalBooksEl = document.getElementById('totalBooks');
const booksCheckedOutEl = document.getElementById('booksCheckedOut');
const activeMembersEl = document.getElementById('activeMembers');
const overdueBooksEl = document.getElementById('overdueBooks');
const bookTableBody = document.getElementById('bookTableBody');
const memberTableBody = document.getElementById('memberTableBody');
const addBookBtn = document.getElementById('addBookBtn');
y
const addMemberBtn = document.getElementById('addMemberBtn');
const addBookModal = document.getElementById('addBookModal');
const addMemberModal = document.getElementById('addMemberModal');
const addBookForm = document.getElementById('addBookForm');
const addMemberForm = document.getElementById('addMemberForm');
const closeButtons = document.querySelectorAll('.close');
const bookSearch = document.getElementById('bookSearch');
const searchBtn = document.getElementById('searchBtn');
const memberSearch = document.getElementById('memberSearch');
const searchMemberBtn = document.getElementById('searchMemberBtn');

// Update dashboard 
function updateDashboard() {
if (totalBooksEl) totalBooksEl.textContent = books.length;
if (booksCheckedOutEl) booksCheckedOutEl.textContent = books.filter(book => book.status === "Checked Out").length;
if (activeMembersEl) activeMembersEl.textContent = members.length;
if (overdueBooksEl) overdueBooksEl.textContent = books.filter(book => book.status === "Checked Out" && new Date(book.dueDate) < new Date()).length;
}
// Render book table
function renderBookTable(booksToRender = books) {
if (!bookTableBody) return;
bookTableBody.innerHTML = '';
booksToRender.forEach(book => {
    const row = document.createElement('tr');
    row.innerHTML = ` ${book.title} ${book.author} ${book.isbn} ${book.status} ${book.dueDate ? book.dueDate : 'N/A'} ${book.status === 'Available' ? 'Check Out' : 'Return'

         } 
         Delete `;
    bookTableBody.appendChild(row);
});
}
// Render member table 
function renderMemberTable(membersToRender = members) {
if (!memberTableBody) return;
memberTableBody.innerHTML = '';
membersToRender.forEach(member => {
    const row = document.createElement('tr');
    row.innerHTML = ` ${member.name} ${member.email} ${member.memberID} ${member.booksBorrowed} ${member.membershipExpiry} Delete `;
    memberTableBody.appendChild(row);
});
}
// Toggle book status
function toggleBookStatus(id) {
const book = books.find(book => book.id === id);
if (book) {
    book.status = book.status === 'Available' ? 'Checked Out' : 'Available';
    book.dueDate = book.status === 'Checked Out' ? new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : null;
    renderBookTable();
    updateDashboard();
}
}
// Delete book 
function deleteBook(id) {
books = books.filter(book => book.id !== id);
renderBookTable();
updateDashboard();
}
// Delete member 
function deleteMember(id) {
members = members.filter(member => member.id !== id);
renderMemberTable();
updateDashboard();
}
// Add new book 
if (addBookForm) {
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newBook = {
        id: books.length + 1,
        title: document.getElementById('bookTitle').value,
        author: document.getElementById('bookAuthor').value,
        isbn: document.getElementById('bookISBN').value,
        status: document.getElementById('bookStatus').value,
        dueDate: document.getElementById('bookStatus').value === 'Checked Out' ? document.getElementById('bookDueDate').value : null
    };
    books.push(newBook);
    renderBookTable();
    updateDashboard();
    addBookModal.style.display = 'none';
    addBookForm.reset();
});
}
// Add new member
if (addMemberForm) {
addMemberForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newMember = {
        id: members.length + 1,
        name: document.getElementById('memberName').value,
        email: document.getElementById('memberEmail').value,
        memberID: document.getElementById('memberID').value,
        booksBorrowed: 0,
        membershipExpiry: document.getElementById('membershipExpiry').value
    };
    members.push(newMember);
    renderMemberTable();
    updateDashboard();
    addMemberModal.style.display = 'none';
    addMemberForm.reset();
});

}


// Search books
if (searchBtn) {
searchBtn.addEventListener('click', () => {
    const searchTerm = bookSearch.value.toLowerCase();
    const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchTerm) || book.author.toLowerCase().includes(searchTerm) || book.isbn.includes(searchTerm));
    renderBookTable(filteredBooks);
});
}
// Search members
if (searchMemberBtn) {
searchMemberBtn.addEventListener('click', () => {
    const searchTerm = memberSearch.value.toLowerCase();
    const filteredMembers = members.filter(member => member.name.toLowerCase().includes(searchTerm) || member.email.toLowerCase().includes(searchTerm) || member.memberID.toLowerCase().includes(searchTerm));
    renderMemberTable(filteredMembers);
});

}
// Modal functionality
document.addEventListener('DOMContentLoaded', () => {
const addBookBtn = document.getElementById('addBookBtn');
const addMemberBtn = document.getElementById('addMemberBtn');
const addBookModal = document.getElementById('addBookModal');
const addMemberModal = document.getElementById('addMemberModal');
const closeButtons = document.querySelectorAll('.close');
if (addBookBtn && addBookModal) {
    addBookBtn.onclick = () => addBookModal.style.display = "block";

}
if (addMemberBtn && addMemberModal) {
    addMemberBtn.onclick = () => addMemberModal.style.display = "block";
}
closeButtons.forEach(btn => {
    btn.onclick = function() {
        if (addBookModal) addBookModal.style.display = "none";
        if (addMemberModal) addMemberModal.style.display = "none";
    }
});
window.onclick = function(event) {
    if (addBookModal && event.target == addBookModal) {
        addBookModal.style.display = "none";
    }
    if (addMemberModal && event.target == addMemberModal) {
        addMemberModal.style.display = "none";
    }
}
});

// Charts 
function initializeCharts() {
// Book Status Chart
const bookStatusCtx = document.getElementById('bookStatusChart');
if (bookStatusCtx) {
    new Chart(bookStatusCtx.getContext('2d'), {
        type: 'pie',
        data: {
            labels: ['Available', 'Checked Out'],
            datasets: [{
                data: [books.filter(book => book.status === 'Available').length,
                    books.filter(book => book.status === 'Checked Out').length
                ],
                backgroundColor: ['#2ecc71', '#e74c3c']
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Book Status'
            }
        }
    });
}
// Monthly Checkouts Chart 
const monthlyCheckoutsCtx = document.getElementById('monthlyCheckoutsChart');
if (monthlyCheckoutsCtx) {
    new Chart(monthlyCheckoutsCtx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Monthly Checkouts',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: '#3498db'
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Monthly Checkouts'
            }
        }
    });
}
// Top Borrowed Books Chart
const topBorrowedBooksCtx = document.getElementById('topBorrowedBooksChart');
if (topBorrowedBooksCtx) {
    new Chart(topBorrowedBooksCtx.getContext('2d'), {
        type: 'horizontalBar',
        data: {
            labels: ['Book A', 'Book B', 'Book C', 'Book D', 'Book E'],
            datasets: [{
                label: 'Times Borrowed',
                data: [12, 19, 3, 5, 2],
                backgroundColor: '#f39c12'
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Top Borrowed Books'
            }
        }
    });
}
// Membership Expiry Chart 
const membershipExpiryCtx = document.getElementById('membershipExpiryChart');
if (membershipExpiryCtx) {
    new Chart(membershipExpiryCtx.getContext('2d'), {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Expiring Memberships',
                data: [2, 3, 5, 1, 4, 6],
                borderColor: '#9b59b6',
                fill: false
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Membership Expiry Trend'
            }
        }
    });
}
}
// Initialize 
function init() {
updateDashboard();
renderBookTable();
renderMemberTable();
initializeCharts();
}
init();

