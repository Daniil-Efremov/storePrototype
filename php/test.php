<?php
    $servername = "localhost";
    $username = "root";
    $password = "123";
    $database = 'test';
    
    $conn = new mysqli($servername, $username, $password, $database);
    $jData = file_get_contents('php://input');
    $data = json_decode($jData);
    
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
      }
      $sql = "SELECT * FROM test1 WHERE name =". "'" .$data->name . "'";
      $result = $conn->query($sql);

      if ($result->num_rows == 0) {
        $sql = "INSERT INTO test1 (name, pass) VALUES('". $data->name ."','" . $data->pass . "')";
        $conn->query($sql);
        echo ("Добавлен пользователь: " . $data->name . "." );
      } else {
        echo("Пользовтель: " . $data->name . " уже существует.");
      }
      $conn->close();
