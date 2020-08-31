const socket = io.connect("http://localhost:3000")

socket.on('welcome', function(data) {
    console.log(data)
});

socket.on('start', data =>{
    console.log(data, "boi")
})