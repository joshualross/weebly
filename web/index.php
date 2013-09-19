<?php
require '..' . DIRECTORY_SEPARATOR . 'bootstrap.php';

use lib\Application\Application;
use lib\Struct\Struct;
use lib\Data\Page;
use lib\Data\Element;
use lib\Data\ElementType;
use lib\Data\State;


/*
 * Setup some requirements
 */
$app    = new Application();
$loader = new Twig_Loader_Filesystem(__BASE__ . 'web' . DIRECTORY_SEPARATOR . 'view');
$twig   = new Twig_Environment($loader);
$pdo    = new PDO('mysql:dbname=weebly;host=127.0.0.1', 'root', '');



/**
 * App entry point, load the spa
 */
$app->on('', function($params) use($twig) {
    echo $twig->render('index.twig', $params);
});

/**
 * Error handling method
 */
$app->error(function() use ($twig) {
    echo $twig->render('error.twig');
});



/*********************************************
 *
 * API methods below
 *
 ********************************************/

//page get
$app->get('/page', function($params) use($pdo) {
    $data = new Page($pdo);
    $collection = $data->get();
    echo $collection->toJSON();
});

//page create
$app->post('/page', function($params) use($pdo) {

    $struct = new Struct($params);
    $data = new Page($pdo);
    $struct = $data->create($struct);

    echo $struct->toJSON();
});

//page update
$app->put('/page', function($params) use($pdo) {

    $struct = new Struct($params);
    $data = new Page($pdo);
    $struct = $data->update($struct);

    echo $struct->toJSON();
});


//page delete
$app->delete('/page', function($params) use($pdo) {
    $data = new Page($pdo);
    $struct = $data->delete($params['id']);

//@todo return
});

//element create
$app->post('/element', function($params) use($pdo) {

    $struct = new Struct($params);
    $data = new Element($pdo);
    $struct = $data->create($struct);

    echo $struct->toJSON();
});

//element update
$app->put('/element', function($params) use($pdo) {

    $struct = new Struct($params);
    $data = new Element($pdo);
    $struct = $data->update($struct);

    echo $struct->toJSON();
});


//element delete
$app->delete('/element', function($params) use($pdo) {
    $data = new Element($pdo);
    $struct = $data->delete($params['id']);

    //@todo return
});


$app->get('/element/type', function($params) use($pdo) {
    $data = new ElementType($pdo);
    $collection = $data->get();
    echo $collection->toJSON();
});

//run - will parse the route and params followed by handling it
$app->run();
