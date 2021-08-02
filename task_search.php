<?php

include('database.php');
$search = $_POST['search'];

if (!empty($search)) {
    $query = "SELECT * FROM tasks WHERE name LIKE '$search%'";
    $result = mysqli_query($connection, $query);
    if (!$result) {
        die('Error ' . mysqli_error($connection));
    }
    $json = array();
    while ($row = mysqli_fetch_array($result)) {
        $json[] = array(
            'id' => $row['id'],
            'name' => $row['name'],
            'description' => $row['description']
        );
    }
    $json_string = json_encode($json);
    echo $json_string;
}
