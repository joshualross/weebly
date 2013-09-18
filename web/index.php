<?php
require '..' . DIRECTORY_SEPARATOR . 'bootstrap.php';

use lib\Application\Application;

/**
 * Application
 */


//load the app lib
$app = new Application();

$loader = new Twig_Loader_Filesystem(__BASE__ . 'web' . DIRECTORY_SEPARATOR . 'view');
$twig = new Twig_Environment($loader/*, array(
    'cache' => __BASE__ . 'cache',
)*/);

$app->error(function() use ($twig){
    //render twig error page

    echo $twig->render('error.twig');
});


$app->on('', function($params) use($twig) {

    echo $twig->render('index.twig', $params);

});

$app->on('/element/type', function($params) {
    //return the element types
    $dbh = new PDO('mysql:dbname=weebly;host=127.0.0.1', 'root', '');
    $types = array();
    foreach ($dbh->query('SELECT * FROM element_type') as $row)
    {
        $types[] = array('id' => $row['id'], 'name' => $row['name']);
    }

    echo json_encode($types);
});



$app->run();
