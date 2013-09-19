<?php
require '..' . DIRECTORY_SEPARATOR . 'bootstrap.php';

use lib\Application\Application,
    lib\Struct\Struct;


//load the app lib and setup some deps
$app    = new Application();
$loader = new Twig_Loader_Filesystem(__BASE__ . 'web' . DIRECTORY_SEPARATOR . 'view');
$twig   = new Twig_Environment($loader);
$pdo    = new PDO('mysql:dbname=weebly;host=127.0.0.1', 'root', '');




$app->on('', function($params) use($twig) {

    echo $twig->render('index.twig', $params);

});

$app->on('/element/type', function($params) use($pdo) {
    //return the element types

    $types = array();
    foreach ($pdo->query('SELECT * FROM element_type') as $row)
    {
        $types[] = array('id' => $row['id'], 'name' => $row['name']);
    }

    echo json_encode($types);
});

//page create
$app->post('/page', function($params) use($pdo) {

    //create a new struct
    $struct = new Struct($params);

    //add to the db
    $data = new Page();
    $data->create($struct);

//@todo need more params, not null is killing me here
    $query = $pdo->prepare("INSERT INTO page (name) VALUES name=:name");
    $query->execute(array('name' => $params['name']));

    $struct->id = $pdo->lastInsertId();

    echo $struct->toJSON();
});

//page update
$app->put('/page', function($params) {
    var_dump($params);
});

//page delete
$app->put('/page', function($params) {
    var_dump($params);
});


$app->error(function() use ($twig){
    //render twig error page
    echo $twig->render('error.twig');
});

$app->run();
