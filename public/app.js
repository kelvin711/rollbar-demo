document.addEventListener('DOMContentLoaded', () => {
    const addForm = document.getElementById('addForm');
    const nameInput = addForm.querySelector('input');
    const studentList = document.getElementById('studentList');

    const getStudents = async () => {
        try {
            const res = await axios.get('/api/students');
            updateStudentListView(res.data);
        } catch (err) {
            showError(err);
        }
    }

    const updateStudentListView = (students) => {
        studentList.innerHTML = students.map((studentName, index) => 
            `<p data-index=${index}>${studentName}</p>`
        ).join('');
    }

    const addStudent = async (studentName) => {
        try {
            const res = await axios.post('/api/students', { name: studentName });
            updateStudentListView(res.data);
        } catch (err) {
            showError(err);
        }
    }

    const deleteStudent = async (index) => {
        try {
            const res = await axios.delete(`/api/students/${index}`);
            updateStudentListView(res.data);
        } catch (err) {
            showError(err);
        }
    }

    const showError = (error) => {
        const message = error.response?.data || 'An error occurred';
        const notif = document.createElement('aside');
        notif.innerHTML = `<p>${message}</p><button class="close">Close</button>`;
        document.body.appendChild(notif);

        notif.querySelector('.close').addEventListener('click', () => {
            notif.remove();
        });
    }

    studentList.addEventListener('click', (e) => {
        if (e.target.matches('p')) {
            deleteStudent(e.target.dataset.index);
        }
    });

    addForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addStudent(nameInput.value);
        nameInput.value = '';
    });

    getStudents();
});
