<?php
include('database.php');

$query = "SELECT * FROM tasks";
$result = mysqli_query($connection, $query);

if (!$result) {
    die . ('Quert failed');
} else {
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
