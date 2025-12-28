const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const dataPath = path.join(__dirname, 'employees.json');
if (!fs.existsSync(dataPath)) {
    const initialData = {
        employees: [
            { id: 1, ad: "Əli Məmmədov", yas: 28 },
            { id: 2, ad: "Leyla Həsənova", yas: 32 },
            { id: 3, ad: "Rəşad Quliyev", yas: 25 },
            { id: 4, ad: "Nigar Əliyeva", yas: 30 }
        ]
    };
    fs.writeFileSync(dataPath, JSON.stringify(initialData, null, 2), 'utf8');
    console.log('employees.json faylı yaradıldı');
}
app.get('/employees', (req, res) => {
    try {
      
        const data = fs.readFileSync(dataPath, 'utf8');
        const employees = JSON.parse(data);
        
        
        res.json(employees);
    } catch (error) {
        res.status(500).json({ 
            error: 'Fayl oxunarkən xəta baş verdi',
            details: error.message 
        });
    }
});
app.get('/', (req, res) => {
    res.send(`
        <h1>Şirkət İşçiləri Server</h1>
        <p>İşçilərin siyahısını görmək üçün: <a href="/employees">/employees</a></p>
    `);
});
app.listen(PORT, () => {
    console.log(`Server işə düşdü: http://localhost:${PORT}`);
    console.log(`İşçilər siyahısı: http://localhost:${PORT}/employees`);
});