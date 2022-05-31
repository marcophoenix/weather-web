// fetch('http://localhost:3000/weather/?address=philadelphia').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data.data)
//             console.log(data.address)
//         }
//     })
// })
const weatherform = document.querySelector('form')
const messege1 = document.getElementById('1')
const messege2 = document.getElementById('2')
const search = document.querySelector('input')
weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messege1.textContent = 'loading ...'
    fetch('/weather/?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messege1.textContent = data.error
            } else {
                messege1.textContent = data.data,
                    messege2.textContent = data.address
            }
        })
    })


})