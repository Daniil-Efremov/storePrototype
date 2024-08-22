<?php

$servername = "localhost";
$username = "root";
$password = "123";
$database = 'store';

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = 'SELECT * FROM items';
$result = $conn->query($sql);
while($r = mysqli_fetch_assoc($result)){
    $rows[] = $r;
}
if($result->num_rows != 0){
    echo (json_encode($rows));
}else{
    echo "Ошиибка запроса";
}

